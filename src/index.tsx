import { reaction } from 'inking'
import React, { useContext, useState } from 'react'
import { getInstanceMethodNames } from './utils'

const StoreContext = React.createContext({
  store: null
})

function bindActions(instance) {
  const methods = getInstanceMethodNames(instance, Object.prototype)
  methods.forEach(key => {
    instance[key] = instance[key].bind(instance)
  })
}

export function createReactiveStore<T>(store: T) {
  bindActions(store)

  return {
    ReactiveProvider({ children }) {
      return <StoreContext.Provider value={{ store: store as any }}>{children}</StoreContext.Provider>
    },
    useReactive(mapperFn: any) {
      const context = useContext(StoreContext)
      const contextStore = context.store || store
      const [, setTick] = useState(0)
      reaction(
        () => {
          const _collection = mapperFn(store) // just for dependencies collection
        },
        () => {
          // force update
          setTick(tick => tick + 1)
        }
      )
      return mapperFn(store)
    }
  }
}
