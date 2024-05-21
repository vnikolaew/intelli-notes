import { Resend } from "resend";
import WelcomeEmail from "./WelcomeEmail";

interface SendMailRequest {
   to: string,
   subject: string,
   element: JSX.Element | string;
}

type  SendMailResponse = {
   success: true, id: string
} | { success: false, error: any }

export class EmailService {
   private resend: Resend;
   static RESEND_ONBOARDING_EMAIL = `onboarding@resend.dev`;

   constructor() {
      this.resend = new Resend(process.env.AUTH_RESEND_KEY!);
   }

   public async sendMail({ to, subject, element }: SendMailRequest): Promise<SendMailResponse> {
      try {
         const { error, data } = await this.resend.emails.send({
            from: EmailService.RESEND_ONBOARDING_EMAIL,
            to,
            subject,
            ...(typeof element === `string` ? { html: element } : { react: element }),
         }, );

         console.log(`Welcome e-mail successfully sent to: ${to} with ID: ${data?.id}`);
         return { success: true, id: data!.id! };
      } catch (err) {
         console.error(`An error occurred while sending a Welcome e-mail to: ${to}: ${err}`);
         return { success: false, error: err };
      }
   }
}

export { WelcomeEmail } ;