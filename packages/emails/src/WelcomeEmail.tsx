import React, { ReactNode } from "react";
import { Html, Section, Tailwind, Text, Link, Hr } from "@react-email/components";

export interface WelcomeEmailProps {
   username: string;
   appName: string;
   introduction: ReactNode;
   description: ReactNode;
}

const WelcomeEmail = ({ username, appName, introduction, description }: WelcomeEmailProps) => {
   const introSection = typeof introduction === `string` ? (
      <Text dangerouslySetInnerHTML={{ __html: introduction }} className={`text-base`}>
      </Text>
   ) : (
      <Text className={`text-base`}>
         {introduction}
      </Text>
   );

   const descriptionSection = typeof introduction === `string` ? (
      <Text dangerouslySetInnerHTML={{ __html: description }} className={`text-base`}>
      </Text>
   ) : (
      <Text className={`text-base`}>
         {description}
      </Text>
   );

   return (
      <Html lang="en">
         <Tailwind
            config={{
               theme: {
                  extend: {
                     colors: {
                        brand: "#007291",
                     },
                  },
               },
            }}
         >
            <Section>
               <Text className={`text-base`}>Dear {username ?? `John`},
               </Text>
               {introSection}
               {descriptionSection}

               <Text className={`text-base`}>
                  Here are a few things you can do to get started:
               </Text>

               <Text className={`text-base`}>
                  <ol>
                     <li>
                        Upload your favorite photos and create albums to organize them.
                     </li>
                     <li>
                        Explore the diverse range of photos shared by other users and connect with fellow
                        enthusiasts.
                     </li>
                     <li>
                        Engage with the community by liking, commenting, and sharing photos that resonate with you.
                     </li>
                     <li>
                        Customize your profile to reflect your unique style and interests.
                     </li>
                  </ol>
               </Text>
               <Text className={`text-base`}>
                  We&apos;re constantly working to improve {appName} and enhance your experience, so
                  don&apos;t hesitate to share any feedback or suggestions you may have.
               </Text>
               <Text className={`text-base`}>
                  Once again, welcome to <b>{appName}</b>! We can&apos;t wait to see the world through your
                  lens.
               </Text>
               <Text className={`text-base`}>
                  Best regards,
               </Text>
               <Text className={`text-base`}>
                  Victorio Nikolaev <br />
                  CEO @ {appName} Team <br />
               </Text>
               <Text className={`text-base`}>
                  Explore <Link className={`mx-.5`} href={process.env.BASE_URL ?? `/`}>{appName}</Link> now!
               </Text>

               <Hr />
               <Text className={`text-sm`}>
                  © Copyright {new Date().getFullYear()} {appName}, Inc. All Rights Reserved.
               </Text>
            </Section>
         </Tailwind>
      </Html>
   );
};

export default WelcomeEmail;