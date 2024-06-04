"use client"
import React from "react";
import { useSearchParams } from "next/navigation";

export interface NotFoundProps {
}

const NotFound = (props: NotFoundProps) => {
   const params = useSearchParams()
   const chatId = params.get(`chatId`)

   return (
      <div>
         A chat with ID {chatId}  was not found.
      </div>
   );
};

export default NotFound;