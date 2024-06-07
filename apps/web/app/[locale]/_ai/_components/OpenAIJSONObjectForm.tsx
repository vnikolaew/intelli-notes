"use client";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import React, { Fragment, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import {
   ObjectGenerationResponse,
   runObjectGeneration,
} from "../actions";
import { isExecuting } from "next-safe-action/status";
import { Loader2 } from "lucide-react";

export interface OpenAijsonObjectFormProps {
}

const OpenAijsonObjectForm = ({}: OpenAijsonObjectFormProps) => {
   const [prompt, setPrompt] = useState(``);
   const [response, setResponse] = useState<ObjectGenerationResponse>();
   const { execute, status } = useAction(runObjectGeneration, {
      onSuccess: res => {
         if (res.success) {
            setResponse(res);
            console.log({ res });
         }
      },
      onError: console.error,
   });


   return (
      <div className={`flex flex-col items-center gap-4 w-full mx-auto `}>
         <form
            className={`flex flex-col`}
            onSubmit={async e => {
               e.preventDefault();
               execute({ prompt });
            }}>
            <h2 className={`text-xl font-semibold my-8`}>OpenAI generate a JSON Object</h2>
            <Label className={`text-lg mt-4`}>Prompt: </Label>
            <Input name={`question`} className={`mt-2`} placeholder={`Type your question ...`} value={prompt}
                   type={`text`} onChange={e => {
               setPrompt(e.target.value);
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

export default OpenAijsonObjectForm;