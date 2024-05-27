"use client";
import React, { useState } from "react";
import {
   activeEditor$,
   currentSelection$,
   DirectiveDescriptor,
   insertDirective$, useCellValue,
   useCellValues,
   usePublisher,
} from "@mdxeditor/editor";
import { Button } from "components/ui/button";
import { Pencil, Play, Trash } from "lucide-react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";

export interface YoutubeComponentProps {
}

export const YTDescriptor: DirectiveDescriptor = {
   name: "yt",
   testNode(node) {
      return node.name === "yt";
   },
   // set some attribute names to have the editor display a property editor popup.
   attributes: [`attribute`, `key`, `videoId`],
   type: "containerDirective",
   // used by the generic editor to determine whether or not to render a nested editor.
   hasChildren: true,
   Editor: (props) => {
      const [videoId, setVideoId] = useState(props.mdastNode.attributes.videoId);
      const [dialogOpen, setDialogOpen] = useState(false);
      const [currentSelection, activeEditor] = useCellValues(currentSelection$, activeEditor$);
      const value = useCellValue(currentSelection$);

      const form = useForm<FormValues>({
         resolver: zodResolver(formSchema),
         defaultValues: {
            videoId,
         },
      });

      function onSubmit({ videoId }: FormValues) {
         setVideoId(videoId);
         setDialogOpen(false);
         console.log(`Hi!`, activeEditor._nodes, { value });
      }

      return (
         <div
            id={`yt-video-${videoId}`}
            className={`border-[1px] border-neutral-300 rounded-lg p-2 m-2 w-fit relative`} {...props} {...props.mdastNode.attributes}>
            <iframe
               width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`}
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen></iframe>
            <div className={`flex items-center gap-2 bg-transparent absolute -top-2 -right-2`}>
               <TooltipProvider>
                  <Tooltip>
                     <TooltipTrigger onClick={
                        e => {
                           e.preventDefault();
                           const element = document.getElementById(`yt-video-${videoId}`);
                           if(element) element.parentElement.removeChild(element)
                           console.log({ element });
                        }
                     } asChild>
                        <Button onClick={e => {
                           e.preventDefault();
                           const element = document.getElementById(`yt-video-${videoId}`);
                           console.log({ element });
                        }} className={`gap-2 rounded-full !w-8 !h-8 bg-opacity-30 !bg-red-400`} size={"icon"}
                                variant={"destructive"}>
                           <Trash className={``} size={18} />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent className={`bg-black rounded-md text-xs text-white`}>Delete</TooltipContent>
                  </Tooltip>
               </TooltipProvider>
               <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
                  <DialogTrigger asChild>
                     <TooltipProvider>
                        <Tooltip>
                           <TooltipTrigger onClick={_ => setDialogOpen(true)} asChild>
                              <Button variant={"outline"} className={`rounded-full  !w-8 !h-8`}
                                      size={"icon"}>
                                 <Pencil size={18} className={` text-neutral-900 cursor-pointer`} />
                              </Button>
                           </TooltipTrigger>
                           <TooltipContent className={`bg-black rounded-md text-xs text-white`}>Edit</TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  </DialogTrigger>
                  <DialogContent>
                     <DialogHeader>
                        <DialogTitle>Edit YT Video ID</DialogTitle>
                     </DialogHeader>
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                           <FormField
                              control={form.control}
                              name="videoId"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Video ID</FormLabel>
                                    <FormControl>
                                       <Input placeholder="Enter the Youtube video ID" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <div className={`w-full flex justify-end`}>
                              <Button className={`ml-auto`} type="submit">Save</Button>
                           </div>
                        </form>
                     </Form>
                  </DialogContent>
               </Dialog>
            </div>
         </div>
      );
   },
};

const formSchema = z.object({
   videoId: z.string(),
});

type FormValues = z.infer<typeof formSchema>

// a toolbar button that will insert a JSX element into the editor.
export const InsertYoutube = () => {
   const insert = usePublisher(insertDirective$);
   const [dialogOpen, setDialogOpen] = useState(false);
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         videoId: "",
      },
   });

   const handleAddYTVideo = (videoId: string) => {
      insert({
         name: "yt",
         type: "containerDirective",
         attributes: { key: `value`, videoId },
      });
   };

   function onSubmit({ videoId }: FormValues) {
      handleAddYTVideo(videoId);
      setDialogOpen(false);
   }

   return (
      <>
         <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
            <DialogTrigger>
               <Button
                  variant={`destructive`}
                  className={`gap-2 items-center`}
                  onClick={() => {
                  }}
               >
                  <Play className={`fill-white text-white border-white outline-white stroke-white`} size={14} />
                  Add a Youtube Video
               </Button>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Enter YT Video ID</DialogTitle>
                  <DialogDescription>

                  </DialogDescription>
               </DialogHeader>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <FormField
                        control={form.control}
                        name="videoId"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Video ID</FormLabel>
                              <FormControl>
                                 <Input placeholder="Enter the Youtube video ID" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <Button type="submit">Submit</Button>
                  </form>
               </Form>
            </DialogContent>
         </Dialog>
      </>
   );
};

const YoutubeComponent = ({}: YoutubeComponentProps) => {
   return (
      <div>

      </div>
   );
};

export default YoutubeComponent;