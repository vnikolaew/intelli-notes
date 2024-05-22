"use client";
import React, { Fragment, useState } from "react";
import { useSingleFileImagePreview } from "hooks/useSingleFileImagePreview";
import { DocumentAnsweringResponse, runDocumentAnswering } from "../actions";
import { useAction } from "next-safe-action/hooks";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import Image from "next/image"
import { Button } from "components/ui/button";
import { isExecuting } from "next-safe-action/status";
import { Loader2 } from "lucide-react";

export interface DocumentAnsweringFormProps {
}

const DocumentAnsweringForm = ({}: DocumentAnsweringFormProps) => {
   const { inputFile, removeImage, imagePreview, addImage } = useSingleFileImagePreview();
   const [response, setResponse] = useState<DocumentAnsweringResponse>();
   const [question, setQuestion] = useState(``);
   const { execute, status } = useAction(runDocumentAnswering, {
      onSuccess: res => {
         if (res.success) {
            setResponse(res);
            console.log({ res });
         }
      },
      onError: console.error
   });

   return (
      <div className={`flex flex-col items-center gap-4 w-full mx-auto `}>
         <form
            className={`flex flex-col`}
            onSubmit={async e => {
               e.preventDefault();
               const formData = new FormData(e.currentTarget);
               execute(formData);
            }}>
            <h2 className={`text-xl font-semibold my-8`}>Document Answering</h2>
            {inputFile?.type === `application/pdf` && imagePreview ? (
               <embed className={`mb-4`} height={400} width={400} type={`application/pdf`} src={imagePreview} />
            ) : imagePreview && (
               <Image
                  className={`rounded-md shadow-md my-4 mx-auto`}
                  height={200}
                  width={200} src={imagePreview}
                  alt={inputFile.name} />
            )}
            <Input name={`image`} onChange={e => {
               if ((e.target.files?.length ?? 0) > 0) addImage(e.target.files![0]);
            }} type={`file`} />
            <Label className={`text-lg mt-4`}>Question: </Label>
            <Input name={`question`} className={`mt-2`} placeholder={`Type your question ...`} value={question}
                   type={`text`} onChange={e => {
               setQuestion(e.target.value);
            }} />
            <Button
               disabled={isExecuting(status)} className={`!px-8 mt-4 self-end gap-2`}
               variant={`default`}>
               {isExecuting(status) ? (
                  <Fragment>
                     <Loader2 size={14} className={`animate-spin`} />
                     Loading ...
                  </Fragment>
               ) : (
                  `Answer`
               )}

            </Button>
         </form>
         <div>
            {response && <pre className={`text-sm`}>{JSON.stringify(response, null, 2)}</pre>}
         </div>
      </div>
   );
};

export default DocumentAnsweringForm;