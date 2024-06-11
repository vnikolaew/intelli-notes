"use client";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent, DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   ArrowUp,
   Braces,
   Code,
   DiamondMinus,
   FileCode2,
   FolderUp,
   Loader2,
} from "lucide-react";
import React, { Fragment } from "react";
import { Note } from "@repo/db";
import { useBoolean } from "@/hooks/useBoolean";
import { downloadFile } from "@/lib/utils";
import { toast, TOASTS } from "@/config/toasts";
import { useTranslations } from "@/providers/TranslationsClientProvider";

export interface BulkExportNotesButtonProps {
   notes: Note[];
}

export type ExportFormat = (typeof EXPORT_FORMATS)[number]["value"]

export const EXPORT_FORMATS = [
   {
      value:
         `CSV`,
      icon: <ArrowUp size={14} />,
   },
   {
      value:
         `JSON`,
      icon: <Braces size={14} />,
   },
   {
      value:
         `Markdown`,
      icon: <DiamondMinus size={14} />,
   },
   {
      value:
         `HTML`,
      icon: <FileCode2 size={14} />,
   },
   {
      value:
         `XML`,
      icon: <Code size={14} />,
   },
] as const;

/**
 * Renders a button component for bulk exporting notes in various formats.
 *
 * @param {BulkExportNotesButtonProps} props - The properties for the component.
 * @param {Note[]} props.notes - The array of notes to be exported.
 * @return {JSX.Element} The rendered button component.
 */
const BulkExportNotesButton = ({ notes }: BulkExportNotesButtonProps) => {
   const [pending, setPending] = useBoolean();
   const t = useTranslations()

   function handleExport(dataValue: ExportFormat) {
      console.log(dataValue);
      setPending(true);
      fetch(`/api/notes/export`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ notes, format: dataValue, single: false }),
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
            <Button disabled={pending} className={`shadow-md items-center gap-2`} variant={`outline`} size={"default"}>
               {pending ? (
                  <Fragment>
                     <Loader2 size={14} className={`animate-spin`} />
                     Exporting ...
                  </Fragment>
               ) : (
                  <><FolderUp size={24} /><span>{t.notes_buttons_export}</span></>
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
                     handleExport(e.currentTarget.attributes.getNamedItem(`data-value`).value as (typeof EXPORT_FORMATS)[number]["value"]);
                  }}>
                  {icon}
                  {value}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default BulkExportNotesButton;