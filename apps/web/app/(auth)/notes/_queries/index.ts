"use server";

import { AiChatHistory, AiChatHistoryMessage, xprisma } from "@repo/db";
import { auth } from "auth";
import  {uniq} from "lodash"

const sortHistories = (a: AiChatHistory, b: AiChatHistory) => {
   return b.messages?.at(-1)?.createdAt - a.messages?.at(-1)?.createdAt;
};

/**
 * Get all user chat histories sorted by most recent first.
 */
export const getSortedUserChatHistories = async () => {
   const session = await auth();
   const userChatHistories = await xprisma.aiChatHistory.getNonArchivedUserChats(session?.user?.id);

   return userChatHistories.sort(sortHistories);
};

/**
 * Get the current chat history or create a new one.
 * @param chatHistories All user chat histories
 * @param userId The user ID
 * @param chatId The chat ID, if provided.
 * @param isNew Whether the chat is new ().
 */
export const getCurrentChat = async (
   chatHistories: (AiChatHistory & {
      messages: AiChatHistoryMessage[]
   })[],
   userId: string,
   chatId?: string,
   isNew?: boolean): Promise<{
   chatHistory: (AiChatHistory & { messages: AiChatHistoryMessage[] })
}> => {
   if (isNew) {
      const newChat = await xprisma.aiChatHistory.create({
         data: {
            userId,
            metadata: {},
         },
         include: { messages: true },
      });

      return { chatHistory: newChat };
   }

   let chatHistory: AiChatHistory = null!;
   let notFound = false;

   if (chatId?.length) {
      chatHistory = chatHistories.find(h => h.id === chatId);
      notFound = !chatHistory;
   } else {
      // Return the latest user chat:
      if (chatHistories.length) {
         return { chatHistory: chatHistories.at(0) };
      }
   }

   isNew = !chatHistory && !notFound;

   // Create a new chat history
   if (isNew) {
      const newChat = await xprisma.aiChatHistory.create({
         data: {
            userId,
            metadata: {},
         },
         include: { messages: true },
      });

      return { chatHistory: newChat };
   }

   return { chatHistory };
};

/**
 * Get notes by IDs for the current user.
 * @param noteIds The note IDs.
 */
export const getNotesByIds = async (noteIds: string[]) => {
   const session = await auth();
   return xprisma.note.findMany({
      where: {
         authorId: session?.user?.id,
         id: {
            in: noteIds,
         },
      },
   });

};

/**
 * Fill the system messages with notes if they exist.
 * @param chat The chat history.
 */
export const fillSystemMessagesWithNotes = async (chat: (AiChatHistory & { messages: AiChatHistoryMessage[] })) => {
   const sourceNoteIds = uniq(chat
      .messages
      ?.filter(m => !!m.metadata?.source_note_id?.length)
      .map(m => m.metadata?.source_note_id) ?? []);

   const sourceNotes = await getNotesByIds(sourceNoteIds);

   chat.messages
      ?.filter(m => !!m.metadata?.source_note_id?.length)
      .forEach(message => {
         message["note"] = sourceNotes.find(n => n.id === message.metadata?.source_note_id);
      });

   return chat;
};
