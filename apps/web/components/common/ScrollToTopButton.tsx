"use client";
import React, { useMemo } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import useWindowScroll from "hooks/useWindowScroll";
import { useTranslation } from "react-i18next";

export interface ScrollToTopButtonProps {
}

const MotionButton = motion(Button);

/**
 * A reusable Scroll to Top button.
 * @constructor
 */
const ScrollToTopButton = ({}: ScrollToTopButtonProps) => {
   const { y } = useWindowScroll();
   const showButton = useMemo(() => y >= 300, [y]);

   const scrollToTop = () => {
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      window.focus();
      document.body.scrollTop = 0;
   };

   const { t } = useTranslation(`home`, { keyPrefix: `Misc` });

   // @ts-ignore
   return <AnimatePresence mode={`sync`}>
      {
         showButton && (
            <motion.div
               transition={{ duration: 0.3 }}
               initial={{
                  height: 0,
                  opacity: 0,
               }}
               animate={{ height: `auto`, opacity: 100 }} exit={{ height: 0, opacity: 0 }}
            >
               <TooltipProvider> <Tooltip>
                  <TooltipTrigger asChild>
                     <MotionButton
                        variant={`secondary`}
                        onClick={scrollToTop}
                        className={`rounded-full !p-2 fixed bottom-8 right-8 !h-fit opacity-70`}>
                        <ChevronUp size={28} />
                     </MotionButton>
                  </TooltipTrigger>
                  <TooltipContent side={`top`} className={`bg-black text-white rounded-full text-xs`}>
                     {t(`ScrollToTop`)}
                  </TooltipContent>
               </Tooltip>
               </TooltipProvider>
            </motion.div>
         )
      }

   </AnimatePresence>;
};

export default ScrollToTopButton;