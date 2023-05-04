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

const store = new WeakMap<Storage, UseStore>();
const cache = new WeakMap<Storage, Map<string, string>>();
const ready = new WeakMap<Storage, Promise<unknown>>();
const bc = new WeakMap<Storage, BroadcastChannel>();

class Storage {
  constructor(name: string) {
    const that = new Proxy(this, {
      get(target, p, receiver) {
        if (typeof p === "string" && !(p in target)) {
          return target.getItem(p);
        }

        return Reflect.get(target, p, target);
      },
      set(target, p, newValue, receiver) {
        if (typeof p === "string" && !(p in target)) {
          target.setItem(p, newValue);
          return true;
        }

        return Reflect.set(target, p, newValue, target);
      },
      has(target, p) {
        if (typeof p === "string" && !(p in target)) {
          return target.getItem(p) !== null;
        }

        return Reflect.has(target, p);
      },
      deleteProperty(target, p) {
        if (typeof p === "string" && !(p in target)) {
          target.removeItem(p);
          return true;
        }

        return Reflect.deleteProperty(target, p);
      },
      ownKeys(target) {
        return [...cache.get(target)!.keys()];
      }
    });

    store.set(that, createStore("@jcbhmr/html-webstorage.worker", name));
    cache.set(that, new Map());

    bc.set(
      that,
      new BroadcastChannel("@jcbhmr/html-webstorage.worker:" + name)
    );
    bc.get(that)!.addEventListener("message", ({ data }) => {
      if (data?.type === "setitem") {
        cache.get(that)!.set(data.key, data.value);
      } else if (data?.type === "removeitem") {
        cache.get(that)!.delete(data.key);
      } else if (data?.type === "clear") {
        cache.get(that)!.clear();
      }
    });
    ready.set(
      that,
      (async () => {
        const all = (await entries(store.get(that)!)) as [string, string][];
        cache.get(that)!.clear();
        for (const [key, value] of all) {
          cache.get(that)!.set(key, value);
        }
      })()
    );
  }

  get length(): number {
    return cache.get(this)!.size;
  }

  key(index: number): string | null {
    return [...cache.get(this)!.keys()][index] ?? null;
  }

  getItem(key: string): string | null {
    return cache.get(this)!.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    cache.get(this)!.set(key, value);
    set(key, value, store.get(this)!);
    bc.get(this)!.postMessage({ type: "setitem", key, value });
  }

  removeItem(key: string): void {
    cache.get(this)!.delete(key);
    del(key, store.get(this)!);
    bc.get(this)!.postMessage({ type: "removeitem", key });
  }

  clear(): void {
    cache.get(this)!.clear();
    clear(store.get(this)!);
    bc.get(this)!.postMessage({ type: "clear" });
  }
}

export default Storage;
