// locales/client.ts
"use client"
import { createI18nClient } from 'next-international/client'

export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
   en: () => import('@/messages/client/en'),
   fr: () => import('@/messages/client/fr'),
   de: () => import('@/messages/client/de'),
   zh: () => import('@/messages/client/zh'),
   es: () => import('@/messages/client/es'),
})