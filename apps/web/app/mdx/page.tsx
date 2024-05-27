import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import "@mdxeditor/editor/style.css";

export interface PageProps {
}

const EditorComponent = dynamic(() => import("./_components/InitializedMDXEditor"), { ssr: false });

const markdown = ` # Hello Next! \n --- \n ## Hello Again!
                  :::info
                  Some **content** with _Markdown_ syntax.
                  
                  :::danger
                  Some **danger** with _Markdown_ syntax.
            `;

const Page = ({}: PageProps) => {
   return (
      <section className="mt-24 flex flex-col w-full items-center">
         <Suspense fallback={`...`}>
            <EditorComponent editorRef={null!} markdown={markdown} />
         </Suspense>
      </section>
   );
};

export default Page;