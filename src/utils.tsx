import { useCallback, useState } from 'react'

// try to find the global object
// it is window in the DOM and global in NodeJS and React Native
const isDOM = typeof window !== 'undefined'
const isNative = typeof global !== 'undefined'
export const globalObj = isDOM ? window : isNative ? global : undefined

export const hasHooks = typeof useState === 'function'

export function isStateless(component) {
  // `function() {}` has prototype, but `() => {}` doesn't
  // `() => {}` via Babel has prototype too.
  return !(component.prototype && component.prototype.render)
}

export function useForceUpdate() {
  const [, setTick] = useState(0)

  const update = useCallback(() => {
    setTick(tick => tick + 1)
  }, [])

  return update
}

function hasMethod(obj, name) {
  const desc = Object.getOwnPropertyDescriptor(obj, name)
  return !!desc && typeof desc.value === 'function'
}

export function getInstanceMethodNames(obj, stop) {
  let array: any[] = []
  let proto = Object.getPrototypeOf(obj)
  while (proto && proto !== stop) {
    Object.getOwnPropertyNames(proto).forEach(name => {
      if (name !== 'constructor') {
        if (hasMethod(proto, name)) {
          array.push(name)
        }
      }
    })
    proto = Object.getPrototypeOf(proto)
  }
  return array
}
