import React, { useState } from "react";
import { useAudio } from "hooks/useAudio";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { Button } from "components/ui/button";
import { Check, CircleStop, Copy, Loader, RefreshCcw, Volume2 } from "lucide-react";
import { SystemMessageProps } from "./SystemMessage";
import { useBoolean } from "hooks/useBoolean";

export interface SystemMessageActionsProps extends SystemMessageProps {
   onRegenerate: () => void;

}

export function SystemMessageActions({ message, onRegenerate }: SystemMessageActionsProps) {
   const [audioUrl, setAudioUrl] = useState(``);
   const { playing, handleReadAloud } = useAudio();
   const [pending, setPending] = useState(false);
   const [value, copy] = useCopyToClipboard();
   const [copied, setCopied] = useBoolean()

   async function handleMessageReadAloud() {
      if (audioUrl) await handleReadAloud(audioUrl);
      else {
         setPending(true);
         const res = await fetch(`/api/ai/tts`, {
            headers: {
               "Content-Type": "application/json",
               Accept: `*/*`,
            },
            body: JSON.stringify({ prompt: message.message }),
            method: "POST",
         });

         const file = await res.blob();
         const blob = new Blob([file], { type: `audio/wav` });
         const url = URL.createObjectURL(blob);
         setAudioUrl(url);
         setPending(false);

         await handleReadAloud(url);
      }
   }

   return (
      <div className={`invisible items-center gap-2 group-hover:visible border-[1px] rounded-md border-neutral-300 mt-2 p-1`}>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button
                     onClick={handleMessageReadAloud} variant={`secondary`} className={`rounded-md !w-7 !h-7`}
                     size={`icon`}>
                     {pending && (
                        <Loader size={18} className={`animate-spin`} />
                     )}
                     {playing && !pending && (
                        <CircleStop size={18} />)
                     }
                     {!playing && !pending && (
                        <Volume2 className={`stroke-[2px]`} size={18} />)
                     }
                  </Button>
               </TooltipTrigger>
               <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs`}>
                  {playing ? `Stop` : `Read aloud`}
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button
                     onClick={_ => {
                        return copy(message.message as string).then(_ => {
                           setCopied(true);
                           setTimeout(() => setCopied(false), 200)
                        });
                     }}
                     variant={`secondary`}
                     className={`rounded-md !w-7 !h-7`}
                     size={`icon`}>
                     {copied ? (
                        <Check size={18} />
                     ) : (
                        <Copy size={18} />
                     )}
                  </Button>
               </TooltipTrigger>
               <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs`}>
                  Copy
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button
                     onClick={onRegenerate}
                     variant={`secondary`}
                     className={`rounded-md !w-7 !h-7`}
                     size={`icon`}>
                     <RefreshCcw size={18} />
                  </Button>
               </TooltipTrigger>
               <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs`}>
                  Regenerate
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </div>
   );
}