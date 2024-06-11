"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
   Command,
   CommandGroup,
   CommandItem,
   CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { PropsWithChildren } from "react";

export type Item = Record<"value" | "label", string>;

export interface FancyMultiSelectProps extends PropsWithChildren {
   items: Item[],
   placeholder?: string
   selected: Item[]
   setSelected: React.Dispatch<React.SetStateAction<Item[]>>
}


export function MultiSelect({ items, placeholder, setSelected, selected , children }: FancyMultiSelectProps) {
   const inputRef = React.useRef<HTMLInputElement>(null);
   const [open, setOpen] = React.useState(false);
   const [inputValue, setInputValue] = React.useState("");

   const handleUnselect = React.useCallback((framework: Item) => {
      setSelected((prev) => (prev ?? []).filter((s) => s.value !== framework.value));
   }, []);

   const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
         const input = inputRef.current;
         if (input) {
            if (e.key === "Delete" || e.key === "Backspace") {
               if (input.value === "") {
                  setSelected((prev) => {
                     const newSelected = [...(prev ?? [])];
                     newSelected.pop();
                     return newSelected;
                  });
               }
            }
            // This is not a default behaviour of the <input /> field
            if (e.key === "Escape") {
               input.blur();
            }
         }
      },
      [],
   );

   const selectables = items.filter(
      (i) => !selected.map(s => s.value).includes(i.value),
   );

   return (
      <Command
         onKeyDown={handleKeyDown}
         className="overflow-visible bg-transparent"
      >
         <div
            className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-0  focus-within:ring-offset-0 bg-white relative">
            <div title={`Clear`} onClick={_ => setSelected([])} className={`absolute right-2 top-1/2 -translate-y-1/2`}>
               <X className={`cursor-pointer hover:opacity-60 transition-opacity duration-200`} size={14} />
            </div>
            <div className="flex flex-wrap gap-1 ml-4">
               {selected.map((framework) => {
                  return (
                     <Badge key={framework.value} variant="default">
                        {framework.label}
                        <button
                           className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                           onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                 handleUnselect(framework);
                              }
                           }}
                           onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                           }}
                           onClick={() => handleUnselect(framework)}
                        >
                           <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                        </button>
                     </Badge>
                  );
               })}
               {/* Avoid having the "Search" Icon */}
               <CommandPrimitive.Input
                  ref={inputRef}
                  value={inputValue}
                  onValueChange={setInputValue}
                  onBlur={() => setOpen(false)}
                  onFocus={() => setOpen(true)}
                  placeholder={placeholder ?? "Select tags..."}
                  className="ml-3 flex-1 bg-transparent outline-none placeholder:text-muted-foreground !focus:ring-0"
               />
            </div>
            {children}
         </div>
         <div className="relative mt-2">
            <CommandList>
               {open && selectables.length > 0 ? (
                  <div
                     className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                     <CommandGroup className="h-full overflow-auto">
                        {selectables.map((framework) => {
                           return (
                              <CommandItem
                                 key={framework.value}
                                 onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                 }}
                                 onSelect={(value) => {
                                    setInputValue("");
                                    setSelected((prev) => {
                                       return [...(prev ?? []), framework];
                                    });
                                 }}
                                 className={"cursor-pointer"}
                              >
                                 {framework.label}
                              </CommandItem>
                           );
                        })}
                     </CommandGroup>
                  </div>
               ) : null}
            </CommandList>
         </div>
      </Command>
   );
}