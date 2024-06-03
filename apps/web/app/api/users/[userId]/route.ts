import { NextRequest, NextResponse } from "next/server";
import { xprisma } from "@repo/db";

type Params = {
   userId: string
}

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req: NextRequest, { params }: { params: Params }) {
   console.log({ params });

   const user = await xprisma.user.findUnique({
      where: { id: params.userId },
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
         },
      },
   });

   if (!user) return NextResponse.json({ success: false }, { status: 404 });
   return NextResponse.json({ success: true, user }, { status: 200 })

}