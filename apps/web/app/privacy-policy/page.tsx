import React from "react";
import { APP_HOST_NAME, APP_NAME } from "../../lib/consts";
import moment from "moment";
import Link from "next/link";

export interface PageProps {
}

const LAST_UPDATED = new Date(2024, 4, 21);

const Page = ({}: PageProps) => {
   return (
      <section className={`flex flex-col w-full mt-12 items-center`}>
         <div className={`flex flex-col items-start gap-2 w-2/5 text-wrap`}>
            <h2 className={`text-2xl`}>{APP_NAME} Privacy Policy</h2>
            <h3 className={`text-base text-muted-foreground`}>Last
               updated: {moment(LAST_UPDATED).format(`MMMM DD, YYYY`)}</h3>
            <Heading text={`1. Introduction`} />
            <p className={`mt-2`}>
               Welcome to {APP_NAME} ("we," "our," "us"). We are committed to protecting your privacy and
               ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy
               explains how we collect, use, disclose, and safeguard your information when you visit our website {` `}
               {APP_HOST_NAME}.com, use our services, or interact with us in any other way.
            </p>

            <Heading text={`2. Information we collect`} />
            <p className={`mt-2`}>
               We may collect the following types of information:
               <ul className={`list-disc`}>
                  <li className={`ml-4 mt-2`}>
                     Personal Information: Name, email address, phone number, billing information, and any other
                     information you provide to us.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     Usage Data: Information about how you use our website and services, such as your IP address,
                     browser type, access times, and pages visited.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     Cookies and Tracking Technologies: We use cookies and similar technologies to track your activity
                     on our website and store certain information. You can control the use of cookies at the individual
                     browser level.
                  </li>
               </ul>
            </p>
            <Heading text={`3. How we use your information`} />
            <p className={`mt-2`}>
               We use the information we collect for various purposes, including to:
               <ul className={`list-disc`}>
                  <li className={`ml-4 mt-2`}>
                     Provide, operate, and maintain our services.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     Improve, personalize, and expand our services.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     Understand and analyze how you use our services.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     Process transactions and send related information.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     Communicate with you, either directly or through one of our partners, including for customer
                     service, to provide you with updates and other information relating to the service, and for
                     marketing and promotional purposes.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     Find and prevent fraud.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     Comply with legal obligations.
                  </li>
               </ul>
            </p>
            <Heading text={`4. Sharing your information`} />
            <p className={`mt-2`}>
               We may share your information with:
               <ul className={`list-disc`}>
                  <li className={`ml-4 mt-2`}>
                     Service Providers: Third-party vendors and other service providers who perform services on our
                     behalf, such as payment processing, data analysis, email delivery, hosting services, customer
                     service, and marketing assistance.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     Business Transfers: If we are involved in a merger, acquisition, or sale of all or a portion of our
                     assets, your information may be transferred as part of that transaction.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     Legal Requirements: When required by law or to respond to legal process, we may disclose your
                     information to legal authorities or other third parties.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     With Your Consent: We may share your information with your consent or at your direction.
                  </li>
               </ul>
            </p>
            <Heading text={`5. Data Security`} />
            <p className={`mt-2`}>
               We implement reasonable security measures to protect the security of your information. However, no
               security system is impenetrable, and we cannot guarantee the security of our systems 100%. In the event
               of a data breach, we will notify you and relevant authorities as required by law.
            </p>
            <Heading text={`6. Your Data Protection Rights`} />
            <p className={`mt-2`}>
               Depending on your location, you may have the following rights regarding your personal information:
               <ul className={`list-disc`}>
                  <li className={`ml-4 mt-2`}>
                     The right to access – You have the right to request copies of your personal data.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     The right to rectification – You have the right to request that we correct any information you
                     believe is inaccurate or complete information you believe is incomplete.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     The right to erasure – You have the right to request that we erase your personal data, under
                     certain conditions.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     The right to restrict processing – You have the right to request that we restrict the processing of
                     your personal data, under certain conditions.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     The right to object to processing – You have the right to object to our processing of your personal
                     data, under certain conditions.
                  </li>
                  <li className={`ml-4 mt-2`}>
                     The right to data portability – You have the right to request that we transfer the data that we
                     have collected to another organization, or directly to you, under certain conditions.
                  </li>
               </ul>
            </p>
            <Heading text={`7. International Data Transfers`} />
            <p className={`mt-2`}>
               Your information may be transferred to, and maintained on, computers located outside of your state,
               province, country, or other governmental jurisdiction where the data protection laws may differ from
               those of your jurisdiction. By providing us with your information, you consent to the transfer of your
               information to our facilities and those third parties with whom we share it as described in this Privacy
               Policy.
            </p>
            <Heading text={`8. Retention of Your Information`} />
            <p className={`mt-2`}>
               We will retain your personal information only for as long as is necessary for the purposes set out in
               this Privacy Policy. We will retain and use your personal information to the extent necessary to comply
               with our legal obligations, resolve disputes, and enforce our policies.
            </p>
            <Heading text={`9. Changes to This Privacy Policy`} />
            <p className={`mt-2`}>
               We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
               Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this
               Privacy Policy periodically for any changes.
            </p>
            <Heading text={`10. Contact us`} />
            <p className={`mt-2`}>
               If you have any questions about this Privacy Policy, please contact us:
               <ul className={`list-disc`}>
                  <li className={`ml-4 mt-2`}>
                     By email: <Link className={`!text-blue-500`} href={`mailto:support@next-saas-template.com`}>
                     support@next-saas-template.com
                  </Link>
                  </li>
                  <li className={`ml-4 mt-2`}>
                     By visiting this page on our website: {` `}
                     <Link className={`!text-blue-500`} href={`/contact`}>
                        Contact page
                     </Link>
                  </li>
               </ul></p>
         </div>
         <div className={`mt-8 flex items-center justify-end w-2/5`}>
            <Link href={`/`}>Go Home -></Link>
         </div>
      </section>
   );
};

const Heading = ({ text }: { text: string }) => {
   return (
      <h2 className={`mt-4 text-lg font-semibold`}>{text}</h2>
   );
};

export default Page;