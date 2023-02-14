import EventEmitter from 'eventemitter3'

import { Chain } from '@allogin/chains'

export interface BaseWalletEvents {
  init: () => void,
  dispose: () => void,
  connect: () => void,
  disconnect: () => void,
  accountsChanged: (accounts: string[]) => void,
  chainChanged: (chainId: string) => void,
  error: (error: Error) => void,
}

export abstract class BaseWallet extends EventEmitter<BaseWalletEvents> {
  abstract readonly id: string
  abstract readonly name: string
  abstract readonly environment: 'all' | 'browser' | 'node'
  abstract readonly icon: unknown
  abstract installed: boolean
  abstract readonly downloadUrls?: {
    browserExtension?: string,
    android?: string,
    ios?: string,
    qrCode?: string,
  }

  abstract readonly supportedChains: Chain[]
  abstract checkInstalled (): Promise<boolean> | boolean
  abstract currentChain: Chain
  abstract connected: boolean
  abstract init (): Promise<void>
  abstract connect (): Promise<string[]>
  abstract disconnect (): Promise<void>
  abstract getAccounts (): Promise<string[]>
  abstract getCurrentChain (): Promise<Chain>
  abstract getProvider (): unknown
  abstract getSigner (): unknown
  abstract switchChain (chainId: string): Promise<boolean>
  abstract addChain (chain: unknown): Promise<boolean>
  abstract signData (data: string, isEIP712: boolean): Promise<string>
  abstract sendTransaction (tx: object): Promise<string>
  abstract dispose (): void
}
