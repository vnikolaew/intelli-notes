"use client";
import React, { Fragment } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import ReportIssueModal from "@/components/common/ReportIssueModal";
import { parseAsBoolean, useQueryState } from "nuqs";

export interface ReportIssueButtonProps {
}

const ReportIssueButton = ({}: ReportIssueButtonProps) => {
   const [modalOpen, setModalOpen] = useQueryState(`report`, parseAsBoolean);

   return (
      <Fragment>
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button
                     onClick={_ => setModalOpen(true)}
                     className={`rounded-md p-2`}
                     variant={`ghost`}
                     size={"icon"}>
                     <Flag className={`stroke-[2px] text-neutral-700`} size={20} />
                  </Button>
               </TooltipTrigger>
               <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs`}>
                  Report an issue
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <ReportIssueModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
      </Fragment>
   );
};

export default ReportIssueButton;