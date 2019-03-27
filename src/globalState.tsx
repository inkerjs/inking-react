import Store from './store'

export class GlobalStore {
  private stores: Map<string, Store> = new Map()
  public mountStore(path: string, store: Store) {
    if (this.stores.has(path)) {
      console.warn(`${path} is exist in global store, it will be replaced by the new store now.`)
    }
    this.stores.set(path, store)
  }

  public hasStore(path: string, store?: Store) {
    const maybeStore = this.stores.get(path)
    if (!maybeStore) return false
    if (store) return store === maybeStore
    return true
  }

  public unmountStore(path: string) {
    this.stores.delete(path)
  }
}

export default new GlobalStore()
