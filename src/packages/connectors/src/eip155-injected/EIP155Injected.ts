import ethers from 'ethers'
import { Ethereum, Chain } from '@allogin/chains'

import { BaseWallet } from '../BaseWallet'

interface WalletError extends Error {
  code: number,
  name: string,
  message: string,
  rawError: Error,
  walletId: string,
}

const wrapWalletError = (error: Error): WalletError => {
  return {
    name: '111',
    code: 111,
    message: '111',
    rawError: error ?? new Error(),
    walletId: 'xxx'
  }
}

export class EIP155Injected extends BaseWallet {
  readonly environment = 'browser'
  readonly id: string = 'eip155-injected'
  readonly name: string = 'EVM-Compatible Injected Wallet'
  readonly icon = null
  readonly supportedChains = [Ethereum]
  readonly downloadUrls: BaseWallet['downloadUrls'] = undefined

  installed = false
  connected = false
  currentChain = this.supportedChains[0]

  private provider: ethers.providers.ExternalProvider | null = null
  private signer: ethers.providers.JsonRpcSigner | null = null

  async init (): Promise<void> {
    this.installed = this.checkInstalled()
  }

  checkInstalled (): boolean {
    return Boolean(window.ethereum)
  }

  // consider chainID?
  getProvider (): ethers.providers.ExternalProvider {
    this.provider = window.ethereum
    return this.provider
  }

  // consider chainID?
  getSigner (): ethers.providers.JsonRpcSigner {
    if (!this.signer) {
      const formattedProvider = new ethers.providers.Web3Provider(this.getProvider())
      this.signer = formattedProvider?.getSigner?.()
    }
    return this.signer
  }

  private request (params: {
    method: string,
    params?: any[] | undefined,
  }): Promise<any> {
    const provider = this.getProvider()
    if (!provider?.request) {
      throw new Error('Provider does not provide ability to make requests')
    }
    return provider.request(params)
  }

  async getAccounts (): Promise<string[]> {
    try {
      const accounts = await this.request({
        method: 'eth_accounts',
      }) as string[]
      return accounts
    }
    catch (err) {
      throw wrapWalletError(err as Error)
    }
  }

  async connect (): Promise<string[]> {
    try {
      const accounts = await this.request({
        method: 'eth_requestAccounts',
      })
      this.connected = true
      return accounts
    }
    catch (err) {
      throw wrapWalletError(err as Error)
    }
  }

  async disconnect () {
    // removeListener logic...

    this.connected = false
  }

  async addChain (chain: Chain) {
    try {
      await this.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chain.id, // use util to convert
            chainName: chain.networkName,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: chain.rpcUrls,
            blockExplorerUrls: chain.blockExplorerUrls
          },
        ],
      })
      return true
    }
    catch (err) {
      throw wrapWalletError(err as Error)
    }
  }

  async switchChain (chainId: string): Promise<boolean> {
    try {
      await this.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })
      return true
    }
    catch (err) {
      // add 4902 add chain logic
      throw wrapWalletError(err as Error)
    }
  }

  async getCurrentChain (): Promise<Chain> {
    try {
      const chainId = await this.request({ method: 'eth_chainId' }) as string | number | bigint
      // return chainId
      return Ethereum
    }
    catch (err) {
      throw wrapWalletError(err as Error)
    }
  }

  private async signTypedDataV4 (msg: string): Promise<string> {
    try {
      const [currentAccount] = await this.getAccounts()
      const res = await this.request({
        method: 'eth_signTypedData_v4',
        params: [currentAccount, JSON.stringify(msg)],
      })
      return res
    }
    catch (err) {
      throw wrapWalletError(err as Error)
    }
  }

  private async personalSign (msg: string): Promise<string> {
    try {
      const [currentAccount] = await this.getAccounts()
      const res = await this.request({
        method: 'personal_sign',
        // add conversion logic
        params: ['_data', currentAccount],
      })
      return res
    }
    catch (err) {
      throw wrapWalletError(err as Error)
    }
  }

  async signData (data: string, isEIP712: boolean): Promise<string> {
    const signFunc = isEIP712 ? this.signTypedDataV4 : this.personalSign
    const signedMsg = await signFunc(data)
    return signedMsg
  }

  async sendTransaction (tx: {to: string, value: number, data: object}): Promise<string> {
    try {
      // need conversion
      const { to, value, data } = tx
      const [currentAccount] = await this.getAccounts()
      return await this.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to,
            value,
            data,
            gas: '25000',
          },
        ],
      })
    }
    catch (err) {
      throw wrapWalletError(err as Error)
    }
  }

  dispose (): void {
    this.removeAllListeners()
  }
}
