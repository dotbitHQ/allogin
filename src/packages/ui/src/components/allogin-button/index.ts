import { html, LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
// import styles from './index.css'
import { $t } from '../../utils'
import { use, get, translate } from 'lit-translate'

@customElement('allogin-button')
export class AlloginButton extends LitElement {
  // public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public disabled? = false
  @property() public iconLeft?: TemplateResult<2> = undefined
  @property() public iconRight?: TemplateResult<2> = undefined
  // @property() public onClick: () => void = () => null

  async connectedCallback (): Promise<void> {
    super.connectedCallback()
    // A hack to make sure translation is loaded
    console.log('get', get(''))
  }

  async onClick (): Promise<void> {
    await use(Math.random() > 0.5 ? 'zh-CN' : 'en-US')
  }

  // -- render ------------------------------------------------------- //
  protected render (): TemplateResult<1> {
    const classes = {
      'w3m-icon-left': this.iconLeft !== undefined,
      'w3m-icon-right': this.iconRight !== undefined
    }

    return html`
      <button class=${classMap(classes)} ?disabled=${this.disabled} @click=${this.onClick}>
        ${this.iconLeft}
          <slot></slot>
          ${translate($t('What an ugly boy'))}
        ${this.iconRight}
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'allogin-button': AlloginButton,
  }
}
