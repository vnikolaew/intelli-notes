import React from "react";
import {
   AdmonitionDirectiveDescriptor,
   codeBlockPlugin, codeMirrorPlugin,
   diffSourcePlugin, DirectiveDescriptor, directivesPlugin, frontmatterPlugin, GenericJsxEditor,
   headingsPlugin, imagePlugin, jsxPlugin, linkDialogPlugin, linkPlugin,
   listsPlugin,
   markdownShortcutPlugin, NestedLexicalEditor,
   quotePlugin, realmPlugin, sandpackPlugin,
   tablePlugin, thematicBreakPlugin,
   toolbarPlugin,
} from "@mdxeditor/editor";
import EditorToolbar from "./EditorToolbar";
import { YTDescriptor } from "./YoutubeComponent";

export interface PluginsProps {
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


type CalloutType = `info` | `danger` | `warning` | `caution` | `tip` | `note`;

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

export const plugins = [
   toolbarPlugin({
         toolbarContents: () => <EditorToolbar />,
      },
   ),
   realmPlugin({
      init: (realm, params) => {
      },
      update: (realm, params) => console.log({ realm, params }),
      postInit: (realm, params) => console.log({ realm, params })
   }),
   tablePlugin(),
   headingsPlugin(),
   markdownShortcutPlugin({
   }),
   listsPlugin(),
   quotePlugin(),
   linkPlugin(),
   linkDialogPlugin(),
   diffSourcePlugin({ diffMarkdown: `An older version`, viewMode: `rich-text`, readOnlyDiff: true }),
   imagePlugin({
      disableImageSettingsButton: false,
      imagePreviewHandler: async src => src,
   }),
   codeBlockPlugin({ defaultCodeBlockLanguage: `js` }),
   directivesPlugin({ directiveDescriptors: [CalloutDirectiveDescriptor, AdmonitionDirectiveDescriptor, YTDescriptor] }),
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
];
