"use client";
import React, { Fragment, useRef, useState } from "react";
import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { CircleStop, Download, Loader2, Volume1, Volume2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { useAudio } from "hooks/useAudio";

export interface TextToSpeechFormProps {
}

const TextToSpeechForm = ({}: TextToSpeechFormProps) => {
   const [prompt, setPrompt] = useState(``);
   const [downloadUrl, setDownloadUrl] = useState(``);
   const [pending, setPending] = useState(false);

   let audioRef = useRef<HTMLAudioElement | null>(null!);
   let downloadRef = useRef<HTMLAnchorElement>();

   async function handleSubmit(e) {
      e.preventDefault();
      setPending(true);
      const res = await fetch(`/api/ai/tts`, {
         headers: {
            "Content-Type": "application/json",
            Accept: `*/*`,
         },
         body: JSON.stringify({ prompt }),
         method: "POST",
      });

      const file = await res.blob();
      const blob = new Blob([file], { type: `audio/wav` });
      const url = URL.createObjectURL(blob);

      setPending(false);
      setDownloadUrl(url);
   }

   const { playing, handleReadAloud, audio: invisAudioRef } = useAudio();


   return (
      <div className={`flex flex-col items-center gap-4 w-full mx-auto`}>
         <form
            className={`flex flex-col min-w-[300px]`}
            onSubmit={handleSubmit}>
            <h2 className={`text-xl font-semibold my-8`}>Run Text to Speech</h2>
            <Label className={`text-lg mt-4`}>Text: </Label>
            <Input
               name={`question`} className={`mt-2`}
               placeholder={`Enter your text ...`} value={prompt}
               type={`text`} onChange={e => {
               setPrompt(e.target.value);
            }} />
            <Button
               disabled={pending} className={`!px-8 mt-4 self-end gap-2`}
               variant={`default`}>
               {pending ? (
                  <Fragment>
                     <Loader2 size={14} className={`animate-spin`} />
                     Converting ...
                  </Fragment>
               ) : (
                  `Convert`
               )}

            </Button>
         </form>
         <div className={`flex flex-col mt-4 min-w-[300px]`}>
            {downloadUrl && (
               <Fragment>
                  <audio src={downloadUrl} id={`audio`} controls className={`w-full rounded-md shadow-md`}
                         ref={audioRef}>
                     Your browser does not support the audio element.
                  </audio>
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger>
                           <Button
                              onClick={_ => handleReadAloud(downloadUrl)} variant={"ghost"}
                              className={`rounded-full mt-2`}
                              size={`icon`}>
                              {playing ? <CircleStop /> : <Volume2 />}
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent
                           className={`bg-neutral-900 border-none outline-none text-white text-xs`}
                           side={`bottom`}>
                           {playing ? `Stop` : `Read aloud`}
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
                  <Button
                     title={`Download audio.wav`}
                     variant={`default`}
                     className={`gap-2 mt-4 w-2/3 shadow-md mx-auto`}>
                     <Download size={14} />
                     <a ref={downloadRef} download={`audio.wav`} href={downloadUrl}>
                        Download
                     </a>
                  </Button>
               </Fragment>
            )}
         </div>
      </div>
   )
      ;
};

export default TextToSpeechForm;