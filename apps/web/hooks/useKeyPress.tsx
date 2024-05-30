"use client";
import { useEffect } from "react";

export function useKeyPress(key: string, handler: (e: KeyboardEvent) => void, deps?: any[]) {
   useEffect(() => {
      const realHandler = (e: KeyboardEvent) => {
         if (e.key === key) {
            e.preventDefault();
            e.stopPropagation();
            handler(e);
         }
      };

      document.addEventListener(`keypress`, realHandler);
      return () => document.removeEventListener(`keypress`, realHandler);
   }, [...deps]);

}