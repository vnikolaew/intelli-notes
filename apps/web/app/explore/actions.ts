"use server";

import { authorizedAction } from "lib/actions";
import { z } from "zod";
import { xprisma } from "@repo/db";
import { revalidatePath } from "next/cache";

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
