"use client";
import { Button } from "components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent, DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import { FolderUp, Loader2 } from "lucide-react";
import React, { Fragment } from "react";
import { Note } from "@repo/db";
import { useBoolean } from "hooks/useBoolean";
import { downloadFile } from "lib/utils";
import { toast, TOASTS } from "config/toasts";

export interface ExportNoteButtonProps {
   note?: Note;
}

const EXPORT_FORMATS = [
   `CSV`,
   `JSON`,
   `Markdown`,
   `HTML`,
   `XML`,
] as const;

const ExportNoteButton = ({ note }: ExportNoteButtonProps) => {
   const [pending, setPending] = useBoolean();

   function handleExport(dataValue: (typeof EXPORT_FORMATS)[number]) {
      console.log(dataValue);
      setPending(true);
      fetch(`/api/notes/export`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ note, format: dataValue, single: true }),
         credentials: "include",
      }).then(async res => {
         const fileName = res.headers.get(`Content-Disposition`)?.split(`;`).at(-1)?.split(`=`).at(-1)?.trim();
         const text = await res.text();

         downloadFile(text, fileName, res.headers.get(`Content-Type`));
         toast(TOASTS.EXPORT_SUCCESS);
      }).catch(console.error).finally(() => setPending(false));
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <Button disabled={pending} className={`shadow-md items-center gap-2`} variant={`default`} size={"default"}>
               {pending ? (
                  <Fragment>
                     <Loader2 size={14} className={`animate-spin`} />
                     Exporting ...
                  </Fragment>
               ) : (
                  <><FolderUp size={24} /><span>Export</span></>
               )}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuSeparator />
            {EXPORT_FORMATS.map((item, index) => (
               <DropdownMenuItem
                  data-value={item} key={item}
                  onClick={e => {
                     handleExport(e.currentTarget.attributes.getNamedItem(`data-value`).value as (typeof EXPORT_FORMATS)[number]);
                  }}>{item}</DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default ExportNoteButton;