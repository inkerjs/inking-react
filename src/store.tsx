import globalStore from './globalState'

interface IStoreElements {
  states: any
  actions?: {
    [keys: string]: (...args: any[]) => any
  }
}

export default class Store {
  public path: string
  public constructor(path: string, elements: IStoreElements) {
    this.path = path
    globalStore.mountStore(path, this)
  }
}
