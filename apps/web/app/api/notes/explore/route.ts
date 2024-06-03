import { NextRequest, NextResponse } from "next/server";
import { Note, NoteComment, NoteLike, xprisma } from "@repo/db";

export type GetExplorePageNotesResponse = {
   success: false
} | {
   success: true,
   notes: (Note & { author: { name: string; image: string }, comments: NoteComment[], likes: NoteLike[] })[];
}

export async function GET(req: NextRequest) {
   const sp = req.nextUrl.searchParams;

   const beforeTimestamp = Number(sp.get(`timestamp`));
   const limit = isNaN(Number(sp.get(`limit`) ?? 20)) ? 20 : Number(sp.get(`limit`) ?? 20);

   if (isNaN(beforeTimestamp) || isNaN(limit)) {
      return NextResponse.json({ success: false }, { status: 404 });
   }

   const notes = await xprisma.note.findMany({
      where: {
         createdAt: {
            lt: new Date(beforeTimestamp),
         }
      },
      orderBy: { createdAt: `desc` },
      include: {
         author: true, likes: { select: { id: true, noteId: true, userId: true } }, comments: {
            include: { user: true },
         },
      },
      take: limit,
   })

   return NextResponse.json({ success: true, notes });
}