"use client"
import { cn } from "lib/utils";
import { Save } from "lucide-react";
import React from "react";

export const Saving = ({ show }: { show: boolean }) =>
   show ? <div className={`w-full flex items-center justify-end`}>
      <div className={cn(`flex items-center gap-2 flex-0 `)}>
         <Save className={`animate-pulse`} size={22} />
         <span className={`animate-pulse`}> Saving ... </span>
      </div>
   </div> : null;