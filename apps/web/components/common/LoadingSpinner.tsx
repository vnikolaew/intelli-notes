"use client"

import { Fragment } from "react";
import { Loader2 } from "lucide-react";

export const LoadingSpinner = ({ text }: { text?: string }) => (
   <Fragment>
      <Loader2 size={16} className={`animate-spin mr-2`} />
      {text ?? `Signing in ...`}
   </Fragment>
);
