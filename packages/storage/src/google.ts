import { drive_v3, google } from "googleapis";
import { fileTypeFromBlob } from "file-type";
import { GaxiosResponse } from "gaxios";
import Schema$File = drive_v3.Schema$File;
import Schema$FileList = drive_v3.Schema$FileList;

import { Readable } from "stream";

/**
 * A utility component for interacting with the Google Drive API Storage.
 */
export class GoogleDriveStorage {
   service: drive_v3.Drive;


   /**
    * Constructs a new GoogleDriveStorage instance.
    * @param access_token - The access token.
    * @param refresh_token - The refresh token.
    */
   constructor(private access_token: string, private refresh_token: string) {
      const oAuthClient = new google.auth.OAuth2(
         process.env.AUTH_GOOGLE_ID,
         process.env.AUTH_GOOGLE_SECRET,
         process.env.BASE_URL,
      );

      oAuthClient.setCredentials({ refresh_token });
      this.service = google.drive({ version: "v3", auth: oAuthClient });
   }


   /**
    * Uploads a file to the user's Drive.
    * @param file - The file to upload.
    * @param folderId - The ID of the folder to upload the file to.
    * @param mimeType - The MIME type of the file.
    */
   public async uploadFile(file: File, folderId?: string, mimeType?: string) {
      const description = `A file uploaded from Intelli Notes.`;

      const requestBody: Schema$File = {
         name: file.name,
         description,
         ...(folderId ? { parents: [folderId] } : {}),
         fields: "id, name, kind, driveId, fileExtension, size, webViewLink, description, mimeType, parents, iconLink, owners",
      };

      const readable = new Readable();

      readable.push(Buffer.from(await file.arrayBuffer()));
      readable.push(null);

      const media = {
         mimeType: mimeType ?? (await fileTypeFromBlob(file))?.mime,
         body: readable,
      };

      const uploadedFile = await this.service.files.create({
         requestBody,
         media: media,
      });

      return uploadedFile.data;
   }

   /**
    * Lists the files in the user's Drive.
    */
   public async listFiles() {
      const files: GaxiosResponse<Schema$FileList> = await this.service.files.list({
         fields: "nextPageToken, files(id, name, kind, driveId, fileExtension, size, webViewLink, description, mimeType, parents, iconLink, owners)",
      });

      return files;
   }

   /**
    *  Creates a folder in the user's Drive.
    * @param name  - The name of the folder.
    * @returns
    */
   public async createFolderIfNotExists(name: string) {
      const q = `mimeType = 'application/vnd.google-apps.folder' and name contains '${name}'`;
      const existing: GaxiosResponse<Schema$FileList> = await this.service.files
         .list({
            q,
         });
      if (existing.data.files?.length) return { ...existing, data: { ...existing.data.files[0] } };

      const folder: GaxiosResponse<Schema$File> = await this.service.files.create({
         fields: "id, name, kind, driveId, fileExtension, size, webViewLink, description, mimeType, parents, iconLink, owners",
         requestBody: {
            name,
            mimeType: "application/vnd.google-apps.folder",
         },
      });

      return folder;
   }
}