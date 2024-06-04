"use client";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "components/ui/dialog";
import React, { useState } from "react";
import { Loader2, Star } from "lucide-react";
import { cn } from "lib/utils";
import { Label } from "components/ui/label";
import { Textarea } from "components/ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "components/ui/button";
import { useBoolean } from "hooks/useBoolean";
import { useAction } from "next-safe-action/hooks";
import { submitUserFeedback } from "./actions";
import { isExecuting } from "next-safe-action/status";
import { TOASTS, toast } from "config/toasts";

export interface UserFeedbackModalProps {
   open: boolean;
}

interface UserFeedback {
   rating: number;
   message: string;
   anonymous: boolean;
}

const UserFeedbackModal = ({ open }: UserFeedbackModalProps) => {
   const [currentlyHovered, setCurrentlyHovered] = useState(0);
   const [dialogOpen, setDialogOpen] = useBoolean(open);
   const { execute, status } = useAction(submitUserFeedback, {
      onSuccess: res => {
         if (res.success) {
            console.log(res.result);
            setDialogOpen(false)
            toast(TOASTS.USER_FEEDBACK_SUCCESS)
         }
      },
   });
   const [userFeedback, setUserFeedback] = useState<UserFeedback>({
      anonymous: false,
      message: ``,
      rating: 0,
   });

   return (
      <Dialog open={dialogOpen}>
         <DialogTrigger></DialogTrigger>
         <DialogContent className={`!p-8`}>
            <DialogHeader>
               <DialogTitle className={`text-center text-2xl`}>Give us Feedback</DialogTitle>
               <DialogDescription className={`text-center !mt-4`}>
                  Please rate the performance of our application and leave your feedback below
               </DialogDescription>
            </DialogHeader>
            <div className={`flex items-center gap-2 !mt-6 w-full justify-center `}>
               {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                          <Star
                             onClick={_ => setUserFeedback({ ...userFeedback, rating: i + 1 })}
                             onMouseOver={_ => {
                                setCurrentlyHovered(i + 1);
                             }}
                             onMouseLeave={_ => setCurrentlyHovered(0)}
                             className={cn(`text-muted-foreground cursor-pointer hover:!fill-amber-400 hover:!text-amber-400 duration-100 transition-all`,
                                i + 1 <= Math.max(currentlyHovered, userFeedback.rating) && `fill-amber-400 text-amber-400`)}
                             size={32} />
                  </span>
               ))}
            </div>
            <div className={`mt-4`}>
               <Label className={`text-muted-foreground`} htmlFor={`feedback`}>Your feedback (Optional)</Label>
               <Textarea
                  onChange={e => setUserFeedback({ ...userFeedback, message: e.target.value })}
                  value={userFeedback.message} className={`mt-2`} rows={3} placeholder="Type your feedback here."
                  id="feedback" />
               <p className="text-sm text-muted-foreground mt-1">
                  Max 1000 characters.
               </p>
            </div>
            <div className={`mt-8 flex items-center gap-4`}>
               <Checkbox onCheckedChange={value => setUserFeedback({ ...userFeedback, anonymous: value as boolean })}
                         checked={userFeedback.anonymous} id={`anonymous`} />
               <div className={`flex flex-col items-start gap-1 `}>
                  <Label className={`text-base`} htmlFor={`anonymous`}>
                     Submit anonymously
                  </Label>
                  <span className={`text-sm text-muted-foreground`}>Your name will be hidden</span>
               </div>
            </div>
            <div className={`mt-8 flex flex-col items-center gap-2 w-2/3 mx-auto justify-center`}>
               <Button disabled={isExecuting(status)} onClick={_ => {
                  execute(userFeedback);
               }} className={`w-full gap-2 items-center`} variant={`default`}>
                  {isExecuting(status) ? (
                     <>
                        <Loader2 size={18} className={`animate-spin`} />
                        Submitting ...
                     </>
                  ) : `Submit`}
               </Button>
               <Button disabled={isExecuting(status)} onClick={_ => setDialogOpen(false)} className={`w-full`} variant={`outline`}>Skip</Button>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default UserFeedbackModal;