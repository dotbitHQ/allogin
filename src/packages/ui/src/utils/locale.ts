import { registerTranslateConfig, use, get } from 'lit-translate'
import { makeCrcKey } from 'i18n-abc/lib/shared.js'

// global.$t = () => {}
export function $t (text: string): string {
  const key = makeCrcKey(text)
  return key
}

// initialize i18n lib
registerTranslateConfig({
  loader: async (lang: string) => {
    // return await import(`../../../../locales/${lang}.json`)
    return await import(`../test-locales/${lang}.json`)
  }
})

// choose default language
// eslint-disable-next-line
use('en-US')

// export function t (key: string): string {
//   console.log('key', key)
//   console.log($t('header.title'))
//   // setTimeout(() => {
//   //   console.log(t('header.title'))
//   // }, 3000)
//   return get(key)
// }
