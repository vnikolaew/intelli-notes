"use client";
import { Note } from "@repo/db";
import React, { PropsWithChildren } from "react";
import {
   FacebookIcon,
   FacebookShareButton,
   LinkedinIcon,
   LinkedinShareButton, RedditIcon, RedditShareButton,
   TwitterIcon,
   TwitterShareButton, ViberIcon, ViberShareButton,
} from "react-share";
import { APP_NAME } from "@/config/site";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface NoteSocialShareButtonsProps {
   note: Note;
}

const SIZE = 28;

const SOCIALS = [
   {
      title: `Facebook`,
      Icon: ({ note }: { note: Note }) =>
         <FacebookShareButton hashtag={note.tags.map(t => `#${t}`).join(" ")}
                              url={`${process.env.NEXT_PUBLIC_BASE_URL}/explore?previewId=${note.id}`}>
            <FacebookIcon size={SIZE} className={`rounded-full`} />
         </FacebookShareButton>,
   },
   {
      title: `Twitter`,
      Icon: ({ note }: { note: Note }) =>
         <TwitterShareButton
            title={note.title} hashtags={note.tags.map(t => `${t}`)}
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/explore?previewId=${note.id}`}>
            <TwitterIcon size={SIZE} className={`rounded-full`} />
         </TwitterShareButton>,
   },
   {
      title: `LinkedIn`,
      Icon: ({ note: { id, tags, title, raw_text } }: { note: Note }) =>
         <LinkedinShareButton
            summary={`${raw_text.slice(0, 30)}...`} source={APP_NAME} title={title}
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/explore?previewId=${id}`}>
            <LinkedinIcon size={SIZE} className={`rounded-full`} />
         </LinkedinShareButton>,
   },
   {
      title: `Viber`,
      Icon: ({ note: { id, tags, title, raw_text } }: { note: Note }) =>
         <ViberShareButton title={title} url={`${process.env.NEXT_PUBLIC_BASE_URL}/explore?previewId=${id}`}>
            <ViberIcon size={SIZE} className={`rounded-full`} />
         </ViberShareButton>,
   },
   {
      title: `Reddit`,
      Icon: ({ note: { id, tags, title, raw_text } }: { note: Note }) =>
         <RedditShareButton title={title} url={`${process.env.NEXT_PUBLIC_BASE_URL}/explore?previewId=${id}`}>
            <RedditIcon size={SIZE} className={`rounded-full`} />
         </RedditShareButton>,
   },
] as const;

/**
 * Renders a set of social share buttons for a note.
 *
 * @param {NoteSocialShareButtonsProps} props - The props object containing the note object.
 * @return {JSX.Element} The rendered social share buttons.
 */
const NoteSocialShareButtons = ({ note }: NoteSocialShareButtonsProps) => {
   return (
      <div className={`flex items-center gap-2 flex-1`}>
         {SOCIALS.map(({ Icon, title }, index) => (
            <SocialShareButton key={note.id + title} title={title}>
               <Icon note={note} />
            </SocialShareButton>
         ))}
      </div>
   );
};

const SocialShareButton = ({ title, children }: PropsWithChildren & { title: string }) => {
   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger asChild>
               {children}
            </TooltipTrigger>
            <TooltipContent side={`bottom`} className={`bg-black text-white rounded-md text-xs !z-30`}>
               {`Share to ${title}`}
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};

export default NoteSocialShareButtons;