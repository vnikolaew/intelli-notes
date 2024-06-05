import { useState, useEffect, useRef } from "react";

function useDebounce<T>(value: T, delay: number) {
   const [debouncedValue, setDebouncedValue] = useState(value);
   const handler = useRef(null);

   useEffect(() => {
      // Clear the previous timeout if value changes
      clearTimeout(handler.current);

      // Set a new timeout to update the debounced value after the specified delay
      handler.current = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);

      // Cleanup the timeout on component unmount or when value or delay changes
      return () => {
         clearTimeout(handler.current);
      };
   }, [value, delay]);

   return debouncedValue;
}

export default useDebounce;
