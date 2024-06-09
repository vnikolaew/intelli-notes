import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import React from "react";
import SentenceSimilarityForm from "./_components/SentenceSimilarityForm";
import ImageClassificationForm from "./_components/ImageClassificationForm";
import DocumentAnsweringForm from "./_components/DocumentAnsweringForm";
import OpenAijsonObjectForm from "./_components/OpenAIJSONObjectForm";
import TextToSpeechForm from "./_components/TextToSpeechForm";
import { __IS_PROD__ } from "@/lib/consts";
import { notFound } from "next/navigation";

export interface PageProps {
}

const Page = ({}: PageProps) => {
   if(__IS_PROD__) return notFound()

   return (
      <section className={`flex flex-col w-full mt-12 items-center`}>
         <h2 className={`text-xl`}>AI playground.</h2>
         <Tabs defaultValue="tts" className="!min-w-[600px] mt-8 w-fit">
            <TabsList>
               <TabsTrigger value="ss">Sentence Similarity</TabsTrigger>
               <TabsTrigger value="ic">Image classification</TabsTrigger>
               <TabsTrigger value="da">Document Answering</TabsTrigger>
               <TabsTrigger value="oai">OpenAI 4o Generate a JSON object</TabsTrigger>
               <TabsTrigger value="tts">Text to Speech</TabsTrigger>
            </TabsList>
            <TabsContent value="ss">
               <SentenceSimilarityForm />
            </TabsContent>
            <TabsContent value="ic">
               <ImageClassificationForm />
            </TabsContent>
            <TabsContent value="da">
               <DocumentAnsweringForm />
            </TabsContent>
            <TabsContent value="oai">
               <OpenAijsonObjectForm />
            </TabsContent>
            <TabsContent value="tts">
               <TextToSpeechForm />
            </TabsContent>
         </Tabs>
      </section>
   );
};

export default Page;