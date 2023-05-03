const backingMap = new Map();
const map = new StorageProxyMap(backingMap);
const localStorage = new Storage(map, "local");

export default localStorage;
