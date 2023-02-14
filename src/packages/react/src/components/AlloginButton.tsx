import React from 'react'
import { AlloginButton as _AlloginButton } from '@allogin/ui'

export function AlloginButton (props: JSX.IntrinsicElements['allogin-button']): JSX.Element {
  return <allogin-button {...props} />
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'allogin-button': Pick<_AlloginButton, 'iconLeft' | 'iconRight' | 'disabled'>,
    }
  }
}
