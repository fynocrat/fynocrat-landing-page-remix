import React, { type JSX } from "react";
import { getFcmToken, onForegroundMessage } from "~/lib/firebaseClient";

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export default function EnableNotifications(): JSX.Element {
  async function enable() {
    const token = await getFcmToken(VAPID_KEY);
    if (!token) {
      alert("Could not get token — check console for errors.");
      return;
    }
    console.log("FCM token:", token);
    // Optionally POST to your backend to store the token
  }

  React.useEffect(() => {
    onForegroundMessage((payload: any) => {
      console.log("Foreground message:", payload);
    });
  }, []);

  return (
    <button
      onClick={enable}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Enable Notifications
    </button>
  );
}