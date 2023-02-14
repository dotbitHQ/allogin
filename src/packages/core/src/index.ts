import EventEmitter from 'eventemitter3'

// to add
type Connector = null
type AlloginPlugin = null

export interface CoreEvents {
  activeWalletChange: (walletId: string) => void,
}

interface CoreOptions {
  connectors: Connector[],
  plugins?: AlloginPlugin[],
  fallbackToConnected?: boolean,
}

export class Core extends EventEmitter<CoreEvents> {
  constructor (options: CoreOptions) {
    super()
  }

  dispose (): void {
    this.removeAllListeners()
  }
}

export function createInstance (): Core {
  const defaultOptions = {
    connectors: [],
    fallbackToConnected: true
  }
  return new Core(defaultOptions)
}
