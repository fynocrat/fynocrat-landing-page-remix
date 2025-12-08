// app/routes/api/push/register.ts
import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

let lastToken: string | null = null;

export const action: ActionFunction = async ({ request }) => {
  try {
    const body = await request.json();
    const token = body?.token;
    if (!token) return json({ ok: false, error: "token required" }, { status: 400 });
    lastToken = token;
    console.log("Saved FCM token (local):", token);
    return json({ ok: true, token });
  } catch (err: any) {
    console.error("Error in /api/push/register:", err);
    return json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
};

export const loader = async () => json({ ok: true, token: lastToken });
