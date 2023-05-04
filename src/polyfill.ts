import Storage from "./Storage";
import StorageEvent from "./StorageEvent";
import StorageEventInit from "./StorageEventInit";
import localStorageDescriptor from "./localStorageDescriptor";
import sessionStorageDescriptor from "./sessionStorageDescriptor";

type StorageT = typeof Storage;
type StorageEventT = typeof StorageEvent;
type StorageEventInit_ = StorageEventInit;
declare global {
  var Storage: StorageT;
  var StorageEvent: StorageEventT;
  type StorageEventInit = StorageEventInit_;
  var localStorage: Storage;
  var sessionStorage: Storage;
}

globalThis.Storage = Storage;
globalThis.StorageEvent = StorageEvent;
Object.defineProperty(globalThis, "localStorage", localStorageDescriptor);
Object.defineProperty(globalThis, "sessionStorage", sessionStorageDescriptor);
