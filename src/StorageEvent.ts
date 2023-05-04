export default class StorageEvent extends Event {
  readonly key: string | null;
  readonly oldValue: string | null;
  readonly newValue: string | null;
  readonly url: string;
  readonly storageArea: Storage | null;
  constructor(type: string, eventInitDict: StorageEventInit = {}) {
    type = "" + type;
    const {
      key = null,
      oldValue = null,
      newValue = null,
      url = "",
      storageArea = null,
    } = eventInitDict;

    this.key = key;
    this.oldValue = oldValue;
    this.newValue = newValue;
    this.url = url;
    this.storageArea = storageArea;
  }

  initStorageEvent() {
    throw new DOMException();
  }
}
