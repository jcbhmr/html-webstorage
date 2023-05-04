interface StorageMessageData {
  id: string;
  key: string | null;
  oldValue: string | null;
  newValue: string | null;
  url: string;
  storageAreaName: "localStorage" | "sessionStorage" | null;
}

export type { StorageMessageData as default };
