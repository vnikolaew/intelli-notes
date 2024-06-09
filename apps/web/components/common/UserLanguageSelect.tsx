"use client";
import React from "react";
import { useBoolean } from "@/hooks/useBoolean";
import { Select, SelectContent, SelectItem } from "../ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { changeUserLanguage } from "@/components/common/actions";
import languages from "@/messages/languages.json";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export interface UserLanguageSelectProps {
}


const UserLanguageSelect = ({}: UserLanguageSelectProps) => {
   const [open, setOpen] = useBoolean();
   const { t } = useTranslation(`home`, { keyPrefix: `Header.UserDropdown` });
   const { execute } = useAction(changeUserLanguage, {
      onSuccess: res => {
         if (res.success) {
            console.log(res);

            const segments = window.location.pathname.split(`/`).filter(_ => !!_.length);
            window.location.pathname = `/${segments.slice(1).join(`/`)}`
         }
      },
   });

   return (
      <Select onValueChange={l => execute({ language: l })} onOpenChange={setOpen} open={open}>
         <SelectTrigger withIcon={false} className="w-full !bg-transparent !border-none !px-0 !py-0 !h-fit">
            <div className={`w-full flex items-center gap-2`}>
               <Globe size={18} />
               {t(`Language`)}
            </div>
         </SelectTrigger>
         <SelectContent>
            <ScrollArea className={`h-[180px]`}>
               {languages.languages.map(({ name, abbreviation }, _) => (
                  <SelectItem className={``} onSelect={_ => {
                     console.log(name, abbreviation);
                  }} onClick={e => {
                     e.preventDefault();
                     e.stopPropagation();
                     console.log(name, abbreviation);
                  }} key={name} value={abbreviation}>
                     <div className={`!flex !flex-row items-center gap-2`}>
                        <Image
                           height={24} width={24} alt={``}
                           src={`https://flaglog.com/codes/standardized-rectangle-120px/${abbreviation.toUpperCase()}.png`} />
                        {name}
                     </div>
                  </SelectItem>
               ))}
            </ScrollArea>
         </SelectContent>
      </Select>
   );
};

export default UserLanguageSelect;