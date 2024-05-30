"use client";
import React, { useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoadingSpinner, SocialLogins } from "./SocialLogins";
import { useIsDarkMode } from "hooks/useIsDarkMode";
import { usePromise } from "hooks/usePromise";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "components/ui/separator";

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?[\]\\';,./]).{6,}$/;

export const formSchema = z.object({
   username: z.string().min(2).max(50),
   email: z.string().email(),
   password: z.string().min(6).max(50).regex(PASSWORD_REGEX, {
      message: `Your password must contain at least one lowercase, one uppercase and one special character.`,
   }),
});

export type FormValues = z.infer<typeof formSchema>


const SignUpForm = () => {
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         username: "",
         email: ``,
         password: ``,
      },
   });
   const router = useRouter();
   const darkMode = useIsDarkMode();

   const [showPassword, setShowPassword] = useState(false);

   const PasswordIcon = useMemo(() =>
      showPassword ? EyeOffIcon : EyeIcon, [showPassword]);
   const { loading, action: signUp } = usePromise(async (values: FormValues) => {
      await signIn(`credentials`, {
         ...values,
         type: `signup`,
         redirect: false,
         callbackUrl: `/`,
      })
         .then(res => {
            console.log({ res });
            if (res?.error === `CredentialsSignin`) {
               form.setError(`email`, { message: `Invalid credentials` });
            } else {
               router.push(`/`);
            }
         })
         .catch(console.error);
   });

   async function onSubmit(values: FormValues) {
      await signUp(values);
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
            <FormField
               control={form.control}
               name="username"
               render={({ field }) => (
                  <FormItem className={`!mt-4`}>
                     <FormLabel>Username</FormLabel>
                     <FormControl className={`!mt-1`}>
                        <Input type={`text`} required placeholder="e.g. jack123" {...field} />
                     </FormControl>
                     <FormDescription className={`text-xs`}>
                        This is going to be your public display name.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem className={`!mt-6`}>
                     <FormLabel>E-mail</FormLabel>
                     <FormControl className={`!mt-1`}>
                        <Input type={`email`} required placeholder="e.g. jack@example.com" {...field} />
                     </FormControl>
                     <FormDescription className={`text-xs`}>
                        This is going to be your e-mail.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem className={`!mt-6`}>
                     <FormLabel>Password</FormLabel>
                     <FormControl className={`!mt-1`}>
                        <div className={`relative`}>
                           <Input required type={showPassword ? `text` : `password`}
                                  placeholder="e.g. jack@example.com" {...field} />
                           <PasswordIcon
                              onClick={_ => setShowPassword(!showPassword)}
                              className={`w-4 h-4 absolute right-3 top-3 cursor-pointer`} />
                        </div>
                     </FormControl>
                     <FormDescription className={`text-xs`}>
                        This is going to be your password.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button
               disabled={loading}
               size={`default`}
               variant={darkMode ? `secondary` : `outline`}
               className={`self-end !px-12 !py-1 rounded-full !mt-8 shadow-md`}
               type="submit">

               {loading ? <LoadingSpinner text={`Creating an account ...`} /> : `Create an account`}
            </Button>
            <div className={`flex items-center gap-3`}>
               <Separator className={`w-full flex-1`} />
               <span className={`text-sm text-neutral-500`}>OR</span>
               <Separator className={`w-full flex-1`} />
            </div>
            <SocialLogins />
         </form>
      </Form>
   );
};

export default SignUpForm;
