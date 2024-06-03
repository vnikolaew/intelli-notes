"use server";

import { authorizedAction } from "lib/actions";
import { z } from "zod";
import { xprisma } from "@repo/db";
import { revalidatePath } from "next/cache";
import { sleep } from "lib/utils";

const likeSchema = z.object({
   noteId: z.string(),
});

/**
 * A server action for linking another user's note.
 */
export const likeNote = authorizedAction(likeSchema, async ({ noteId }, { userId }) => {
   const note = await xprisma.note.findUnique({
      where: { id: noteId },
   });
   if (!note) return { success: false };


   let noteLike = await xprisma.noteLike.findFirst({
      where: { noteId, userId },
   });
   if (noteLike) return { success: false };

   noteLike = await xprisma.noteLike.create({
      data: { noteId, userId },
   });

   revalidatePath(`/explore`);
   return { success: true, noteLike };
});

/**
 * A server action for unlinking another user's note.
 */
export const unlikeNote = authorizedAction(likeSchema, async ({ noteId }, { userId }) => {
   const note = await xprisma.note.findUnique({
      where: { id: noteId },
   });
   if (!note) return { success: false };

   let noteLike = await xprisma.noteLike.findFirst({
      where: { noteId, userId },
   });
   if (!noteLike) return { success: false };

   noteLike = await xprisma.noteLike.delete({
      where: { id: noteLike.id },
   });

   revalidatePath(`/explore`);
   return { success: true, noteLike };
});

const commentSchema = z.object({
   noteId: z.string(),
   raw_text: z.string(),
});

/**
 * A server action for commenting on another user's note.
 */
export const commentOnNote = authorizedAction(commentSchema, async ({ noteId, raw_text }, { userId }) => {
   await sleep(1_000);
   const comment = await xprisma.noteComment.create({
      data: {
         noteId, userId, raw_text, metadata: {},
      },
   });

   revalidatePath(`/explore`);
   return { success: true, comment };
});

const userSchema = z.object({
   userId: z.string(),
});

/**
 * A server action for retrieving user's details.
 */
export const getUserDetails = authorizedAction(userSchema, async ({ userId }, { userId: sessionUserId }) => {
   await sleep(1_000);

   const user = await xprisma.user.findUnique({
      where: { id: userId },
      select: {
         id: true,
         name: true,
         email: true,
         metadata: true,
         image: true,
         createdAt: true,
         _count: {
            select: {
               notes: true,
            },
         }
      },
   })  ;
   if(!user) return  { success: false}

   return { success: true, user };
});

export type GetUserDetailsResponse = Awaited<ReturnType<typeof getUserDetails>>["data"]