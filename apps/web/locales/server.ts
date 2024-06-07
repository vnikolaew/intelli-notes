// locales/server.ts
import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
   // en: () => import('../messages/en.json').then(m => m.default),
   // fr: () => import('../messages/fr.json').then(m => m.default),
   // de: () => import('../messages/de.json').then(m => m.default),
   // zh: () => import('../messages/zh.json').then(m => m.default),
   // es: () => import('../messages/es.json').then(m => m.default),

   en: () => import('@/messages/client/en'),
   fr: () => import('@/messages/client/fr'),
   de: () => import('@/messages/client/de'),
   zh: () => import('@/messages/client/zh'),
   es: () => import('@/messages/client/es'),
})