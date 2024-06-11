import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Github, Mail } from "lucide-react";

export interface LinkInfo {
   title: string;
   href: string;
}

export interface FooterTwoProps {
   appLogo: StaticImageData;
   links? : {
      title: string;
      links: LinkInfo[]
   },
   legal? : {
      title: string;
      links: LinkInfo[]
   },
   appName: string;
   appDescription: string;
   socialLinks: {
      title: string;
      email: string;
      twitter: string;
      linkedIn: string;
   };
}

type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
   logo: (props: IconProps) => (<div></div>),
   twitter: (props: IconProps) => (
      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 1668.56 1221.19" viewBox="0 0 1668.56 1221.19"
           id="twitter-x" {...props}>
         <path d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
		h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
               transform="translate(52.39 -25.059)"></path>
      </svg>
   ),
   github: (props: IconProps) => (
      <Github {...props} />
   ),
   linkedIn: (props: IconProps) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="linkedin" {...props}>
         <path
            d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z"></path>
      </svg>
   ),
};

export const FooterTwo = ({
                             appLogo,
                             appDescription,
   legal, links,
                             appName,
                             socialLinks: { linkedIn, email, twitter, title },
                          }: FooterTwoProps) => {
   return (
      <footer className={`py-2 border-t border-border border-prose mt-24 bg-neutral-100/50 dark:bg-transparent `}>
         <div className="my-8 grid grid-cols-4 mx-24 gap-8">
            <div
               className="!mb-24 flex flex-col space-y-1 text-base text-muted-foreground items-start text-left h-full justify-center">
               <span className={`inline-flex items-center gap-2`}>
                  <Image className={`rounded-full shadow-sm w-7 h-7`} src={appLogo} alt={appName} />
                  <span className={`text-lg font-semibold dark:!text-neutral-200 text-neutral-800`}>
                     {appName}
                  </span>
               </span>
               <span className={`!mt-2 text-sm font-normal`}>
                  {appDescription}
               </span>
               <span className={`!mt-4 text-sm`}>
                  Copyright © {new Date().getFullYear()} - All rights reserved.
               </span>
            </div>
            <div>
               <h2 className={`uppercase text-muted-foreground text-base`}>{links.title}</h2>
               <div className="mt-4 flex space-y-2 flex-col">
                  {links?.links?.map(({title, href}, index) => (
                     <Link className={`hover:underline text-sm w-fit`} href={href}>{title}</Link>
                  ))}
               </div>
            </div>
            <div>
               <h2 className={`uppercase text-muted-foreground text-base`}>{legal.title}</h2>
               <div className="mt-4 flex space-y-2 flex-col">
                  {legal?.links?.map(({title, href}, index) => (
                     <Link className={`hover:underline text-sm w-fit`} href={href}>{title}</Link>
                  ))}
               </div>
            </div>
            <div>
               <h2 className={`uppercase text-muted-foreground text-base`}>{title}</h2>
               <div className="mb-8 flex space-x-8 mt-4">
                  <Link title={`E-mail`} target="_blank" rel="noreferrer" href={`mailto:${email}`}>
                     <span className="sr-only">Mail</span>
                     <Mail className="h-6 w-6 fill:neutral-500 " />
                  </Link>
                  <Link title={`Twitter`} target="_blank" rel="noreferrer" href={twitter}>
                     <span className="sr-only">Twitter</span>
                     <Icons.twitter className="h-6 w-6 dark:text-white dark:fill-white" />
                  </Link>
                  <Link title={`LinkedIn`} target="_blank" rel="noreferrer" href={linkedIn}>
                     <span className="sr-only">GitHub</span>
                     <Icons.linkedIn className="h-6 w-6 fill-[#0a66c2]" />
                  </Link>
               </div>
            </div>
         </div>
      </footer>
   );
};
