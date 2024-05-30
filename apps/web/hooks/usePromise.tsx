"use client"
import { useCallback, useState } from "react";

export function usePromise<T>(func: (...args: any[]) => Promise<T>) {
   const [loading, setLoading] = useState(false);

   const withLoading = useCallback(async (...args: any[]) => {
      setLoading(true);
      return func(...args).finally(() => setLoading(false));
   }, [func]);

   return { action: withLoading, loading } as const;
}
