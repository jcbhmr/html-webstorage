import "@jcbhmr/html-webstorage.worker";

const registerSWButton = document.getElementById(
  "register-sw"
)! as HTMLButtonElement;
const unregisterSWButton = document.getElementById(
  "unregister-sw"
)! as HTMLButtonElement;
const setLocalStorageButton = document.getElementById(
  "set-localstorage"
)! as HTMLButtonElement;
const clearLocalStorageButton = document.getElementById(
  "clear-localstorage"
)! as HTMLButtonElement;
const fetchJSONButton = document.getElementById(
  "fetch-json"
)! as HTMLButtonElement;
const fetchOutput = document.getElementById(
  "fetch-output"
)! as HTMLOutputElement;

registerSWButton.addEventListener("click", async () => {
  // https://vite-pwa-org.netlify.app/guide/service-worker-without-pwa-capabilities.html#registering-of-the-service-worker-in-your-app
  navigator.serviceWorker.register(
    // @ts-ignore
    import.meta.env.PROD ? "/service-worker.js" : "/dev-sw.js?dev-sw",
    // @ts-ignore
    { type: import.meta.env.PROD ? "classic" : "module" }
  );
});

unregisterSWButton.addEventListener("click", async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  for (const registration of registrations) {
    registration.unregister();
  }
});

setLocalStorageButton.addEventListener("click", () => {
  localStorage.setItem("foo", "bar");
});

clearLocalStorageButton.addEventListener("click", () => {
  localStorage.clear();
});

fetchJSONButton.addEventListener("click", async () => {
  const response = await fetch("test.json");
  const json = await response.json();
  fetchOutput.textContent = JSON.stringify(json, null, 2);
});
