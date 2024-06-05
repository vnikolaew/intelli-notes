"use server";

import { z } from "zod";
import { authorizedAction } from "lib/actions";
import { auth } from "auth";
import { WebClient } from "@slack/web-api";


const schema = z.object({
   anonymous: z.boolean(),
   message: z.string(),
   rating: z.number().min(1).max(5),
});

/**
 * Submit user feedback to Slack.
 */
export const submitUserFeedback = authorizedAction(schema, async ({ anonymous, rating, message }, { userId }) => {
   const session = await auth();
   try {
      const client = new WebClient(process.env.SLACK_TOKEN);
      const result = await client.chat.postMessage({
         text: `User ${session?.user?.name} submitted a feedback with a rating of ${rating} ...`,
         channel: process.env.SLACK_FEEDBACK_CHANNEL_ID!,
         blocks: [
            {
               "type": "rich_text",
               "elements": [
                  {
                     "type": "rich_text_section",
                     "elements": [
                        {
                           "type": "text",
                           "text": "User "
                        },
                        {
                           "type": "text",
                           "text": session?.user?.name,
                           "style": {
                              "bold": true
                           }
                        },
                        {
                           "type": "text",
                           "text": " submitted the following feedback with a rating of "
                        },
                        {
                           "type": "text",
                           "text": rating.toString() + ` `,
                           "style": {
                              "bold": true
                           }
                        },
                        ...Array.from({ length: rating}).map((_) => (
                           {
                              "type": "emoji",
                              "name": "star",
                              "unicode": "2b50",
                              "style": {
                                 "bold": true
                              }
                           } as const
                        )),
                        {
                           "type": "text",
                           "text": ":"
                        }
                     ]
                  }
               ]
            },
            {
               "type": "divider"
            },
            {
               "type": "rich_text",
               "elements": [
                  {
                     "type": "rich_text_section",
                     "elements": [
                        {
                           "type": "text",
                           "text": message
                        }
                     ]
                  }
               ]
            }
         ]
      });
      return { success: true };
   } catch (err) {
      return { success: false, error: err };
   }
});