if (typeof document !== "undefined") {
  await import("./")
}

if (typeof localStorage === "undefined") {
  await import("./polyfill");
}

export {};
