"use client"
import { useState } from "react";

export function useBoolean(initial = false) {
   const [value, setValue] = useState(initial);
   return [value, setValue] as const;
}