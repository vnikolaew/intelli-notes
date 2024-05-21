import { Session } from "@auth/core/types";
import { AdapterSession, AdapterUser } from "@auth/core/adapters";
import { JWT } from "@auth/core/jwt";

export const session = async ({ session, token, user, ...rest }: ({
      session: { user: AdapterUser } & AdapterSession
      user: AdapterUser
   } & {
      session: Session
      token: JWT
   }) & {
      newSession: any
      trigger?: "update"
   }) => {
      if (session && session.user) {
         //@ts-ignore
         (session.user as any).id = token.id;
      }
      return session;
   }
;