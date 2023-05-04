const backingMap = new WeakMap<StorageProxyMap, Map>();

class StorageProxyMap<K, V> implements Map<K, V> {
  constructor(map: Map) {
    backingMap.set(this, map);
  }

  get(key: K): V | undefined {
    return backingMap.get(this)!.get(key);
  }
  has(key: K): boolean {
    return backingMap.get(this)!.has(key);
  }
  get size(): number {
    return backingMap.get(this)!.size;
  }

  set(key: K, value: V): this {
    backingMap.get(this)!.set(key, value);
    return this;
  }
  delete(key: K): boolean {
    return backingMap.get(this)!.delete(key);
  }
  clear(): void {
    backingMap.get(this)!.clear();
  }

  keys(): IterableIterator<K> {
    return backingMap.get(this)!.keys();
  }
  values(): IterableIterator<V> {
    return backingMap.get(this)!.keys();
  }
  entries(): IterableIterator<[K, V]> {
    return backingMap.get(this)!.entries();
  }
  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
      
  }
}
