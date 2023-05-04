import obtainALocalStorageBottleMap from "./obtainALocalStorageBottleMap";
import Storage from "./Storage";

let localStorageHolder: Storage | null | undefined;
const localStorageDescriptor = {
  /**
   * @see https://html.spec.whatwg.org/multipage/webstorage.html#dom-localstorage
   */
  get(): Storage {
    // The localStorage getter steps are:

    // 1. If this's associated Document's local storage holder is non-null, then return this's associated Document's local storage holder.
    if (localStorageHolder != null) {
      return localStorageHolder;
    }
    // This isn't the OFFICIAL way you're supposed to do things, but this will
    // work in all cases we care about. It's dependant on the current context
    // that this polyfill is executed in, which might as well be a new document
    // each time for all intents and purposes.

    // 2. Let map be the result of running obtain a local storage bottle map with this's relevant settings object and "localStorage".
    const map = obtainALocalStorageBottleMap(undefined, "localStorage");

    // 3. If map is failure, then throw a "SecurityError" DOMException.
    if (!map) {
      throw new DOMException("TODO: Add better error message", "localStorage");
    }

    // 4. Let storage be a new Storage object whose map is map.
    const storage = new Storage(map);

    // 5. Set this's associated Document's local storage holder to storage.
    localStorageHolder = storage;
    // This deviates from step #5 slightly because it's not tied to "the global
    // document" as defined by the specification, but instead just tied to the
    // current polyfill execution context. 🤷‍♀️

    // 6. Return storage.
    return storage;
  },
  enumerable: true,
  configurable: true,
};

export default localStorageDescriptor;
