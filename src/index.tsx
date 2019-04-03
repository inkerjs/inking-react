import React from 'react'

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
