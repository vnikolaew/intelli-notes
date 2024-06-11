import React, { Fragment } from "react";
import moment from "moment";
import { APP_HOST_NAME, APP_NAME, COMPANY_DETAILS, LINKS } from "config/site";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface PageProps {
}

const LAST_UPDATED = new Date(2024, 4, 21);

/**
 * The site's Cookie Policy page.
 * @constructor
 */
const Page = async ({}: PageProps) => {
   return (
      <section className={`flex flex-col w-full mt-12 items-center`}>
         <div className={`flex flex-col items-start gap-2 w-2/5 text-wrap`}>
            <h2 className={`text-2xl`}>{APP_NAME} Cookie Policy </h2>
            <h3 className={`text-base text-muted-foreground`}>Last
               updated: {moment(LAST_UPDATED).format(`MMMM DD, YYYY`)}</h3>
            <Heading text={`1. Introduction`} />
            <p className={`mt-2`}>
               Welcome to {APP_NAME} ("we," "us," "our"). This Cookie Policy explains how we use
               cookies and similar technologies to recognize you when you visit our website at {APP_HOST_NAME}
               ("Website"). It explains what these technologies are and why we use them, as well as your rights to
               control our use of them.
            </p>
            <Heading text={`2. What are cookies?`} />
            <p className={`mt-2`}>
               Cookies are small data files that are placed on your computer or mobile device when you visit a website.
               Cookies are widely used by website owners to make their websites work, or to work more efficiently, as
               well as to provide reporting information.
            </p>
            <Heading text={`3. Why do we use cookies?`} />
            <p className={`mt-2`}>
               We use cookies for several reasons. Some cookies are required for technical reasons for our Website to
               operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable
               us to track and target the interests of our users to enhance the experience on our Website. Third parties
               serve cookies through our Website for advertising, analytics, and other purposes.
            </p>

            <Heading text={`4. Types of cookies we use`} />
            <h3 className={`font-semibold mt-2`}>1. Essential Cookies:</h3>
            <p className={`mt-2`}>
               These cookies are strictly necessary to provide you with services available through our Website and to
               use some of its features, such as access to secure areas.
            </p>
            <h3 className={`font-semibold mt-2`}>2. User Content</h3>
            <p className={`mt-2`}>
               You retain ownership of any content you submit, post, or otherwise make available through the Services
               ("User Content"). By providing User Content, you grant us a non-exclusive, worldwide, royalty-free,
               sublicensable, and transferable license to use, reproduce, modify, distribute, and display your User
               Content in connection with the operation of the Services.
            </p>

            <Heading text={`5. How can I control cookies? `} />
            <p className={`mt-2`}>
               You have the right to decide whether to accept or reject cookies. You can exercise your cookie
               preferences by clicking on the appropriate opt-out links provided below.
            </p>
            <p className={`mt-2`}>
               You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject
               cookies, you may still use our Website, though your access to some functionality and areas of our Website
               may be restricted. As the means by which you can refuse cookies through your web browser controls vary
               from browser to browser, you should visit your browser's help menu for more information.
            </p>
            <Heading text={`6. What about other tracking technologies?`} />
            <p className={`mt-2`}>
               Cookies are not the only way to recognize or track visitors to a website. We may use other, similar
               technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs").
               These are tiny graphics files that contain a unique identifier that enable us to recognize when someone
               has visited our Website or opened an email including them. This allows us, for example, to monitor the
               traffic patterns of users from one page within a website to another, to deliver or communicate with
               cookies, to understand whether you have come to the Website from an online advertisement displayed on a
               third-party website, to improve site performance, and to measure the success of email marketing
               campaigns. In many instances, these technologies are reliant on cookies to function properly, and so
               declining cookies will impair their functioning.
            </p>

            <Heading text={`7. How often will you update this Cookie Policy?`} />
            <p className={`mt-2`}>
               We may update this Cookie Policy from time to time in order to reflect, for example, changes to the
               cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this
               Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            <Heading text={`8. Where can I get further information?`} />
            <p className={`mt-2`}>
               If you have any questions about our use of cookies or other technologies, please email us
               at <Link className={`!text-blue-500`} href={`mailto:${LINKS.supportEmail}`}>
               {LINKS.supportEmail}
            </Link> or by post to:
            </p>
            <CompanyDetails />
         </div>
         <div className={`mt-8 flex items-center justify-end w-2/5`}>
            <Link className={`inline-flex gap-1 items-center`} href={`/`}>Go Home <ArrowRight size={14} /></Link>
         </div>
      </section>
   );
};

/**
 * Company details for the cookie policy page.
 */
const CompanyDetails = () => (
            <Fragment><b className={`mt-4`}>{APP_NAME}</b><p>{COMPANY_DETAILS.streetAddress}</p><p>{COMPANY_DETAILS.city}, {COMPANY_DETAILS.zipCode}</p><p>{COMPANY_DETAILS.country}</p></Fragment>
)

const Heading = ({ text }: { text: string }) => {
   return (
      <h2 className={`mt-4 text-lg font-semibold`}>{text}</h2>
   );
};

export default Page;