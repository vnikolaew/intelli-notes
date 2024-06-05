"use client";
import React, { Fragment, useState } from "react";
import { useSingleFileImagePreview } from "hooks/useSingleFileImagePreview";
import { ImageClassificationResponse, runImageClassification } from "../actions";
import { useAction } from "next-safe-action/hooks";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { isExecuting } from "next-safe-action/status";
import { Loader2 } from "lucide-react";
import Image from "next/image"

export interface ImageClassificationFormProps {
}

const ImageClassificationForm = ({}: ImageClassificationFormProps) => {
   const { inputFile, removeImage, imagePreview, addImage } = useSingleFileImagePreview();
   const [response, setResponse] = useState<ImageClassificationResponse | null>();
   const { execute, status } = useAction(runImageClassification, {
      onSuccess: res => {
         if (res.success) {
            setResponse(res);
            console.log({ res });
         }
      },
   });

   return (
      <div className={`flex flex-col items-center gap-4 w-1/3 mx-auto mt-12`}>
         <form
            className={`flex flex-col`}
            onSubmit={async e => {
               e.preventDefault();
               const formData = new FormData(e.currentTarget);
               execute(formData);
            }}>
            {imagePreview && (
               <Image
                  className={`rounded-md shadow-md my-4 mx-auto`}
                  height={200}
                  width={200} src={imagePreview}
                  alt={inputFile.name} />
            )}
            <Input name={`image`} onChange={e => {
               if ((e.target.files?.length ?? 0) > 0) addImage(e.target.files![0]);
            }} type={`file`} />
            <Button
               disabled={isExecuting(status)} className={`!px-8 mt-4 self-end gap-2`}
               variant={`default`}>
               {isExecuting(status) ? (
                  <Fragment>
                     <Loader2 size={14} className={`animate-spin`} />
                     Loading ...
                  </Fragment>
               ) : (
                  `Classify`
               )}

            </Button>
         </form>
         <div>
            {response && <pre className={`text-sm`}>{JSON.stringify(response, null, 2)}</pre>}
         </div>
      </div>
   );
};

export default ImageClassificationForm;