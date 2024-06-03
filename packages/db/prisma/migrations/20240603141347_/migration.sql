-- CreateEnum
CREATE TYPE "ChatHistoryMessageRole" AS ENUM ('USER', 'SYSTEM', 'ASSISTANT');

-- CreateTable
CREATE TABLE "AiChatHistory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "metadata" JSONB DEFAULT 'null',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "AiChatHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiChatHistoryMessage" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chatId" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "raw_text" TEXT NOT NULL,
    "role" "ChatHistoryMessageRole" NOT NULL,
    "metadata" JSONB DEFAULT 'null',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "AiChatHistoryMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AiChatHistory" ADD CONSTRAINT "AiChatHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiChatHistoryMessage" ADD CONSTRAINT "AiChatHistoryMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "AiChatHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiChatHistoryMessage" ADD CONSTRAINT "AiChatHistoryMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
