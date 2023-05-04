import "@jcbhmr/html-webstorage.worker";

console.log(localStorage);

globalThis.addEventListener("storage", (event) => {
  console.log(event);
});

globalThis.addEventListener("fetch", (event: any) => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.pathname.endsWith("/test.json")) {
    event.respondWith(new Response(JSON.stringify(localStorage)));
  }
});
