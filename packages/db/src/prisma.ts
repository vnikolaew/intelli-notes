import { Prisma, PrismaClient, User } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";

export const __IS_DEV__ = process.env.NODE_ENV === `development`;

export const config = { runtime: "node.js" };

export const globalForPrisma = globalThis as unknown as {
   prisma: PrismaClient | undefined
};

export let prisma = globalForPrisma.prisma ?? new PrismaClient({
   log: [{ emit: `stdout`, level: `info` }],
   errorFormat: `pretty`,
   transactionOptions: { isolationLevel: `Serializable` },
});

export const nonArchivedFilter: Prisma.AiChatHistoryWhereInput = {
   metadata: {
      path: [`archived`],
      equals: Prisma.AnyNull,
   },
};

export let xprisma = prisma.$extends({
   result: {
      account: {
         deleteResetToken: {
            needs: { providerAccountId: true, provider: true, metadata: true, userId: true },
            compute(account) {
               return async () => {
                  if (!Object.hasOwn(account?.metadata as object ?? {}, "reset_token")) return account;

                  const { reset_token, ...rest } = account!.metadata as Record<string, any>;
                  return await xprisma.account.update({
                     where: {
                        userId: account.userId,
                        provider_providerAccountId: {
                           providerAccountId: account!.providerAccountId, provider: account!.provider,
                        },
                     },
                     data: { metadata: rest },
                  });
               };
            },
         },
      },
      user: {
         cookieConsent: {
            needs: { metadata: true },
            compute({ metadata }) {
               return (metadata as any)?.[`cookie-consent`] ?? false;
            },
         },
         cookiePreferences: {
            needs: { metadata: true },
            compute({ metadata }) {
               return (metadata as any)?.[`cookie-preferences`] ?? {};
            },
         },
         updatePassword: {
            needs: { id: true },
            compute(user) {
               return async (password: string) => {
                  return await xprisma.user.update({
                     where: { id: user.id },
                     data: {
                        password: bcrypt.hashSync(password, 10),
                     },
                  });
               };
            },
         },
         verifyPassword: {
            needs: { password: true },
            compute(user) {
               return (password: string) => {
                  return bcrypt.compareSync(password, user.password ?? ``);
               };
            },
         },
      },
   },
   model: {
      aiChatHistory: {
         async getNonArchivedUserChats(userId: string) {
            const userChatHistories = await xprisma.aiChatHistory.findMany({
               where: {
                  userId,
                  ...nonArchivedFilter,
               },
               include: {
                  messages: { orderBy: { createdAt: `asc` } },
               },
            });
            userChatHistories.forEach(chat =>  {
              chat.messages = chat.messages.sort((a, b) => a.createdAt - b.createdAt)
            })
            return userChatHistories;
         },
      },
      user: {
         async notes({ userId, skip = 0, take = 20 }: { userId: string, skip?: number, take?: number }) {
            const total = await xprisma.note.count({
               where: { authorId: userId },
            });
            const notes = await xprisma.note.findMany({
               where: { authorId: userId },
               orderBy: { createdAt: `desc` },
               include: { category: true },
               skip,
               take,
            });

            return { notes, total };

         },
         async signIn({ email, password, username }: {
            email: string;
            password: string,
            username: string
         }, select?: Prisma.UserSelect<InternalArgs>): Promise<Partial<User> | null> {
            const user = await xprisma.user.findFirst({
               where: {
                  OR: [
                     {
                        email: email as string,
                     },
                     {
                        name: username as string,
                     },
                  ],
               },
               select: {
                  id: true,
                  email: true,
                  name: true,
                  verifyPassword: true,
                  image: true,
                  ...(select ?? {}),
               },
            });

            if (user && user.verifyPassword?.(password as string ?? ``)) {
               return {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  image: user.image,
               };
            }

            return null!;
         },
         async signUp({ email, password, username, image }: {
            email: string;
            password: string,
            username: string,
            image?: string
         }, select?: Prisma.UserSelect<InternalArgs>) {

            let user = await xprisma.user.create({
               data: {
                  email,
                  password: bcrypt.hashSync(password, 10),
                  name: username,
                  image,
               },
               select: {
                  id: true,
                  email: true,
                  name: true,
                  ...(select ?? {}),
               },
            });
            await xprisma.account.create({
               data: {
                  userId: user.id,
                  provider: `credentials`,
                  providerAccountId: user.id,
                  type: `basic`,
               },
            });

            return user;
         },
      },
   },
});

export type XPrismaClient = typeof xprisma

// @ts-ignore
if (__IS_DEV__) globalForPrisma.prisma = xprisma;
