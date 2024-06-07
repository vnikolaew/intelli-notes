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
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export interface UserLanguageSelectProps {
}


const UserLanguageSelect = ({}: UserLanguageSelectProps) => {
   const [open, setOpen] = useBoolean();
   const { t } = useTranslation(`home`, {keyPrefix: `Header.UserDropdown`});
   const { result, status, execute } = useAction(changeUserLanguage, {
      onSuccess: res => {
         if (res.success) {
            console.log(res);
            window.location.reload()
         }
      },
   });

   return (
      <Select  onValueChange={l => {
         console.log(l);
         execute({ language: l });

      }} onOpenChange={setOpen} open={open}>
         <SelectTrigger withIcon={false} className="w-full !bg-transparent !border-none !px-0 !py-0 !h-fit">
            <div className={`w-full flex items-center gap-2`}>
               <Globe size={18} />
               {t(`Language`)}
            </div>
         </SelectTrigger>
         <SelectContent >
            <ScrollArea className={`h-[180px]`}>
               {languages.languages.map(({ name, abbreviation }, index) => (
                  <SelectItem onSelect={_ => {
                     console.log(name, abbreviation);
                  }} onClick={e => {
                     e.preventDefault();
                     e.stopPropagation()
                     console.log(name, abbreviation);
                  }} key={name} value={abbreviation}>{name}</SelectItem>
               ))}
            </ScrollArea>
         </SelectContent>
      </Select>
   );
};

export default UserLanguageSelect;