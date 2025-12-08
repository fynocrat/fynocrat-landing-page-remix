// app/lib/firebaseClient.ts
// Browser-safe Firebase helpers for FCM. Lazy-loads firebase/messaging so SSR won't break.

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const VAPID_STORAGE_KEY = "fcm:last-vapid";

export async function getFcmToken(vapidKey: string): Promise<string | null> {
  if (typeof window === "undefined") return null;

  const cleanVapid = vapidKey?.trim();
  if (!cleanVapid || cleanVapid.length < 80) {
    console.error("Missing or invalid VAPID key. Check VITE_FIREBASE_VAPID_KEY in .env");
    return null;
  }
  console.log("Using VAPID key (len):", cleanVapid.length);

  // Guard unsupported browsers
  const { isSupported } = await import("firebase/messaging");
  const supported = await isSupported().catch(() => false);
  console.log("Messaging supported:", supported);
  if (!supported) return null;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("Notifications not granted:", permission);
    return null;
  }

  try {
    // quick check: can we fetch the SW at root?
    try {
      const swResp = await fetch("/firebase-messaging-sw.js", { cache: "no-store" });
      console.log("SW fetch status:", swResp.status);
    } catch (e) {
      console.warn("Could not fetch /firebase-messaging-sw.js", e);
    }

    // register or get registration for the SW
    let registration: ServiceWorkerRegistration | null = null;
    const regs = await navigator.serviceWorker.getRegistrations();
    if (regs.length) console.log("Existing SW registrations:", regs.map((r) => r.scope));

    registration = (await navigator.serviceWorker.getRegistration("/")) ?? null;
    if (!registration) {
      console.log("No existing SW — registering /firebase-messaging-sw.js at /");
      registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      console.log("SW registered:", registration.scope);
    } else {
      console.log("SW registration found:", registration.scope);
    }

    // wait until a worker is active and controlling the page
    const readyReg = await navigator.serviceWorker.ready;
    console.log("Service worker ready");
    registration = readyReg ?? registration;

    // lazy import to avoid SSR issues
    const firebaseApp = await import("firebase/app");
    const { initializeApp, getApps } = firebaseApp;
    const app =
      typeof getApps === "function" && getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

    const messagingPkg = await import("firebase/messaging");
    const { getMessaging, getToken } = messagingPkg;
    const messaging = getMessaging(app as any);

    // drop any existing push subscription (stale subs can cause AbortError)
    try {
      const sub = await registration.pushManager.getSubscription();
      if (sub) {
        console.log("Unsubscribing existing push subscription before requesting new token");
        await sub.unsubscribe();
      }
      localStorage.setItem(VAPID_STORAGE_KEY, cleanVapid);
    } catch (e) {
      console.warn("Unable to inspect/unsubscribe push subscription", e);
    }

    const token = await getToken(messaging, {
      vapidKey: cleanVapid,
      serviceWorkerRegistration: registration ?? undefined,
    });
    console.log("FCM token:", !!token);
    if (token) {
      try {
        localStorage.setItem(VAPID_STORAGE_KEY, cleanVapid);
      } catch {
        /* ignore */
      }
    }
    return token || null;
  } catch (err: any) {
    console.error("getFcmToken error:", err);
    return null;
  }
}

export async function onForegroundMessage(cb: (payload: any) => void) {
  if (typeof window === "undefined") return;
  try {
    const firebaseApp = await import('firebase/app');
    const { initializeApp, getApps } = firebaseApp;
    const app = typeof getApps === 'function' && getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    const { getMessaging, onMessage } = await import('firebase/messaging');
    const messaging = getMessaging(app as any);
    onMessage(messaging, (payload) => cb(payload));
  } catch (err) {
    console.error('onForegroundMessage error:', err);
  }
}

// alias for older code
export const requestPushPermissionAndGetToken = getFcmToken;
