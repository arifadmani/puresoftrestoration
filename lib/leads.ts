import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

/**
 * Durable, append-only record of every valid intake — written to disk BEFORE
 * we rely on email. A lead should never be lost to an SES hiccup, a bounce,
 * or a notification that quietly lands in a spam folder. The log lives outside
 * the timestamped release directories (see LEADS_LOG_PATH) so it survives
 * deploys. Export it any time with:  cat /var/www/puresoft/leads/leads.jsonl
 */
const LEADS_PATH =
  process.env.LEADS_LOG_PATH ?? "/var/www/puresoft/leads/leads.jsonl";

type IntakeFields = {
  role: string;
  name: string;
  email: string;
  phone: string;
  lossType: string;
  carrierAndClaim: string;
  lossAddress: string;
  notes: string;
};

type LeadMeta = {
  submittedAt: string;
  remoteIp?: string | null;
  userAgent?: string | null;
  emailStatus: "sent" | "failed";
  messageId?: string;
};

/**
 * Append one JSON line for this submission. Never throws — persistence must
 * not break the submission path. On failure it logs so the miss is visible in
 * `journalctl -u puresoft`.
 */
export async function persistLead(
  fields: IntakeFields,
  meta: LeadMeta
): Promise<void> {
  try {
    await mkdir(dirname(LEADS_PATH), { recursive: true });
    const line = JSON.stringify({ ...meta, ...fields }) + "\n";
    await appendFile(LEADS_PATH, line, "utf8");
  } catch (err) {
    console.error("[intake] lead persistence failed", err);
  }
}
