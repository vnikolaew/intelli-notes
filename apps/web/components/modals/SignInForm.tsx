"use client";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { LoadingSpinner, SocialLogins } from "./SocialLogins";
import { useIsDarkMode } from "hooks/useIsDarkMode";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { Separator } from "components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form";
import { usePromise } from "hooks/usePromise";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?[\]\\';,./]).{6,}$/;

const formSchema = z.object({
   usernameOrEmail: z.string().min(2).max(50),
   password: z.string().min(6).max(50).regex(PASSWORD_REGEX),
});

type FormValues = z.infer<typeof formSchema>


const SignInForm = () => {
   const router = useRouter()
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         usernameOrEmail: "",
         password: ``,
      },
   });
   const [showPassword, setShowPassword] = useState(false);
   const darkMode = useIsDarkMode();
   const pathname=  usePathname()
   const { loading, action: signInAction } = usePromise(async (values: FormValues) =>
      await signIn(`credentials`, {
         username: values.usernameOrEmail,
         email: values.usernameOrEmail,
         password: values.password,
         type: `signin`,
         redirect: false,
         callbackUrl: pathname
      })
         .then(res => {
            if (res?.error === `CredentialsSignin`) {
               form.setError(`usernameOrEmail`, { message: `Invalid credentials` });
            }
            router.push(`/`)
         })
         .catch(console.error));


   const PasswordIcon = useMemo(() => {
      return showPassword ? EyeOffIcon : EyeIcon;
   }, [showPassword]);

   async function onSubmit(values: FormValues) {
      await signInAction(values);
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
            <FormField
               control={form.control}
               name="usernameOrEmail"
               render={({ field }) => (
                  <FormItem className={`!mt-4`}>
                     <FormLabel>Username or e-mail</FormLabel>
                     <FormControl className={`!mt-1`}>
                        <Input type={`text`} required placeholder="e.g. jack123 or jack123@example.com" {...field} />
                     </FormControl>
                     <FormDescription>
                     </FormDescription>
                     <FormMessage className={`dark:text-red-400`} />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem className={`!mt-6`}>
                     <FormLabel htmlFor={`password`}>Password</FormLabel>
                     <FormControl className={`!mt-1`}>
                        <div className={`relative`}>
                           <Input required type={showPassword ? `text` : `password`}
                                  placeholder="e.g. jack@example.com" {...field} />
                           <PasswordIcon
                              onClick={_ => setShowPassword(!showPassword)}
                              className={`w-4 h-4 absolute right-3 top-3 cursor-pointer`} />
                        </div>
                     </FormControl>
                     <FormDescription>
                        <Button size={`sm`} className={`text-xs !mx-0 !px-0`} variant={`link`} asChild>
                           <Link href={`/?modal=2`}>
                              Forgot your password?
                           </Link>
                        </Button>
                     </FormDescription>
                     <FormMessage className={`dark:text-red-400`} />
                  </FormItem>
               )}
            />
            <Button
               disabled={loading}
               size={`default`}
               variant={darkMode ? `secondary` : `outline`}
               className={`self-end !px-12 !py-1 rounded-full !mt-8 shadow-md !min-w-1/2`}
               type="submit">
               {loading ? <LoadingSpinner /> : `Sign in`}
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

export default SignInForm;
