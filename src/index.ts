if (typeof document !== "undefined") {
  await import("./controller");
} else if (typeof Storage === "undefined") {
  await import("./polyfill");
}

export {};
