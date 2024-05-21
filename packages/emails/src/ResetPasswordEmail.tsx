import React from "react";
import { Html, Section, Tailwind, Text, Link, Row, Img } from "@react-email/components";

export interface ResetPasswordEmailProps {
   url: string;
   username: string;
   appName :  string
}

const ResetPasswordEmail = ({ url, username,appName }: ResetPasswordEmailProps) => {
   url ??= `https://www.example.com`
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
            <Section className={`w-4/5 flex flex-col items-start`}>
               <Row>
                  <Img height={100} width={300} alt={`logo`} src={``   } />
               </Row>
               <Text className={`!my-0 text-lg`}>
                  Hey, {(username ?? `John`).trim()}
               </Text>
               <Text className={`!mt-2 text-lg`}>
                  We received a request to change your password on {appName}.
               </Text>
               <Text className={`!mt-2 !mb-0 text-lg`}>
                  To reset your {appName} password, please click this link:
               </Text>
               <Text className={`!my-0 text-lg`}>
                  <Link className={`underline`} href={url}>
                     <b>{url}</b>
                  </Link>
               </Text>
               <Text className={`!mt-4 text-lg`}>
                  The link above will be valid for ten hours.
               </Text>
               <Section className={`text-base !mt-8`}>
                  <Text className={`!my-0 !mt-4 text-neutral-500`}>© {new Date().getFullYear()} {appName}</Text>
                  <Text className={`!my-0`}>
                     <Link className={`underline`} href={`/`}>Visit our help center</Link>
                  </Text>
               </Section>
            </Section>
         </Tailwind>
      </Html>
   );
};

export default ResetPasswordEmail;