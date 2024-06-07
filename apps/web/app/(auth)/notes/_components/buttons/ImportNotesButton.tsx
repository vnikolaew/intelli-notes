"use client";

import {
   DropdownMenu,
   DropdownMenuContent, DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EXPORT_FORMATS, ExportFormat } from "./BulkExportNotesButton";
import { Fragment } from "react";
import { FolderDown, Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { importNotes } from "../../actions";
import { isExecuting } from "next-safe-action/status";

async function readFileAsText(file: File) {
   let reader = new FileReader();
   reader.readAsText(file);
   return new Promise<string>(res => {
      reader.onload = ev => res(reader.result as string);
   });
}

export function ImportNotesButton() {
   const { execute: importAction, status } = useAction(importNotes, {
      onSuccess: res => {
         if (res.ok) console.log(res);
      },
   });

   async function handleImport(file: File, type: ExportFormat) {
      console.log({ file });
      const result = await readFileAsText(file);
      importAction({ notes_raw: result, importFormat: type });
   }

   return (
      <Fragment><Fragment>
         {EXPORT_FORMATS.map(({ value, icon }, index) => (
            <input accept={`.${value.toLowerCase()}`} onChange={async e => {
               if (!e.target.files.length) return;
               await handleImport(e.target.files[0], value);

            }} id={`input-${value}`} type={`file`} className={`hidden`} hidden />
         ))}
      </Fragment>
         <DropdownMenu>
            <DropdownMenuTrigger>
               <Button
                  disabled={isExecuting(status)} className={`shadow-md items-center gap-2`} variant={`default`}
                       size={"default"}>
                  {isExecuting(status) ? (
                     <Fragment>
                        <Loader2 size={14} className={`animate-spin`} />
                        Importing ...
                     </Fragment>
                  ) : (
                     <Fragment><FolderDown size={24} /><span>Import</span></Fragment>
                  )}
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               <DropdownMenuSeparator />
               {EXPORT_FORMATS.map(({ value, icon }, index) => (
                  <DropdownMenuItem
                     className={`items-center gap-2`}
                     data-value={value} key={value}
                     onClick={e => {
                        document.getElementById(`input-${value}`)?.click();
                     }}>
                     {icon}
                     {value}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>
      </Fragment>);

}