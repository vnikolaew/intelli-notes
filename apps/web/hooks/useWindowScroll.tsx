"use client"
import { useState, useEffect } from "react";

function useWindowScroll() {
   // Initialize the state with the current scroll position
   const [scrollPosition, setScrollPosition] = useState({
      y: window?.scrollY,
   });

   useEffect(() => {
      // Define the handler for the scroll event
      const handleScroll = () => {
         setScrollPosition({
            y: window?.scrollY,
         });
      };

      // Add the event listener for the scroll event
      window?.addEventListener("scroll", handleScroll);

      // Clean up the event listener on component unmount
      return () => {
         window?.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return scrollPosition;
}

export default useWindowScroll;
