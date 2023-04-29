![🚧 Under construction 👷‍♂️](https://i.imgur.com/LEP2R3N.png)

# HTML web storage for `Worker` threads

⏱️ Completely synchronous API just like normal `localStorage` \
👨‍🔧 Implementation of existing specification in another context \
⚠️ Doesn't work in service workers (yet)

## Installation

If you're going to use this with Node.js, you'll need a compatible web `Worker`
polyfill implementation. I recommend [jcbhmr/html-workers].

```sh
npm install jcbhmr/html-workers
```

## Usage

```js
// main.js
import "@jcbhmr/html-webstorage.worker";

const worker = new Worker("worker.js")
```

```js
// worker.js
import "@jcbhmr/html-webstorage.worker";

const showImages = JSON.parse(localStorage.getItem("showImages"));
console.log(showImages);
```

### How it works

We use a `function () {}` wrapper around the original `Worker` constructor which
lets us immediately attach a `message` event handler. Then, we use a
`SharedArrayBuffer` as a communication channel to synchronously proxy all `.getItem()` and `.setItem()` operations to the main `Window` context which has access to the native `localStorage`.

If `SharedArrayBuffer` is not available, then we just resort to using a polling/diffing strategy to sync any changes. Every three seconds (when a `Worker` is tracked), we'll use `requestIdleCallback()` (if available) to push any changes to the `Worker` and pull any changes from the `Window`. This lets us keep the synchronous API surface inside the `Worker` without always requiring the complicated cross-origin isolation headers.

If needed, we do expose an async `flush()` function export to explicitly flush changes
and pull in new data.

```js
// Works in both Window and Worker contexts.
import { flush } from "@jcbhmr/html-webstorage.worker";

sessionStorage.setItem("hello", "world");
// Optionally await it.
await flush();
```

You shouldn't need to worry about any bubbling `message` events. We do a good job of using `.stopImmediatePropogation()` to prevent any of your user-level code from getting any of our internal events.

## Development

- [ ] `.onstorage` property exists on global scope inside `Worker`
- [ ] `storage` even is emitted when changes are `flush()`-ed
- [ ] `sessionStorage` is exposed as a global
- [ ] `localStorage` is exposed as a global
- [ ] `Storage` is exposed as an interface globally

---

# webworker-polyfill

Web worker has a lot of limitations like you cannot access `localStorage`, because you cannot access initiating window.

This library is to fill this gap, providing this missing objects. Only exception is that these APIs will become promised methods.

# Usage

Install:
`npm install webworker-polyfill`

In your host context:
```javascript
import polyfill from 'webworker-polyfill'

const worker = new Worker('./worker.js')
polyfill(worker)
```

In your worker context (`worker.js` here):
```javascript
import polyfill from 'webworker-polyfill'

polyfill(self)

// then do what you want to do
localStorage.setItem('set_from_worker', 'whatever')
localStorage.getItem('set_from_worker').then((value) => {
  console.log(value)
})

// or use ES2017 async/await
(async () => {
  const value = await localStorage.getItem('set_from_worker')
  console.log(value)
})()
```

# How it works

Just `postMessage()` and request the host context to access these resources whenever you access these missing APIs. Simple, right?

# Supported APIs

- localStorage
- indexDB
