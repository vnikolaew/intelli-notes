import { useState, useCallback } from 'react';

function useCopyToClipboard() {
   const [isCopied, setIsCopied] = useState(false);
   const [lastValue, setLastValue] = useState(``);

   const copyToClipboard = useCallback((text: string) => {
      if (navigator.clipboard) {
         navigator.clipboard.writeText(text).then(
            () => {
               setIsCopied(true);
               setLastValue(text)
               setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
            },
            () => {
               setIsCopied(false);
            }
         );
      } else {
         setIsCopied(false);
      }
   }, []);

   return [isCopied, copyToClipboard];
}

export default useCopyToClipboard;
