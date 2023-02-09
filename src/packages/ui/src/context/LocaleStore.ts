import { proxy } from 'valtio/vanilla'
import { BaseStore } from '../utils'

const SUPPORTED_LOCALES = ['en-US', 'zh-CN'] as const

type SupportedLocale = typeof SUPPORTED_LOCALES[number]

interface LocaleState {
  locale: SupportedLocale,
}

const state = proxy<LocaleState>({
  locale: 'en-US',
})

export class LocaleStore extends BaseStore<LocaleState> {
  protected readonly state = state

  setLocale (locale: SupportedLocale): void {
    this.state.locale = locale
  }
}
