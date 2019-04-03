import { autorun, reaction } from 'inking'
import React from 'react'

export function useForceUpdate() {
  const [, setTick] = React.useState(0)

  const update = React.useCallback(() => {
    setTick(tick => tick + 1)
  }, [])

  return update
}

const InkingContext = React.createContext({
  state: null,
  dispatch: null
})

export const createStore = (initialState, reducer) => ({
  Provider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const contextValue = { state, dispatch }
    return <InkingContext.Provider value={contextValue as any}>{children}</InkingContext.Provider>
  },
  useInking() {
    const context = React.useContext(InkingContext)
    return { state: context.state, dispatch: context.dispatch }
  }
})

const InkingContext2 = React.createContext({
  store: {}
})

export const createReactiveStore = store => ({
  ReactiveProvider({ children }) {
    return <InkingContext2.Provider value={{ store }}>{children}</InkingContext2.Provider>
  },
  useReactive(mapperFn: any) {
    const context = React.useContext(InkingContext2)
    const contextStore = context.store
    const [, setTick] = React.useState(0)
    reaction(
      () => {
        const boundRes = mapperFn(store)
        Object.keys(boundRes).forEach(key => {
          if (typeof contextStore[key] === 'function') {
            contextStore[key] = contextStore[key].bind(contextStore)
          }
        })
      },
      () => {
        setTick(tick => tick + 1)
      }
    )
    return mapperFn(store)
  }
})
