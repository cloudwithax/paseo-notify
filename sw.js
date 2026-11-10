// Paseo Notifications service worker: shows pushes from the native-push daemon plugin.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch { data = { body: event.data && event.data.text() }; }
  event.waitUntil(
    self.registration.showNotification(data.title || "Paseo", {
      body: data.body || "",
      tag: data.tag || undefined,
      renotify: true,
      icon: "icon-192.png",
      data: { url: data.url || "paseo://" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "paseo://";
  // Web apps cannot open another app's URL scheme directly; hand off through a page.
  event.waitUntil(self.clients.openWindow("open.html?to=" + encodeURIComponent(target)));
});
