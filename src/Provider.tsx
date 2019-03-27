import React from 'react'
import globalState, { GlobalStore } from './globalState'

// const gStore = new GlobalStore()
export const InkingContext = React.createContext(globalState)
export const Provider = InkingContext.Provider
