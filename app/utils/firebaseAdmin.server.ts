// app/utils/firebaseAdmin.server.ts
import fs from "fs";
import path from "path";
import admin from "firebase-admin";

const SERVICE_ACCOUNT_PATH = path.resolve(process.cwd(), "serviceAccountKey.json");

let _initialized = false;

/**
 * Returns an initialized firebase-admin instance.
 * Throws if serviceAccountKey.json is missing.
 */
export function getAdmin(): typeof admin {
  if (_initialized && admin.apps.length) return admin;

  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    throw new Error(
      `serviceAccountKey.json not found at project root (${SERVICE_ACCOUNT_PATH}). ` +
      `Download it from Firebase Console -> Project settings -> Service accounts -> Generate new private key.`
    );
  }

  const raw = fs.readFileSync(SERVICE_ACCOUNT_PATH, "utf8");
  const serviceAccount = JSON.parse(raw);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  _initialized = true;
  return admin;
}
