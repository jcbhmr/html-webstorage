/**
 * @see https://html.spec.whatwg.org/multipage/webstorage.html#storageeventinit
 */
interface StorageEventInit {
  key?: string | null;
  oldValue?: string | null;
  newValue?: string | null;
  url?: string;
  storageArea?: Storage | null;
}

export type { StorageEventInit as default };
