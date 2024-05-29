"use client"

import { cn } from "lib/utils";
import { Sparkles } from "lucide-react";
import React from "react";

export const GeneratingWithAi = ({ show }: { show: boolean }) =>
   show ? <div className={`w-full flex items-center justify-end`}>
      <div className={cn(`flex items-center gap-2 flex-0 `)}>
         <Sparkles className={`animate-pulse  !text-amber-600 drop-shadow-md`} size={22} />
         <span className={`animate-pulse`}> Generating with AI ... </span>
      </div>
   </div> : null;