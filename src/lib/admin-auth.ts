import crypto from "crypto";

export function verifySessionToken(token: string): boolean {
  const secret = process.env.ADMIN_SESSION_SECRET!;
  const [timestamp, hash] = token.split(".");
  if (!timestamp || !hash) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(timestamp)
    .digest("hex");
  return hash === expected;
}
