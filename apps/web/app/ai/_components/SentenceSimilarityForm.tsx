"use client";
import React, { Fragment, useState } from "react";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form";
import { Input } from "components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { runSentenceSimilarity, SentenceSimilarityResponse } from "../actions";
import { Button } from "components/ui/button";
import { isExecuting } from "next-safe-action/status";
import { Loader2 } from "lucide-react";

export interface SentenceSimilarityFormProps {
}

const formSchema = z.object({
   firstSentence: z.string().max(1000),
   secondSentence: z.string().max(1000),
});

type FormSchema = z.infer<typeof formSchema>

const InputField = ({ control, name, label, description, placeholder }: {
   name: keyof FormSchema,
   control: UseFormReturn<FormSchema>["control"]
   label: string,
   description: string,
   placeholder: string
}) => {
   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => (
            <FormItem className={`w-2/3`}>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <Input placeholder={placeholder} {...field} />
               </FormControl>
               <FormDescription>
                  {description}
               </FormDescription>
               <FormMessage />
            </FormItem>
         )}
      />
   );
};

const SentenceSimilarityForm = ({}: SentenceSimilarityFormProps) => {
   const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         firstSentence: ``,
         secondSentence: ``,
      },
   });

   const [response, setResponse] = useState<SentenceSimilarityResponse>();
   const { result, execute, status } = useAction(runSentenceSimilarity, {
      onSuccess: response => {
         console.log({ response });
         if (response.success) setResponse(response);

         form.reset();
      },
   });

   async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log({ values });
      execute({ sentences: [values.firstSentence, values.secondSentence] });
   }

   return (
      <div className="flex items-start gap-2">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full pl-8 border-l flex-[2]">
               <InputField
                  name={`firstSentence`}
                  control={form.control}
                  label={`1st sentence`}
                  description={`This is the first sentence.`} placeholder={`First sentence`} />
               <InputField
                  name={`secondSentence`}
                  control={form.control}
                  label={`2nd sentence`}
                  description={`This is the second sentence.`} placeholder={`Second sentence`} />
               <div className={`w-2/3 flex items-center justify-end`}>
                  <Button
                     disabled={isExecuting(status)}
                     className={`self-end !px-8 gap-2`}
                     type="submit">
                     {isExecuting(status) ? (
                        <Fragment>
                           <Loader2 size={14} className={`animate-spin`} />
                           Comparing ...
                        </Fragment>
                     ) : `Submit`}
                  </Button>
               </div>
            </form>
         </Form>
         <div className={` mt-8 flex-[1]`}>
            {response && (
               <span>
                  Similarity between <b>'{response.sentences[0]}'</b>
                  and <b>'{response.sentences[1]}'</b> is {` `}
                  <b>{response.output.similarity.toFixed(4)}</b>.
              </span>
            )}
         </div>
      </div>
   );
};

export default SentenceSimilarityForm;