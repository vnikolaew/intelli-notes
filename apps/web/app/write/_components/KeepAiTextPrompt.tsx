"use client"
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "lib/utils";
import { Button } from "components/ui/button";
import React from "react";

export const KeepAiTextPrompt = ({ show, onAnswer }: { show: boolean, onAnswer: (value: boolean) => void }) =>
   <AnimatePresence>
      {
         show && <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 100, height: `100%` }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`w-full flex items-center justify-end`}>
            <div className={cn(`flex items-center gap-2 flex-0 `)}>
               <span>Would you like to keep the AI generated content?</span>
               <Button onClick={_ => onAnswer(true)} variant={`default`}>Yes</Button>
               <Button onClick={_ => onAnswer(false)} variant={"destructive"}>No</Button>
            </div>
         </motion.div>
      }
   </AnimatePresence>;