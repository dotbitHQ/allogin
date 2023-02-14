export {}

declare module '*.css'

declare global {
  interface Window {
    $t: Function,
  }
}
