import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import React from "react";
import SentenceSimilarityForm from "./_components/SentenceSimilarityForm";
import ImageClassificationForm from "./_components/ImageClassificationForm";
import DocumentAnsweringForm from "./_components/DocumentAnsweringForm";
import OpenAijsonObjectForm from "./_components/OpenAIJSONObjectForm";

export interface PageProps {
}

const Page = ({}: PageProps) => {
   return (
      <section className={`flex flex-col w-full mt-12 items-center`}>
         <h2 className={`text-xl`}>AI playground.</h2>
         <Tabs defaultValue="ss" className="!min-w-[600px] mt-8 w-fit">
            <TabsList>
               <TabsTrigger value="ss">Sentence Similarity</TabsTrigger>
               <TabsTrigger value="ic">Image classification</TabsTrigger>
               <TabsTrigger value="da">Document Answering</TabsTrigger>
               <TabsTrigger value="oai">OpenAI 4o Generate a JSON object</TabsTrigger>
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
         </Tabs>
      </section>
   );
};

export default Page;