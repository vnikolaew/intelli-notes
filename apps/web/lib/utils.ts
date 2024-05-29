import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
import { HTTP } from "./consts";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function calculateSHA256(data: string) {
   const hash = crypto.createHash("sha256");
   hash.update(data);
   return hash.digest("hex");
}

export async function getGravatarImageUrl(email: string) {
   let imageUrl: string = null!;

   const emailHash = calculateSHA256((email as string).trim().toLowerCase());
   const url = `https://bg.gravatar.com/${emailHash}.json`;
   const res = await fetch(url, {
      method: "GET",
      headers: {
         "Accept": HTTP.MEDIA_TYPES.APPLICATION_JSON,
      },
   });
   if (res.ok) {
      const body = await res.json();
      if (body[`entry`][`thumbnailUrl`]) imageUrl = body[`thumbnailUrl`];
      else if (!!body[`entry`][`photos`]?.length) {
         imageUrl = body[`entry`][`photos`][0].value;
      }

      if (imageUrl) {
         imageUrl = `${imageUrl}?s=640`;
      }
   }

   return imageUrl;
}

/**
 * A helper function for adding an artificial delay.
 * @param duration
 */
export async function sleep(duration: number) {
   return await new Promise(res => setTimeout(res, duration));
}

/**
 * Determines if the input URL is an absolute URL.
 * @param url
 */
export function isAbsoluteUrl(url: string) {

   // Regular expression for absolute URL
   const absoluteUrlPattern = /^(?:https?:\/\/)?(?:\w+\.)+\w{2,}(?:\/.*)?$/;

   // Test the string against the pattern
   return absoluteUrlPattern.test(url);
}

export function isValidUuid(id: string) {
   return /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(id);
}

export function downloadFile(data:BlobPart, fileName: string , contentType: string) {
   const blob = new Blob([data], { type: contentType });
   const url = window.URL.createObjectURL(blob);
   const a = document.createElement('a');

   a.style.display = 'none';
   a.href = url;
   a.download = fileName;
   document.body.appendChild(a);

   a.click()

   window.URL.revokeObjectURL(url);
   document.body.removeChild(a);
}