"use server";

import { authorizedAction } from "lib/actions";
import { z } from "zod";
import { xprisma } from "@repo/db";
import { sleep } from "../../lib/utils";
import { revalidatePath } from "next/cache";

const deleteSchema = z.object({
   noteId: z.string(),
});

/**
 * An authorized server action for deleting a note by its ID.
 */
export const deleteNote = authorizedAction(deleteSchema!, async ({ noteId }, { userId }) => {
   await sleep(2_000);

   let note = await xprisma.note.findUnique({
      where: { authorId: userId, id: noteId },
   });
   if (!note) return { success: false, error: `Note not found!` };

   await xprisma.note.delete({ where: { id: note.id } });

   revalidatePath(`/notes`)
   return { success: true, note };
});