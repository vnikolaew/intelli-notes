"use server"

import { xprisma } from "@repo/db";

export async function  getUserDetails(userId: string) {
   const user = await xprisma.user.findUnique({
      where: { id: userId },
      include: {
         notes: {
            where: { public: true }, orderBy: { createdAt: "desc" },
            skip: 0,
            take: 20,
            include: {
               likes: {
                  select: { id: true, noteId: true, userId: true },
               },
               comments: {
                  include: {
                     user: {
                        select: { id: true, name: true, image: true}
                     }
                  }
               },
               _count: { select: { comments: true } },
            },
         },
      },
   });
   return user;
}