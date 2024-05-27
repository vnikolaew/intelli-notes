import { CompleteMultipartUploadCommandInput, PutObjectCommand, S3, UploadPartCommandInput } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { fileTypeFromBlob } from "file-type";

/**
 * A utility component for interacting with a remote Cloud File Storage
 */
export class CloudflareR2Storage {
   private readonly s3: S3;

   private readonly DEFAULT_BUCKET_URL: string;

   constructor(defaultBucketUrl: string) {
      const accountId = process.env.AWS_ACCOUNT_ID ?? `79727fcb5c91aa3bea90e8c140120843`;
      const accessKeyId = process.env.AWS_ACCESS_KEY_ID! ?? `599f7e7625974adee281728f713ab019`;
      const accessKeySecret = process.env.AWS_ACCESS_KEY_SECRET! ?? `5ea6b89fa3e2acdfeb1d759195b1671e1125e41c767e2884a9225969ad7b72a1`;

      this.DEFAULT_BUCKET_URL = defaultBucketUrl;

      this.s3 = new S3({
         endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
         credentials: {
            accessKeyId,
            secretAccessKey: accessKeySecret,
         },
         region: `us-east-1`,
         maxAttempts: 3,
      });
   }

   /**
    * List all objects in the specified bucket.
    * @param bucketName
    */
   public async listObjects(bucketName: string) {
      return await this.executeSafe(async () => {
         const { Name, Contents } = await this.s3.listObjects({ Bucket: bucketName });
         return { Name, Contents, success: true };
      });
   }

   /**
    * Delete an object by its bucket and key.
    * @param bucketName
    * @param key
    */
   public async deleteObject(bucketName: string, key: string) {
      return await this.executeSafe(async () => {
         const output = await this.s3.deleteObject({
            Bucket: bucketName,
            Key: key,
         });
         console.log({ output });

         return { success: output.$metadata.httpStatusCode === 204, output };
      });
   }

   /**
    * Upload a new object to the storage.
    * @param bucketName
    * @param key
    * @param body
    * @param Metadata
    */
   public async putObject(bucketName: string, key: string, body: Blob, Metadata?: Record<string, string>) {
      return await this.executeSafe(async () => {
         const contentType = (await fileTypeFromBlob(body))?.mime ?? ``;

         const url = await getSignedUrl(this.s3, new PutObjectCommand({
            Key: key,
            Bucket: bucketName,
            Body: body,
            Metadata,
            ACL: `public-read`,
            ContentLength: body.size,
            ContentType: contentType,
            ContentLanguage: `en`,
         }), { expiresIn: 3600 });

         if (!!url?.length) {
            const response = await fetch(url, {
               method: `PUT`,
               mode: `cors`,
               headers: {
                  "Content-Length": body.size.toString(),
                  "Content-Type": contentType,
               },
               body,
            });

            return { success: response.status === 200, eTag: response.headers.get(`ETag`) };
         }
      });
   }

   /**
    * Retrieve the publicly visible object URL by its key using the bucket URL.
    * @param key
    * @param bucketUrl
    */
   public getObjectUrl(key: string, bucketUrl?: string) {
      return `${bucketUrl ?? this.DEFAULT_BUCKET_URL}/${encodeURIComponent(key)}`;
   }

   private async executeSafe<T>(action: () => T | Promise<T>): Promise<({ response: T, success: true } | {
      success: false,
      error: any
   })> {
      try {
         const res: any = await action();
         const success = typeof res.success === `boolean` ? res.success : true;
         delete res.success;

         return { success, response: res };
      } catch (error) {
         return { success: false, error };
      }
   }

   /**
    * Retrieve an object's metadata / details along with its body.
    * @param key
    * @param bucketName
    */
   public async getObject(key: string, bucketName: string) {
      return await this.executeSafe(async () => {
         const { $metadata, Metadata, Body, ContentType, ETag, LastModified, VersionId } = await this.s3.getObject({
            Key: key,
            Bucket: bucketName,
         });

         return { metadata: $metadata, Metadata, ContentType, ETag, LastModified, VersionId };
      });
   }

   /**
    * Perform a multipart object upload.
    * @param bucketName
    * @param key
    * @param body
    * @param Metadata
    */
   public async createMultipartUpload(bucketName: string, key: string, body: Blob, Metadata?: Record<string, string>) {
      return await this.executeSafe(async () => {
         const { UploadId, Key, Bucket } = await this.s3.createMultipartUpload({
            Key: key,
            Bucket: bucketName,
            ACL: `public-read`,
            Metadata,
            ContentType: (await fileTypeFromBlob(body))?.mime,
         });

         // 5MB is the minimum part size
         // Last part can be any size (no min.)
         // Single part is treated as last part (no min.)
         const partSize = (1024 * 1024) * 5; // 5MB
         const fileSize = body.size;
         const numParts = Math.ceil(fileSize / partSize);

         const uploadedParts = [];
         let remainingBytes = fileSize;

         for (let i = 1; i <= numParts; i++) {
            let startOfPart = fileSize - remainingBytes;
            let endOfPart = Math.min(partSize, startOfPart + remainingBytes);

            if (i > 1) {
               endOfPart = startOfPart + Math.min(partSize, remainingBytes);
               startOfPart += 1;
            }

            const uploadParams: UploadPartCommandInput = {
               // add 1 to endOfPart due to slice end being non-inclusive
               Body: body.slice(startOfPart, endOfPart + 1),
               Bucket,
               Key,
               UploadId,
               PartNumber: i,
            };
            const uploadPartResponse = await this.s3.uploadPart(uploadParams);
            console.log(`Part #${i} uploaded. ETag: `, uploadPartResponse.ETag);

            remainingBytes -= Math.min(partSize, remainingBytes);

            // For each part upload, you must record the part number and the ETag value.
            // You must include these values in the subsequent request to complete the multipart upload.
            // https://docs.aws.amazon.com/AmazonS3/latest/API/API_CompleteMultipartUpload.html
            uploadedParts.push({ PartNumber: i, ETag: uploadPartResponse.ETag });
         }
         const completeParams: CompleteMultipartUploadCommandInput = {
            Bucket,
            Key,
            UploadId,
            MultipartUpload: {
               Parts: uploadedParts,
            },
         };

         const completeData = await this.s3.completeMultipartUpload(completeParams);
         return completeData;
      });
   }
}