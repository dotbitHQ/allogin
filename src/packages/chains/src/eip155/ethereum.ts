import { Chain } from '../types'

export const Ethereum: Chain = {
  id: '1',
  name: 'Ethereum',
  isTestnet: false,
  icon: null,
  networkName: 'homestead',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://mainnet.infura.io/v3/'],
  blockExplorerUrls: ['https://etherscan.io'],
}
