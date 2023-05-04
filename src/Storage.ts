// It can only be ONE of the THREE implementations that are available. Pick one.
let Storage: typeof import("./Storage-node").default;
if (typeof process !== "undefined") {
  ({ default: Storage } = await import("./Storage-node"));
} else if (
  typeof WorkerGlobalScope !== "undefined" &&
  globalThis instanceof WorkerGlobalScope
) {
  ({ default: Storage }) = await import("./Storage-worker");
} else if (
  typeof ServiceWorkerGlobalScope !== "undefined" &&
  globalThis instanceof ServiceWorkerGlobalScope
) {
  ({ default: Storage }) = await import("./Storage-sw");
} else {
  throw new DOMException("TODO: Better error message", "NotSupportedError");
}

export default Storage;
