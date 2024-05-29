"use client";

import { useSearchParams } from "next/navigation";

export function useSearchParam(key: string) {
   const params = useSearchParams();
   return params.get(key) && decodeURIComponent(params.get(key))
}