"use client";
import {
   AdmonitionDirectiveDescriptor,
   BoldItalicUnderlineToggles,
   StrikeThroughSupSubToggles,
   codeBlockPlugin,
   codeMirrorPlugin,
   CodeToggle,
   CreateLink,
   diffSourcePlugin,
   DiffSourceToggleWrapper,
   DirectiveDescriptor, directivesPlugin, frontmatterPlugin,
   GenericDirectiveEditor,
   GenericJsxEditor, headingsPlugin,
   imagePlugin,
   InsertCodeBlock, InsertFrontmatter,
   InsertImage,
   insertJsx$,
   InsertTable, jsxPlugin,
   linkDialogPlugin,
   linkPlugin, listsPlugin,
   ListsToggle, markdownShortcutPlugin,
   MDXEditor, MDXEditorMethods, MDXEditorProps,
   NestedLexicalEditor, quotePlugin,
   sandpackPlugin,
   tablePlugin, thematicBreakPlugin,
   toolbarPlugin,
   UndoRedo,
   usePublisher,
} from "@mdxeditor/editor";
import React, { ForwardedRef } from "react";
import { Button } from "components/ui/button";
import HtmlToolbarComponent from "./HTMLToolbarComponent";
import "../styles.css"

export interface InitializedMdxEditorProps extends MDXEditorProps {
   editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const CalloutDirectiveDescriptor: DirectiveDescriptor = {
   name: "callout",
   testNode(node) {
      return node.name === "callout";
   },
   // set some attribute names to have the editor display a property editor popup.
   attributes: [`attribute`],
   type: "leafDirective",
   // used by the generic editor to determine whether or not to render a nested editor.
   hasChildren: true,
   Editor: (props) => (
      <div style={{ border: "1px solid red", padding: 8, margin: 8 }}>
         <NestedLexicalEditor<any>
            block
            getContent={(node) => node.children}
            getUpdatedMdastNode={(mdastNode, children: any) => {
               return { ...mdastNode, children };
            }}
         />
      </div>

   ),

};

// a toolbar button that will insert a JSX element into the editor.
const InsertMyLeaf = () => {
   const insertJsx = usePublisher(insertJsx$);
   return (
      <Button
         onClick={() =>
            insertJsx({
               name: "Marker",
               kind: "text",
               props: {
                  foo: "bar",
                  bar: "baz",
                  onClick: { type: "expression", value: "() => console.log(\"Clicked\")" },
               },
            })
         }
      >
         Leaf
      </Button>
   );
};

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const InitializedMdxEditor = ({ editorRef, ...props }: InitializedMdxEditorProps) => {
   return (
      <MDXEditor
         ref={editorRef}
         className={`dark-editor`}
         onChange={{}}
         toMarkdownOptions={{listItemIndent: `tab`}}
         plugins={[
            toolbarPlugin({
                  toolbarContents: () => (
                     <>
                        {` `}
                        <DiffSourceToggleWrapper>
                           <UndoRedo />
                        </DiffSourceToggleWrapper>
                        <BoldItalicUnderlineToggles />
                        <CodeToggle />
                        <CreateLink />
                        <InsertCodeBlock />
                        <StrikeThroughSupSubToggles />
                        <InsertImage />
                        <InsertTable />
                        <ListsToggle />
                        <InsertFrontmatter />
                        <InsertMyLeaf />
                        <HtmlToolbarComponent />
                     </>
                  ),
               },
            ),
            tablePlugin(),
            headingsPlugin(),
            markdownShortcutPlugin(),
            listsPlugin(),
            quotePlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            diffSourcePlugin({ diffMarkdown: `An older version`, viewMode: `rich-text`, readOnlyDiff: true }),
            imagePlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: `js` }),
            directivesPlugin({ directiveDescriptors: [CalloutDirectiveDescriptor, AdmonitionDirectiveDescriptor] }),
            sandpackPlugin({
               sandpackConfig: {
                  presets: [{
                     label: "React",
                     name: "react",
                     meta: "live react",
                     sandpackTemplate: "react",
                     sandpackTheme: "light",
                     snippetFileName: "/App.js",
                     snippetLanguage: "jsx",
                     initialSnippetContent: defaultSnippetContent,
                  }],
                  defaultPreset: `react`,
               },
            }),
            codeMirrorPlugin({
               codeBlockLanguages: { js: `javascript`, css: `CSS` },
            }),
            jsxPlugin({
               jsxComponentDescriptors: [
                  {
                     name: "MyLeaf",
                     kind: "text", // 'text' for inline, 'flow' for block
                     // the source field is used to construct the import statement at the top of the markdown document.
                     // it won't be actually sourced.
                     source: "./external",
                     // Used to construct the property popover of the generic editor
                     props: [
                        { name: "foo", type: "string" },
                        { name: "bar", type: "string" },
                        { name: "onClick", type: "expression" },
                     ],
                     // whether the component has children or not
                     hasChildren: true,
                     Editor: GenericJsxEditor,
                  },
                  {
                     name: "Marker",
                     kind: "text",
                     source: "./external",
                     props: [{ name: "type", type: "string" }],
                     hasChildren: false,
                     Editor: () => {
                        return (
                           <div style={{ border: "1px solid red", padding: 8, margin: 8, display: "inline-block" }}>
                              <NestedLexicalEditor<any>
                                 getContent={(node) => node.children}
                                 getUpdatedMdastNode={(mdastNode, children: any) => {
                                    return { ...mdastNode, children };
                                 }}
                              />
                           </div>
                        );
                     },
                  },
                  {
                     name: "BlockNode",
                     kind: "flow",
                     source: "./external",
                     props: [],
                     hasChildren: true,
                     Editor: GenericJsxEditor,
                  },
               ],
            }),
            thematicBreakPlugin(),
            frontmatterPlugin(),
            markdownShortcutPlugin(),
         ]}
         {...props} />
   );
};

export default InitializedMdxEditor;