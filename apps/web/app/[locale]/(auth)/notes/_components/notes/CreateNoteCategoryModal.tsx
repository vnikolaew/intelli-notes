import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { toast, TOASTS } from "@/config/toasts";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isExecuting } from "next-safe-action/status";
import { Loader2 } from "lucide-react";
import React, { PropsWithChildren } from "react";
import { z } from "zod";
import { createCategory } from "@/app/[locale]/(auth)/notes/actions";

export interface CreateNoteCategoryModalProps extends PropsWithChildren {
   open: boolean;
   setOpen: (value: boolean) => void;

}

const formSchema = z.object({
   title: z.string().min(3).max(100),
});

type FormValues = z.infer<typeof formSchema>

export const CreateNoteCategoryModal = ({ setOpen, open, children }: CreateNoteCategoryModalProps) => {
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: ``,
      },
   });
   const { execute, status } = useAction(createCategory, {
      onSuccess: res => {
         if (res.success) {
            console.log(res);
            toast(TOASTS.CREATE_CATEGORY_SUCCESS);
            setOpen(false);
         }
      },
   });

   function onSubmit({ title }: FormValues) {
      console.log({ title });
      execute({ title });
   }

   return (
      <Dialog onOpenChange={value => {
         console.log(`Changing modal open state ...`);
         setOpen(value);
      }} open={open}>
         <DialogTrigger >{children}</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Create a new category</DialogTitle>
               <DialogDescription>

               </DialogDescription>
            </DialogHeader>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem className={`!mt-4`}>
                           <FormLabel>Category title</FormLabel>
                           <FormControl className={`!mt-1`}>
                              <Input type={`text`} required placeholder="e.g. Tasks" {...field} />
                           </FormControl>
                           <FormDescription>
                              This will be the name of the category.
                           </FormDescription>
                           <FormMessage className={`dark:text-red-400`} />
                        </FormItem>
                     )}
                  />
                  <div className={`flex w-full justify-end mt-4`}>
                     <Button className={`items-center gap-2`} type={`submit`} disabled={isExecuting(status)} size={`sm`}
                             variant={`default`}>
                        {isExecuting(status) ? <>
                           <Loader2 size={18} className={`animate-spin`} />
                           Creating ...
                        </> : (
                           `Create`
                        )}
                     </Button>
                  </div>
               </form>
            </Form>
         </DialogContent>
      </Dialog>

   );
};