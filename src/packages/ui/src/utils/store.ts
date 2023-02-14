import { subscribe } from 'valtio/vanilla'

export abstract class BaseStore<T extends object> {
  protected abstract readonly state: T

  // constructor (state: T) {
  //   this.state = state
  // }

  subscribe (callback: (newState: T) => void): () => void {
    return subscribe(this.state, () => callback(this.state))
  }
}
