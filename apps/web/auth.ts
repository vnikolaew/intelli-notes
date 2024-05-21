import NextAuth from "next-auth";
import Google, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { globalForPrisma, xprisma } from "@repo/db";
import { PrismaClient, User } from "@prisma/client";
import ResendProvider from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { session } from "./lib/session";
import { getGravatarImageUrl } from "./lib/utils";
import { Adapter, AdapterUser } from "@auth/core/adapters";
import { Awaitable } from "@auth/core/types";
import { EmailService, WelcomeEmail } from "@repo/emails";
import { APP_NAME } from "./lib/consts";

globalForPrisma.prisma ??= new PrismaClient();

const RESEND_ONBOARDING_EMAIL = ``;

const customAdapter = {
   ...PrismaAdapter(xprisma),
   // @ts-ignore
   createUser({ id, iss, ...user }: AdapterUser): Awaitable<AdapterUser> {
      console.log({ user });
      const { email, name, picture, emailVerified } = user as unknown as GoogleProfile;
      return xprisma.user.create({ data: { email, name, image: picture, emailVerified } });
   },
} satisfies Adapter;

export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: customAdapter,
   events: {
      // @ts-ignore
      createUser: async (user: { user: User }) => {
         // Send a welcome e-mail:
         try {
            const res = new EmailService().sendMail({
               to: user.user.email,
               subject: `Welcome to ${APP_NAME}`,
               element: WelcomeEmail({
                  username: user.user.name!,
                  appName: APP_NAME,
                  introduction: `Welcome to <b>{appName}</b>! We&apos;re thrilled to have you on board and excited to see the
                  memories you&apos;ll create and share with our community.`,
                  description: `At <b>${APP_NAME}</b>, we believe in the power of images to connect people, spark conversations,
                  and inspire creativity. Whether you&apos;re a seasoned photographer or someone who simply loves
                  capturing moments on the go, our platform provides the perfect space for you to showcase your work and
                  discover inspiring content from others.`,
               }),
            });
            // console.log(`Welcome e-mail successfully sent to: ${user.user.email} with ID: ${data?.id}`);
         } catch (err) {
            console.error(`An error occurred while sending a Welcome e-mail to: ${user.user.email}: ${err}`);
         }
      },
   },
   debug: false,
   callbacks: {
      session,
      async authorized({ request, auth }) {
         return true;
      },
      async signIn({ user, profile, account, email }) {
         console.log({ user });
         return true;
      },
      async jwt({ token, user, session, profile, account }) {
         if (user?.id) token.id = user.id;

         return token;
      },
   },
   session: { strategy: `jwt` },
   secret: process.env.AUTH_SECRET ?? `sdfsdfdsfwerwe`,
   providers: [Google({}), ResendProvider({
      from: RESEND_ONBOARDING_EMAIL,
      generateVerificationToken() {
         return crypto.randomUUID();
      },
      async sendVerificationRequest({ request, url, identifier, provider, token }) {
         try {
            const res = await new EmailService().sendMail({
               to: identifier,
               subject: "Login Link to your Account",
               element: "<p>Click the magic link below to sign in to your account:</p>\
                 <p><a href=\"" + url + "\"><b>Sign in</b></a></p>",
            });
         } catch (error) {
            console.log({ error });
         }
      },
   }),
      Credentials({
            credentials: {
               email: {
                  type: "email",
               },
               username: {
                  type: "text",
               },
               password: {
                  type: "password",
               },
               type: {
                  type: "text",
               },
            },
            authorize: async ({ username, email, password, type }) => {
               if (type === `signup`) {
                  // Handle user sign up:
                  const existing = await xprisma.user.findFirst({
                        where: {
                           email: email as string,
                        },
                     })
                  ;
                  if (existing) return null!;

                  // Retrieve Gravatar image:
                  let imageUrl = await getGravatarImageUrl(email as string);
                  const user = await xprisma.user.signUp({
                     email: email as string,
                     password: password as string,
                     username: username as string,
                     image: imageUrl,
                  }, { image: true });

                  return {
                     id: user.id,
                     email: user.email,
                     name: user.name,
                     image: user.image,
                  };
               }

               const user = await xprisma.user.signIn({
                  email: email as string,
                  password: password as string,
                  username: username as string,
               });

               return user!;
            },
         },
      )],
});