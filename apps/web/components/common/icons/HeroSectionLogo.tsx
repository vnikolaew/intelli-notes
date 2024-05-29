import React, { SVGProps } from "react";

export interface HeroSectionLogoProps extends SVGProps<SVGSVGElement> {
}

const HeroSectionLogo = (props: HeroSectionLogoProps) => {
   return (
      <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="writing" {...props}>
         <defs>
            <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="100%">
               <stop offset="0%" stopColor="#3b82f6" />
               <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
         </defs>
         <path
            fill={`url(#grad1)`}
            d="M8,24H9a1,1,0,0,0,0-2H8a3,3,0,0,1-3-3V5A3,3,0,0,1,8,2h8a3,3,0,0,1,3,3V9a1,1,0,0,0,2,0V5a5.006,5.006,0,0,0-5-5H8A5.006,5.006,0,0,0,3,5V19A5.006,5.006,0,0,0,8,24Z"></path>
         <path
            fill={`url(#grad1)`}
            d="M16 5H8A1 1 0 0 0 8 7h8a1 1 0 0 0 0-2zM17 10a1 1 0 0 0-1-1H8a1 1 0 0 0 0 2h8A1 1 0 0 0 17 10zM8 13a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2zM18.879 12.879l-5.657 5.657a1 1 0 0 0-.264.467l-.929 3.757a1 1 0 0 0 .264.947 1.013 1.013 0 0 0 .947.264L17 23.042a.992.992 0 0 0 .467-.264l5.656-5.656a3 3 0 1 0-4.242-4.243zm-2.632 8.288l-1.879.465.465-1.879 3.339-3.339 1.414 1.414zm5.46-5.46L21 16.414 19.586 15l.707-.707a1 1 0 0 1 1.414 0A1.012 1.012 0 0 1 21.707 15.707z"></path>
      </svg>
   );
};

export default HeroSectionLogo;