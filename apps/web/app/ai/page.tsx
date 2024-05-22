import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import React from "react";
import SentenceSimilarityForm from "./_components/SentenceSimilarityForm";
import ImageClassificationForm from "./_components/ImageClassificationForm";
import DocumentAnsweringForm from "./_components/DocumentAnsweringForm";

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

         </Tabs>
      </section>
   );
};

export default Page;