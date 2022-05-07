import crypto from "crypto";

export function randomString() {
  return crypto.randomBytes(4).toString("hex");
}
