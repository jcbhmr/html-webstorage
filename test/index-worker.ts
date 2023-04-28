import "../src/index";

globalThis.addEventListener("message", ({ data }) => {
  if (data?.type === "test:eval") {
    const value = (0, eval)(data.code);
    globalThis.postMessage({ type: "test:return", value });
  }
});

// TODO: Write tests in worker context HERE.
