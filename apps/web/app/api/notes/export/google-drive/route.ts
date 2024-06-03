"use server";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GoogleDriveStorage } from "@repo/storage";
import { auth } from "auth";

const exportSchema = z.object({
   notes: z.array(z.object({
      id: z.string(),
      title: z.string().nullable(),
      metadata: z.any(),
      raw_text: z.string(),
      tags: z.array(z.string()),
      authorId: z.string(),
      createdAt: z.string(),
      updatedAt: z.string().nullable(),
   })),
});

const UPLOAD_FOLDER_NAME = `IntelliNotes - Uploads`

/**
 * Handles the POST request for exporting notes to Google Drive.
 *
 * @param {NextRequest} req - The Next.js request object.
 * @return {Promise<NextResponse>} A promise that resolves to a Next.js response object.
 */
export async function POST(req: NextRequest) {
   const body = exportSchema.safeParse(await req.json());
   if (!body.success) return NextResponse.json({ errors: body.error.errors.map(e => e.message) }, { status: 500 });

   const { notes } = body.data;
   const session = await auth();

   const googleDriveApi = new GoogleDriveStorage(session?.accessToken, session?.refreshToken);
   const newFolder = await googleDriveApi.createFolderIfNotExists(UPLOAD_FOLDER_NAME)
   const folderId = newFolder.data.id
   console.log({ folderId });

   const newFiles =  await Promise.all(
      notes.map(async (note) => {
         const buffer = Buffer.from(note.raw_text, "utf-8");

         const file = new File([buffer], `note-${note.title}-${note.id}.md`, { type: `text/markdown` });
         const response = await googleDriveApi.uploadFile(file, folderId);
         return response
      })
   )

   return NextResponse.json({ ok: true, files: newFiles }, { status: 200 });
}

export async function GET(req: NextRequest) {
   const session = await auth();

   const files = await new GoogleDriveStorage(session?.accessToken, session?.refreshToken)
      .listFiles();

   console.log({ files });
   return NextResponse.json({ files: files.data.files }, { status: 200 });
}
