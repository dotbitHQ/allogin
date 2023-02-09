export interface Chain {
  id: string,
  name: string,
  isTestnet: boolean,
  icon: unknown,
  networkName: string,
  nativeCurrency: {
    name: string,
    symbol: string,
    decimals: number,
  },
  rpcUrls: string[],
  blockExplorerUrls: string[],
}
