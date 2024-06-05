import React from "react";
import { APP_HOST_NAME, APP_NAME, LINKS } from "config/site";
import moment from "moment/moment";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface PageProps {
}

const LAST_UPDATED = new Date(2024, 4, 21);

/**
 * The site's Terms of Service page.
 * @constructor
 */
const Page = async ({}: PageProps) => {
   return (
      <section className={`flex flex-col w-full mt-12 items-center`}>
         <div className={`flex flex-col items-start gap-2 w-2/5 text-wrap`}>
            <h2 className={`text-2xl`}>{APP_NAME} Terms of Service </h2>
            <h3 className={`text-base text-muted-foreground`}>Last
               updated: {moment(LAST_UPDATED).format(`MMMM DD, YYYY`)}</h3>
            <Heading text={`1. Introduction`} />
            <p className={`mt-2`}>
               Welcome to {APP_NAME} ("we," "our," "us"). These Terms of Service ("Terms") govern your use of
               our website {APP_HOST_NAME}.com, services, and products (collectively, the "Services"). By accessing or
               using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do
               not use our Services.
            </p>
            <Heading text={`2. Use of Services`} />
            <h3 className={`font-semibold mt-2`}>2.1 Account Registration</h3>
            <p className={`mt-2`}>
               To access certain features of our Services, you may need to register for an account. You agree to provide
               accurate, current, and complete information during the registration process and to update such
               information to keep it accurate, current, and complete. You are responsible for safeguarding your account
               credentials and for all activities that occur under your account.
            </p>

            <h3 className={`font-semibold mt-2`}>2.2 Prohibited activities</h3>
            <p className={`mt-2`}>
               You agree not to:
            </p>
            <ul className={`list-disc`}>
               <li className={`ml-4 mt-2`}>
                  Use the Services for any illegal or unauthorized purpose.
               </li>
               <li className={`ml-4 mt-2`}>
                  Engage in any activity that could harm, disrupt, or otherwise negatively impact the Services or our
                  users.
               </li>
               <li className={`ml-4 mt-2`}>
                  Attempt to gain unauthorized access to any portion of the Services or any other systems or networks
                  connected to the Services.
               </li>
               <li className={`ml-4 mt-2`}>
                  Use any automated means to access the Services, including robots, spiders, or scrapers.
               </li>
               <li className={`ml-4 mt-2`}>
                  Transmit any viruses, malware, or other malicious code through the Services.
               </li>
            </ul>
            <Heading text={`3. Subscription and Payment`} />
            <h3 className={`font-semibold mt-2`}>3.1 Subscription Terms</h3>
            <p className={`mt-2`}>
               Some of our Services may be available on a subscription basis. By subscribing to our Services, you agree
               to pay the applicable fees and charges in accordance with the subscription terms and pricing listed on
               our website.
            </p>
            <h3 className={`font-semibold mt-2`}>3.2 Payment</h3>
            <p className={`mt-2`}>
               You authorize us to charge your chosen payment method for the subscription fees and any applicable taxes.
               All payments are non-refundable except as expressly stated in these Terms or as required by applicable
               law.
            </p>
            <h3 className={`font-semibold mt-2`}>3.3 Changes to Subscription Fees</h3>
            <p className={`mt-2`}>
               We reserve the right to change our subscription fees at any time. We will provide you with reasonable
               notice of any changes to the subscription fees. Your continued use of the Services after the fee changes
               take effect constitutes your agreement to pay the modified fees.
            </p>
            <Heading text={`4. Intellectual property`} />
            <h3 className={`font-semibold mt-2`}>4.1 Ownership</h3>
            <p className={`mt-2`}>
               We and our licensors retain all right, title, and interest in and to the Services, including all related
               intellectual property rights. These Terms do not grant you any rights to use our trademarks, logos, or
               other intellectual property.
            </p>
            <h3 className={`font-semibold mt-2`}>4.2 User Content</h3>
            <p className={`mt-2`}>
               You retain ownership of any content you submit, post, or otherwise make available through the Services
               ("User Content"). By providing User Content, you grant us a non-exclusive, worldwide, royalty-free,
               sublicensable, and transferable license to use, reproduce, modify, distribute, and display your User
               Content in connection with the operation of the Services.
            </p>
            <Heading text={`5. Privacy`} />
            <p className={`mt-2`}>
               Your use of the Services is also governed by our Privacy Policy, which is incorporated by reference into
               these Terms. Please review our Privacy Policy to understand how we collect, use, and protect your
               information.
            </p>
            <Heading text={`6. Disclaimers and Limitation of Liability`} />
            <h3 className={`font-semibold mt-2`}>6.1 Disclaimers</h3>
            <p className={`mt-2`}>
               The Services are provided "as is" and "as available" without warranties of any kind, either express or
               implied, including, but not limited to, implied warranties of merchantability, fitness for a particular
               purpose, and non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or
               free of viruses or other harmful components.
            </p>

            <h3 className={`font-semibold mt-2`}>6.2 Limitation of Liability</h3>
            <p className={`mt-2`}>
               To the fullest extent permitted by law, in no event will we be liable for any indirect, incidental,
               special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
               directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from
               (a) your use of or inability to use the Services; (b) any unauthorized access to or use of our servers
               and/or any personal information stored therein; (c) any interruption or cessation of transmission to or
               from the Services; (d) any bugs, viruses, trojan horses, or the like that may be transmitted to or
               through the Services by any third party; (e) any errors or omissions in any content or for any loss or
               damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made
               available through the Services; and/or (f) the defamatory, offensive, or illegal conduct of any third
               party.
            </p>
            <Heading text={`7. Indemnification`} />
            <p className={`mt-2`}>
               You agree to indemnify, defend, and hold harmless [Your Company Name] and its affiliates, officers,
               directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses,
               including, without limitation, reasonable legal and accounting fees, arising out of or in any way
               connected with your access to or use of the Services, or your violation of these Terms.
            </p>
            <Heading text={`8. Governing Law and Dispute Resolution`} />
            <h3 className={`font-semibold mt-2`}>8.1 Governing Law</h3>
            <p className={`mt-2`}>
               These Terms shall be governed by and construed in accordance with the laws of Bulgaria, without regard to
               its conflict of law principles.
            </p>
            <h3 className={`font-semibold mt-2`}>8.2 Dispute Resolution</h3>
            <p className={`mt-2`}>
               Any dispute arising out of or relating to these Terms or the Services shall be resolved through binding
               arbitration in accordance with the rules of the [American Arbitration Association/Other Organization].
               The arbitration shall be conducted in [Your City/State]. You agree to waive any right to a trial by jury
               or to participate in a class action.
            </p>
            <Heading text={`9. Changes to these Terms`} />
            <p className={`mt-2`}>
               We may update these Terms from time to time. We will notify you of any changes by posting the new Terms
               on our website and updating the "Effective Date" at the top. You are advised to review these Terms
               periodically for any changes.
            </p>
            <Heading text={`10. Contact us`} />
            <p className={`mt-2`}>
               If you have any questions about this Privacy Policy, please contact us:
               <ul className={`list-disc`}>
                  <li className={`ml-4 mt-2`}>
                     By email: <Link className={`!text-blue-500`} href={`mailto:${LINKS.supportEmail}`}>
                     {LINKS.supportEmail}
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
            <Link className={`inline-flex gap-1 items-center`} href={`/`}>Go Home <ArrowRight  size={14}/></Link>
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