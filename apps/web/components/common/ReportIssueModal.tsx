"use client";
import React, { Fragment } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription, DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, OctagonAlert } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { reportIssue } from "@/components/common/actions";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isExecuting } from "next-safe-action/status";
import { useBoolean } from "@/hooks/useBoolean";

export interface ReportIssueModalProps {
   modalOpen: boolean;
   setModalOpen: (value: boolean) => void;
}

const ReportIssueModal = ({ setModalOpen, modalOpen }: ReportIssueModalProps) => {
   const [success, setSuccess] = useBoolean(false);

   return (
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
         <DialogTrigger></DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  <OctagonAlert size={40} />
               </DialogTitle>
               <DialogDescription className={`mt-8`}>
                  <h2 className={`text-lg text-black drop-shadow-md`}>
                     Report an issue
                  </h2>
                  {success ? (
                     <div>
                        Thank you for reporting the issue! Our team will review your report
                        and work on a solution. We might reach out
                        via e-mail for more information or update you on the progress.
                     </div>
                  ) : (
                     <p className={`mt-2`}>
                        We’re here to help! Please provide details about the problem you encountered.
                     </p>
                  )}
               </DialogDescription>
            </DialogHeader>
            {success ? (
               <DialogFooter className={`flex w-full items-center justify-between`}>
                  <Button>Back </Button>
                  <Button>Close </Button>
               </DialogFooter>
            ) : <ReportIssueForm onAfterSubmit={() => setSuccess(true)} />}
         </DialogContent>
      </Dialog>
   );
};

interface ReportIssueFormProps {
   onAfterSubmit?: () => void;
}

const schema = z.object({
   type: z.string(),
   description: z.string(),
   priority: z.string(),
});

type FormValues = z.infer<typeof schema>

const ReportIssueForm = ({ onAfterSubmit }: ReportIssueFormProps) => {
   const form = useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
         type: `Bug`,
         description: ``,
         priority: `Low`,
      },
   });
   const { result, execute, status } = useAction(reportIssue, {
      onSuccess: res => {
         if (res.success) {
            console.log(res);
            onAfterSubmit?.();
         }
      },
   });

   async function onSubmit(values) {
      execute(values);
   }

   return (
      <div>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
               <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                     <FormItem className={`!mt-4`}>
                        <FormLabel>Type of issue</FormLabel>
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                           <FormControl className={`!mt-1`}>
                              <SelectTrigger>
                                 <SelectValue placeholder="Select a type" />
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                              <SelectItem value="Bug">
                                 Bug/Technical Issue
                              </SelectItem>
                              <SelectItem value="Feature Request">
                                 Feature Request
                              </SelectItem>
                              <SelectItem value="Usability Problem">
                                 Usability Problem
                              </SelectItem>
                              <SelectItem value="Other">
                                 Other
                              </SelectItem>
                           </SelectContent>
                        </Select>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage className={`dark:text-red-400`} />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                     <FormItem className={`!mt-4`}>
                        <FormLabel>
                           A brief description of the issue
                        </FormLabel>
                        <FormControl className={`!mt-1`}>
                           <Input type={`text`} required placeholder="Enter a description" {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage className={`dark:text-red-400`} />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                     <FormItem className={`!mt-4`}>
                        <FormLabel>
                           Prioritize the issue
                        </FormLabel>
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                           <FormControl className={`!mt-1`}>
                              <SelectTrigger>
                                 <SelectValue placeholder="Select a priority" />
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                              <SelectItem value="Low">
                                 Low
                              </SelectItem>
                              <SelectItem value="Medium">
                                 Medium
                              </SelectItem>
                              <SelectItem value="High">
                                 High
                              </SelectItem>
                              <SelectItem value="Critical">
                                 Critical
                              </SelectItem>
                           </SelectContent>
                        </Select>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage className={`dark:text-red-400`} />
                     </FormItem>
                  )}
               />
               <div className={`w-full flex items-center justify-between !mt-8`}>
                  <Button className={`shadow-md !px-6`} variant={`destructive`}>
                     Cancel
                  </Button>
                  <Button
                     disabled={isExecuting(status)} size={`lg`} className={`!px-6 shadow-md items-center gap-2`}
                     type={`submit`}>
                     {isExecuting(status) ? (
                        <Fragment>
                           <Loader2 size={18} className={`animate-spin`} />
                           Submitting ...
                        </Fragment>
                     ) : `Submit`}

                  </Button>
               </div>
            </form>
         </Form>
      </div>
   );
};

export default ReportIssueModal;