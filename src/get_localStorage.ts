let localStorageHolder: Storage | null | undefined;

function get_localStorage(): Storage {
  // The localStorage getter steps are:

  // 1. If this's associated Document's local storage holder is non-null, then return this's associated Document's local storage holder.
  if (localStorageHolder != null) {
    return localStorageHolder;
  }

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

  // 6. Return storage.
  return storage;
}

export default get_localStorage;
