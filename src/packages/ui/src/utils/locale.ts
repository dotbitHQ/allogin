import { registerTranslateConfig, use } from 'lit-translate'
import { makeCrcKey } from 'i18n-abc/lib/shared.js'

export function $t (text) {
  const rawKey = makeCrcKey(text)
  // To resolve i18n key bug in lit-translate
  return rawKey.replace(/[^a-zA-Z0-9]/g, '_')
}

// initialize i18n lib
registerTranslateConfig({
  loader: async (lang: string) => {
    return await import(`../../../../locales/raw/${lang}.json`)
  }
})

// choose default language
// eslint-disable-next-line
use('en-US')