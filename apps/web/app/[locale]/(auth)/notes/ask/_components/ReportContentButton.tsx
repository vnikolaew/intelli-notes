"use client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { Button } from "components/ui/button";
import { ChevronLeft, Flag } from "lucide-react";
import React, { Fragment, useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { useBoolean } from "@/hooks/useBoolean";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/modals/SocialLogins";
import { useAction } from "next-safe-action/hooks";
import { isExecuting } from "next-safe-action/status";
import { reportAiContent } from "@/app/[locale]/(auth)/notes/ask/actions";

export const ReportContentButton = () => {
   const [open, setOpen] = useBoolean();
   return (
      <Fragment>
         <TooltipProvider>
            <Tooltip delayDuration={200}>
               <TooltipTrigger
                  className={`mb-1`}
                  asChild>
                  <Button onClick={_ => setOpen(true)} className={`hover:!bg-neutral-600 group`} variant={`ghost`}
                          size={`icon`}>
                     <Flag className={`group-hover:!text-white`} size={22} />
                  </Button>
               </TooltipTrigger>
               <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs max-w-[240px]`}>
                  Report content
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
         <ReportContentModal open={open} setOpen={setOpen} /></Fragment>

   );
};


interface ReportContentModalProps {
   open: boolean;
   setOpen: (value: boolean) => void;
}

const REPORT_CAUSES = [
   "Animal welfare",
   "Data protection and privacy violations",
   "Illegal or harmful speech",
   "Intellectual property infringements",
   "Negative effects on civic discourse or elections",
   "Non-consensual behaviour",
   "Pornography or sexualized content",
   "Protection of minors",
   "Risk for public security",
   "Scams and/or fraud",
   "Self-harm",
   "Unsafe, non-compliant or prohibited products",
   "Violence",
];

const ReportContentModal = ({ setOpen, open }: ReportContentModalProps) => {
   const [step, setStep] = useState(1);
   const [report, setReport] = useState(``);

   return (
      <Dialog onOpenChange={setOpen} open={open}>
         <DialogTrigger></DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Report a conversation</DialogTitle>
               <Separator className={`w-full`} />
               <DialogDescription className={`!mt-4`}>
                  <h2 className={`text-lg`}>
                     Please tell us why you are reporting
                  </h2>
                  <p className={`text-sm mt-2 text-muted-foreground`}>
                     Your help will allows us to take the correct action based on the reported content.
                  </p>
               </DialogDescription>
            </DialogHeader>
            {step === 1 && (
               <div className={`my-4 border-[1px] border-neutral-300 rounded-lg !bg-transparent`}>
                  {REPORT_CAUSES.map((cause, index) => (
                     <div
                        onClick={_ => {
                           setReport(cause);
                           setStep(2);
                        }}
                        className={`px-4 py-2 !border-neutral-300 !text-xs border-[1px] cursor-pointer hover:!bg-neutral-200 transition-all duration-200 !rounded-lg`}
                        key={cause}>{cause}</div>
                  ))}
               </div>
            )}
            {step === 2 && (
               <ReportContentDetailsForm
                  report={report} onBack={() => setStep(1)} afterSubmit={() => {
                  setStep(3);
               }} />
            )}
            {step === 3 && (
               <div>
                  Thanks for your report.
               </div>
            )}
         </DialogContent>
      </Dialog>

   );
};

interface ReportContentDetailsFormProps {
   afterSubmit: () => void;
   onBack: () => void;
   report: string;

}

const schema = z.object({
   details: z.string().min(1).max(300),
});

export type FormValues = z.infer<typeof schema>

const ReportContentDetailsForm = ({ afterSubmit, onBack, report }: ReportContentDetailsFormProps) => {
   const form = useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
         details: ``,
      },
   });
   const { execute, status } = useAction(reportAiContent, {
      onSuccess: res => {
         if (res.success) console.log(res);
      },
   });

   async function onSubmit({ details }) {
      execute({ details, reportCause: report });
      afterSubmit?.();
   }

   return (
      <div>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
               <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                     <FormItem className={`!mt-4`}>
                        <Button
                           className={`items-center gap-2 rounded-full`} variant={"ghost"}
                           onClick={_ => onBack?.()}>
                           <ChevronLeft />
                           Other
                        </Button>
                        <FormControl className={`!mt-1`}>
                           <Textarea required placeholder="Please provide more details" {...field} />
                        </FormControl>
                        <FormDescription className={`text-xs mt-2`}>
                           By clicking submit, you attest that the information in this form is accurate under penalty of
                           perjury.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button
                  disabled={isExecuting(status)}
                  size={`default`}
                  variant={`outline`}
                  className={`self-end !px-12 !py-1 rounded-full !mt-8 shadow-md`}
                  type="submit">
                  {isExecuting(status) ? <LoadingSpinner text={`Creating an account ...`} /> : `Submit`}
               </Button>
            </form>
         </Form>
      </div>
   );
};