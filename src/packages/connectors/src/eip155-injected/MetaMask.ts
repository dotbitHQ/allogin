import { EIP155Injected } from './EIP155Injected'

export class MetaMask extends EIP155Injected {
  readonly id = 'metamask'
  readonly name = 'MetaMask'
  readonly icon = null
  readonly downloadUrls = {
    browserExtension:
    'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
    android: 'https://play.google.com/store/apps/details?id=io.metamask',
    ios: 'https://apps.apple.com/us/app/metamask/id1438144202',
    qrCode: 'https://metamask.io/download/',
  }

  checkInstalled (): boolean {
    // to add complex logics
    const isMetaMask = true
    return Boolean(window.ethereum && isMetaMask)
  }
}
