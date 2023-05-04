import {
  UseStore,
  createStore,
  get as dbGet,
  set as dbSet,
  keys as dbKeys,
  values as dbValues,
  entries as dbEntries,
  del as dbDelete,
  clear as dbClear,
} from "idb-keyval";

const dbName = "@jcbhmr/html-webstorage.worker";

/**
 * Just like `Map`, but with async methods. Uses idb-keyval under the hood.
 * Provide it with a store name, and it will do the rest. Uses an internal
 * database name that is non-configurable.
 */
class IndexedDBAsyncMap<K extends IDBValidKey, V> {
  #store: UseStore;
  constructor(name: string) {
    this.#store = createStore(dbName, name);
  }

  async getSize(): Promise<number> {
    return (await dbKeys(this.#store)).length;
  }

  async get(key: K): Promise<V | undefined> {
    return await dbGet(key, this.#store);
  }

  async set(key: K, value: V): Promise<this> {
    await dbSet(key, value, this.#store);
    return this;
  }

  async has(key: K): Promise<boolean> {
    return !!(await this.get(key));
  }

  async delete(key: K): Promise<boolean> {
    await dbDelete(key, this.#store);
    return true;
  }

  async clear(): Promise<void> {
    await dbClear(this.#store);
  }

  async keys(): Promise<IterableIterator<K>> {
    const keys = await dbKeys(this.#store);
    // @ts-ignore
    return keys.values();
  }

  async values(): Promise<IterableIterator<V>> {
    const values = await dbValues(this.#store);
    // @ts-ignore
    return values.values();
  }

  async entries(): Promise<IterableIterator<[K, V]>> {
    const entries = await dbEntries(this.#store);
    // @ts-ignore
    return entries.values();
  }

}
