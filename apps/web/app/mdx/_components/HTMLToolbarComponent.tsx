"use client";
import { GenericHTMLNode, activeEditor$, currentSelection$, useCellValues, editorInFocus$ } from "@mdxeditor/editor";
import React from "react";

export interface HtmlToolbarComponentProps {
}

export function $getNearestNodeOfType<T extends GenericHTMLNode>(
   node: T,
   klass: any,
): T | null {
   let parent: any = node;

   while (parent != null) {
      if (parent instanceof klass) {
         return parent as T;
      }

      parent = parent.getParent();
   }

   return null;
}

function getCssClass(node: GenericHTMLNode | null) {
   console.log({ node });
   return (node?.getAttributes().find((attr) => attr.name === "class")?.value as string) ?? "";
}

const HtmlToolbarComponent = ({}: HtmlToolbarComponentProps) => {
   const [currentSelection, activeEditor] = useCellValues(currentSelection$, activeEditor$);

   const currentHTMLNode = React.useMemo<GenericHTMLNode>(() => {
      return (
         activeEditor?.getEditorState().read(() => {
            const selectedNodes = currentSelection?.getNodes() || [];
            if (selectedNodes.length === 1) {
               // @ts-ignore
               return $getNearestNodeOfType(selectedNodes[0], GenericHTMLNode);
            } else {
               return null;
            }
         }) || null
      );
   }, [currentSelection, activeEditor]);

   console.log({ currentSelection, currentHTMLNode });

   return (
      <>
         <input
            // disabled={currentHTMLNode === null}
            value={getCssClass(currentHTMLNode)}
            onChange={(e) => {
               activeEditor?.update(
                  () => {
                     const attributesWithoutClass = currentHTMLNode?.getAttributes().filter((attr) => attr.name !== "class") || [];
                     const newClassAttr: any = {
                        type: "mdxJsxAttribute",
                        name: "class",
                        value: e.target.value,
                     };
                     currentHTMLNode?.updateAttributes([...attributesWithoutClass, newClassAttr]);
                  },
                  { discrete: true },
               );
               e.target.focus();
            }}
         />
      </>

   );
};

export default HtmlToolbarComponent;