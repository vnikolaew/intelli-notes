"use client";

import { useRef, useState } from "react";

export function useAudio() {
   const [playing, setPlaying] = useState(false);
   let invisAudioRef = useRef<HTMLAudioElement | null>(null!);

   async function handleReadAloud(downloadUrl: string) {

      if (playing && invisAudioRef.current) {
         console.log(`Audio is already playing!`);
         invisAudioRef.current.pause();
         setPlaying(false);
         return;
      }

      invisAudioRef.current = new Audio(downloadUrl);
      invisAudioRef.current.style.display = `none`;

      invisAudioRef.current.currentTime = 0;
      invisAudioRef.current.controls = invisAudioRef.current.loop = false;
      setPlaying(true);

      invisAudioRef.current.addEventListener("ended", _ => {
         setPlaying(false);
      }, { once: true });
      await invisAudioRef.current.play();
   }

   return { handleReadAloud, audio: invisAudioRef, playing } as const;
}