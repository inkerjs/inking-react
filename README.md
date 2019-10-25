# inking-react

React bindings for [Inking](https://github.com/inkerjs/inking).

## Online Demo

- [Counter demo](<https://codesandbox.io/s/k9p37vv6rr>)

## Example

```jsx
import React from "react";
import { observable } from "inking";
import { createReactiveStore } from "inking-react";

@observable
class CountStore {
  count = 0;
  useless = "";
  add() {
    this.count++;
  }
  dec() {
    this.count--;
  }
  reset() {
    this.count = 0;
  }
}

const store = new CountStore();

const { ReactiveProvider, useReactive } = createReactiveStore(store);

function Display() {
  const { count } = useReactive(store => {
    return {
      count: store.count
    };
  });
  return <div>{count}</div>;
}

function Toolbar() {
  const { add, dec, reset } = useReactive(store => ({
    add: store.add,
    dec: store.dec,
    reset: store.reset
  }));
  return (
    <div>
      <button onClick={add}>Incr</button>
      <button onClick={dec}>Decr</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// Wrapped components by Provider
function App() {
  return (
    <ReactiveProvider>
      <Display />
      <Toolbar />
    </ReactiveProvider>
  );
}

export default App;
```

## Usage

Only one API provided

```js
import { createReactiveStore } from "inking-react";
```

Pass a observable value, and will get a context Provider and a `useReactive` function just like `mapStateToProps` in redux-react.

```js
const { ReactiveProvider, useReactive } = createReactiveStore(store);
```
