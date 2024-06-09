import React from "react";

/**
 * Renders the AiTip component.
 *
 * The AiTip component is a simple component that displays a tip
 * to the user, in this case, telling them how to use the AI for
 * text generation.
 *
 * @returns {JSX.Element} The rendered AiTip component.
 */
export const AiTip = () => (
   <div className={`w-full text-right text-muted-foreground text-xs`}>
      {/* Display the tip title */}
      <b>Tip</b>: Press <kbd
         className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
         <span className="text-xs">⌘</span>I
      </kbd> to use AI for text generation.
   </div>
);
