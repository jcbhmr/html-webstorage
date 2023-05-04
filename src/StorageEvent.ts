export default class StorageEvent extends Event {
  #key: string | null;
  #oldValue: string | null;
  #newValue: string | null;
  #url: string;
  #storageArea: Storage | null;
  constructor(type: string, eventInitDict: StorageEventInit = {}) {
    type = "" + type;
    const {
      key = null,
      oldValue = null,
      newValue = null,
      url = "",
      storageArea = null,
    } = eventInitDict;

    super(type, eventInitDict);

    this.#key = key;
    this.#oldValue = oldValue;
    this.#newValue = newValue;
    this.#url = url;
    this.#storageArea = storageArea;
  }

  get key(): string | null {
    return this.#key;
  }

  get oldValue(): string | null {
    return this.#oldValue;
  }

  get newValue(): string | null {
    return this.#newValue;
  }

  get url(): string {
    return this.#url;
  }

  get storageArea(): Storage | null {
    return this.#storageArea;
  }

  initStorageEvent() {
    throw new DOMException("TODO: Implement this", "NotSupportedError");
  }
}
