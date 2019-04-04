// import { autorun } from 'inking'
// import React, { Component, Ref } from 'react'
// import Store from './store'
// import { isStateless } from './utils'

// function createConnector(grabStoresFn: (...args: any[]) => any, component: any) {
//   class Injector extends Component {
//     public static displayName = 'displayName'
//     public wrappedInstance

//     public storeRef = instance => {
//       this.wrappedInstance = instance
//     }

//     public render() {
//       let newProps = {}
//       for (let key in this.props) {
//         if (this.props.hasOwnProperty(key)) {
//           newProps[key] = this.props[key]
//         }
//       }
//       const additionalProps = grabStoresFn(this.context.mobxStores || {}, newProps, this.context) || {}
//       Object.keys(additionalProps).forEach(key => {
//         newProps[key] = additionalProps[key]
//       })

//       if (!isStateless(component)) {
//         ;(newProps as any).ref = this.storeRef
//       }

//       return React.createElement(component, newProps)
//     }
//   }
// }

// export default function connect(/* fn(stores, nextProps) or ...storeNames */) {
//   const grabStoresFn = arguments[0]
//   return componentClass => {
//     let injected = createConnector(grabStoresFn, componentClass)
//     // injected.isMobxInjector = false // supress warning
//     // mark the Injector as observer, to make it react to expressions in `grabStoresFn`,
//     // see #111
//     injected = autorun(injected)
//     // injected.isMobxInjector = true // restore warning
//     return injected
//   }
// }
