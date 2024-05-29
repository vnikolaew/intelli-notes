"use client";
import { useEffect } from "react";

export function useKeyPress(key: string, handler: (e: KeyboardEvent) => void, deps?: any[]) {
   useEffect(() => {
      const realHandler = (e: KeyboardEvent) => {
         e.preventDefault();
         e.stopPropagation();
         if (e.key === key) handler(e);
      };

      document.addEventListener(`keypress`, realHandler);
      return () => document.removeEventListener(`keypress`, realHandler);
   }, [...deps]);

}