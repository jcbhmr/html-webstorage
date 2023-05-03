_This isn't intended to be used on its own. See the [main project]._

## How it works

This service worker implementation uses a similar principal to the regular
`Worker` implementation, where we `.postMessage()` to a `Window` with access to
the native `Storage` APIs accessible with the data to update it. But we can't
_quite_ do that because there would be no way to import the state of a `Storage`
object like `localStorage` when first loaded. For instance, take this code:

```js
// sw.js
import "@jcbhmr/html-webstorage.sw";

globalThis.addEventListener("install", () => {
  console.log("Installing!")
})

if (JSON.parse(localStorage.getItem("overrideEverything"))) {
  globalThis.addEventListener("fetch", (event) => {
    event.respondWith(new Response("You've been overridden!"))
  })
}
```

How could we pre-populate the `localStorage` global from an existing `Window`?
We can't! Because there might not be a `WindowClient` that can respond with
`localStorage`'s contents!

Instead, we use `indexedDB` as a fallback messaging channel for when a `Window`
does not exist. We can read the initial state from `indexedDB` when there's no
`WindowClient` objects to use, and once there _is_ a `WindowClient`, that client
can then respond on the `BroadcastChannel` that we use internally for signalling
`Storage` updates from non-`Window` contexts.

The gist is the same though:

1. When the module is first loaded,
2. We maintain an in-memory cache of the current localStorage state

[main project]: https://github.com/jcbhmr/html-webstorage#readme
