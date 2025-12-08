// app/routes/api.save-fcm-token.ts
import { json } from "@remix-run/node";

let savedTokens: string[] = []; // dev only, in-memory

export const action = async ({ request }: { request: Request }) => {
  try {
    const body = await request.json();
    const token = body?.token;
    if (!token) return json({ ok: false, error: "no token" }, { status: 400 });

    if (!savedTokens.includes(token)) savedTokens.push(token);
    console.log("[save-fcm-token] saved tokens:", savedTokens);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: "server error" }, { status: 500 });
  }
};

export const loader = async () => {
  // allow GET to view saved tokens (dev convenience)
  return json({ tokens: savedTokens });
};
