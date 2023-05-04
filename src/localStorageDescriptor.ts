import Storage from "./Storage";

let localStorageCache: Storage | null | undefined;
const localStorageDescriptor = {
  /** @see https://html.spec.whatwg.org/multipage/webstorage.html#dom-localstorage */
  get(): Storage {
    localStorageCache ??= new Storage("localStorage");
    return localStorageCache!;
  },
  enumerable: true,
  configurable: true,
};

export default localStorageDescriptor;
