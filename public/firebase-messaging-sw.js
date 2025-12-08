// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/12.6.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.6.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAaFAnHQ2IrtGQXz7xA-EptF6E7fVCobJs",
  authDomain: "fynocrat-4d567.firebaseapp.com",
  projectId: "fynocrat-4d567",
  storageBucket: "fynocrat-4d567.firebasestorage.app",
  messagingSenderId: "126550296370",
  appId: "1:126550296370:web:d4f3da4e7479c85328792b",
  measurementId: "G-DNW4K3L13W",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Background message";
  const options = {
    body: payload.notification?.body || "",
    icon: "/logo.png",
    data: { click_action: payload.data?.url || payload.notification?.click_action, ...payload.data },
  };
  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  const target = event.notification?.data?.click_action;
  event.notification.close();
  if (target) event.waitUntil(clients.openWindow(target));
});