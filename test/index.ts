import { pEvent } from "p-event";
import assert from "node:assert";
import { flush } from "../src/index";

const worker = new Worker(new URL("index-worker.ts", import.meta.url), {
  type: "module",
});

function assertInWorker(function_: () => T): Promise<T> {
  worker.postMessage({ type: "test:eval", code: `(${function_})()` });
  const returnEvent = await pEvent(
    worker,
    "message",
    ({ data }) => data?.type === "test:return"
  );
  const { value } = returnEvent;
  assert(value);
}

console.info("localStorage is exposed");
await assertInWorker(
  () =>
    typeof localStorage !== "undefined" &&
    typeof localStorage.getItem === "function" &&
    typeof localStorage.setItem === "function" &&
    typeof localStorage.removeItem === "function" &&
    typeof localStorage.clear === "function" &&
    typeof localStorage.key === "function" &&
    typeof localStorage.length === "number"
);

console.info("sessionStorage is exposed");
await assertInWorker
