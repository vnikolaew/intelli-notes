"use client";
import React from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import {
   Dialog,
   DialogTrigger,
   DialogFooter,
   DialogTitle,
   DialogDescription,
   DialogHeader,
   DialogContent,
} from "components/ui/dialog";
import { Separator } from "components/ui/separator";
import { ScrollArea } from "components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";

enum TABS {
   SIGN_UP = `SIGN_UP`,
   SIGN_IN = "SIGN_IN"
}

export interface SignInModalProps {
   open: boolean;
   setOpen: (value: boolean) => void;
}

const SignInModal = ({setOpen, open}:SignInModalProps) => {

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
               <DialogTitle className={`text-center`}>Sign up to your account</DialogTitle>
               <DialogDescription>
                  <Separator className={`w-5/6 mx-auto mt-2 dark:bg-neutral-700 rounded-full`} />
               </DialogDescription>
            </DialogHeader>
            <ScrollArea className="grid gap-4 py-4 h-[65vh]">
               <Tabs
                  defaultValue={TABS.SIGN_IN}
                  className="px-4">
                  <TabsList className="w-full">
                     <TabsTrigger className={`w-1/2`} value={TABS.SIGN_UP}>Sign up</TabsTrigger>
                     <TabsTrigger className={`w-1/2`} value={TABS.SIGN_IN}>Sign in</TabsTrigger>
                  </TabsList>
                  <TabsContent className={`mt-4 w-3/4 mx-auto`} value={TABS.SIGN_UP}>
                     <SignUpForm />
                  </TabsContent>
                  <TabsContent className={`mt-4 w-3/4 mx-auto`} value={TABS.SIGN_IN}>
                     <SignInForm />
                  </TabsContent>
               </Tabs>
            </ScrollArea>
            <DialogFooter className={`my-2`}>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default SignInModal;
;
