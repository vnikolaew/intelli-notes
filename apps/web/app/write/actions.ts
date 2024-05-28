"use server";

import { authorizedAction } from "lib/actions";
import { z } from "zod";
import { Note, xprisma } from "@repo/db";
import { sleep } from "../../lib/utils";

const actionSchema = z.object({
   note_id: z.optional(z.string()).nullable(),
   title: z.optional(z.string()).nullable(),
   raw_text: z.string(),
   metadata: z.any(),
   tags: z.array(z.string()).nullable(),
});

export type CreateOrUpdateResponse = { success: false } | { success: true, note: Note }
/**
 * A server action for upserting a single note.
 */
export const createOrUpdateNote = authorizedAction(
   actionSchema,
   async ({
             raw_text,
             title,
             tags,
             metadata,
             note_id,
          }, { userId }): Promise<CreateOrUpdateResponse> => {
      await sleep(2_000);

      // We have a created note already:
      if (!!note_id?.length) {
         const newNote = await xprisma.note.update({
            where: { id: note_id, authorId: userId },
            data: {
               metadata,
               raw_text,
               ...(title && { title }),
            },
         });
         return newNote ? { success: true, note: newNote } : { success: false };
      }

      const note = await xprisma.note.create({
         data: {
            authorId: userId,
            metadata,
            raw_text,
            title,
            tags: tags ?? [],
         },
      });

      return note ? { success: true, note } : { success: false };
   });