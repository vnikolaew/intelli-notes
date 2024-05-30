import React from "react";

export const AiTip = () => (
   <div className={`w-full text-right text-muted-foreground text-xs`}>
      <b>Tip</b>: Press <kbd
      className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
      <span className="text-xs">⌘</span>I
   </kbd> to use AI for text generation.
   </div>
);