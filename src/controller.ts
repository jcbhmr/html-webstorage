/**
 * This file is what manages the window-side of the polyfill. It manages the
 * synchronization of the storage events from the BroadcastChannel to apply them
 * to the actual native localStorage object. The first window to claim the lock
 * for a specific storage area will be the one to process the event.
 *
 * @file
 */

import type StorageMessageData from "./StorageMessageData";

const bc = new BroadcastChannel("jcbhmrhtmlwebstorageworker:storage");
bc.onmessage = ({ data }: MessageEvent & { data: StorageMessageData }) => {
  const { id, key, oldValue, newValue, url, storageAreaName } = data;
  const storageArea =
    storageAreaName === "localStorage"
      ? localStorage
      : storageAreaName === "sessionStorage"
      ? sessionStorage
      : null;

  navigator.locks.request(
    bc.name + ":" + id,
    { ifAvailable: true },
    async (lock) => {
      if (!lock) {
        return;
      }

      if (storageArea) {
        // setItem()
        if (oldValue == null) {
          storageArea.setItem(key, newValue);
        }
        // removeItem()
        else if (newValue == null) {
          storageArea.removeItem(key);
        }
        // clear()
        else if (oldValue == null && newValue == null) {
          storageArea.clear();
        }
      }

      globalThis.dispatchEvent(
        new StorageEvent("storage", {
          key,
          oldValue,
          newValue,
          url,
          storageArea,
        })
      );
    }
  );
};
