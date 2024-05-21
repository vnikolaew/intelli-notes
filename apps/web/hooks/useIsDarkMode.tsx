import { useTheme } from "next-themes";

export function useIsDarkMode() {
   const { theme } = useTheme();
   return theme === `dark` || theme === `system`;
}