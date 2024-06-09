"use server";

import { authorizedAction } from "lib/actions";
import { z } from "zod";
import { xprisma } from "@repo/db";
import { sleep } from "lib/utils";
import { revalidatePath } from "next/cache";
import { GoogleDriveStorage } from "@repo/storage";
import { auth } from "auth";

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

   revalidatePath(`/notes`);
   return { success: true, note };
});

const importSchema = z.object({
   notes_raw: z.string(),
   importFormat: z.union([z.literal(`CSV`), z.literal(`JSON`), z.literal(`Markdown`), z.literal(`HTML`), z.literal(`XML`)]),
});

const CSVToJSON = (data: string, delimiter = ",") => {
   const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
   return data
      .slice(data.indexOf("\n") + 1)
      .split("\n")
      .map(v => {
         const values = v.split(delimiter);
         return titles.reduce(
            (obj, title, index) => ((obj[title] = values[index]), obj),
            {},
         );
      });
};

const noteSchema = z.array(z.object({
   id: z.string(),
   title: z.string().nullable(),
   metadata: z.any(),
   raw_text: z.string(),
   tags: z.array(z.string()),
   authorId: z.string(),
   createdAt: z.string(),
   updatedAt: z.string().nullable(),
}));

/**
 * An authorized server action for importing user notes.
 */
export const importNotes = authorizedAction(importSchema!, async ({ notes_raw, importFormat: format }, { userId }) => {
   await sleep(1_000);

   if (format === `CSV`) {
      const notes = CSVToJSON(notes_raw);

      return { notes, ok: true };
   }

   if (format === `JSON`) {
      const notes = noteSchema.safeParse(JSON.parse(notes_raw));
      if (!notes.success) return { ok: false };

      const newNotes = await xprisma.note.createMany({
         //@ts-ignore
         data: notes.data.map(({ id, ...note }) => ({
            ...note,
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt),
            raw_text: note.raw_text ?? ``,
         })),
      });

      revalidatePath(`/notes`);
      return { notes: newNotes, ok: true };
   }

   if (format === `XML`) {
      return { ok: true };
   }
});


const createSchema = z.object({
   title: z.string().min(3).max(100),
});

/**
 * An authorized server action for creating a new notes' category.
 */
export const createCategory = authorizedAction(createSchema!, async ({ title }, { userId }) => {
   await sleep(1_000);

   const existing = await xprisma.noteCategory.findFirst({
      where: { title },
   });
   if (existing) return { success: false, error: `A category with this name already exists!` };


   const category = await xprisma.noteCategory.create({
      data: {
         userId,
         title,
         metadata: {},
      },
   });

   revalidatePath(`/notes`);
   return { success: true, category };
});


/**
 * An authorized server action for creating a new Google Drive folder
 */
export const createFolder = authorizedAction(createSchema!, async ({ title }, { userId }) => {
   await sleep(1_000);
   const session = await auth();

   const file = await new GoogleDriveStorage(session?.accessToken, session?.refreshToken)
      .createFolderIfNotExists(title);

   console.log({ file });
   return { file, success: true }
});

const commentSchema = z.object({
   noteId: z.string(),
   raw_text: z.string().min(1).max(500),
});

/**
 * An authorized server action for commenting on a note.
 */
export const commentOnNote = authorizedAction(commentSchema!, async ({ noteId, raw_text   }, { userId }) => {
   await sleep(1_000);

   const comment  =await xprisma.noteComment.create({
      data: {
         userId,
         noteId,
         raw_text,
      }
   })

   return { success: true, comment }
});
