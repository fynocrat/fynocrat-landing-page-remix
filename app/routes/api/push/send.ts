// app/routes/api/push/send.ts
import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { getAdmin } from "~/utils/firebaseAdmin.server";

export const action: ActionFunction = async ({ request }) => {
  try {
    const body = (await request.json().catch(() => ({}))) as any;
    // allow token to be provided in body, otherwise try to get last token from register endpoint
    let token = body.token;
    if (!token) {
      const origin = new URL(request.url).origin;
      const res = await fetch(`${origin}/api/push/register`);
      if (res.ok) {
        const data = await res.json();
        token = data?.token;
      }
    }

    if (!token) {
      return json({ ok: false, error: "token required (no token in body and no saved token)" }, { status: 400 });
    }

    const admin = getAdmin();

    // do not use admin.messaging.Message type here to avoid TS namespace issue
    const message: any = {
      token,
      notification: {
        title: body.title || "Test notification",
        body: body.body || "This is a test push",
      },
      webpush: {
        fcmOptions: { link: body.url || "http://localhost:5173" },
      },
      data: body.data || {},
    };

    const resp = await admin.messaging().send(message);
    return json({ ok: true, resp });
  } catch (err: any) {
    console.error("Error in /api/push/send:", err);
    return json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
};
