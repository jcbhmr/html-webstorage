import {
  createStore,
  UseStore,
  get,
  set,
  entries,
  values,
  keys,
  clear,
  del,
} from "idb-keyval";

const localStorageStore = createStore(
  "@jcbhmr/html-webstorage.worker",
  "localStorage"
);
// Mirror localStorage => IndexedDB
for (const [key, value] of Object.entries(localStorage)) {
  set(key, value, localStorageStore);
}

const localStorageBC = new BroadcastChannel(
  "@jcbhmr/html-webstorage.worker:localStorage"
);
localStorageBC.addEventListener("message", ({ data }) => {
  if (data?.type === "setitem") {
    localStorage.setItem(data.key, data.value);
  } else if (data?.type === "removeitem") {
    localStorage.removeItem(data.key);
  } else if (data?.type === "clear") {
    localStorage.clear();
  }
});

export {};
