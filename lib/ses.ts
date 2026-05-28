import "server-only";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const region = process.env.AWS_REGION ?? "us-east-2";

const client = new SESv2Client({ region });

const FROM =
  process.env.SES_FROM_ADDRESS ?? "noreply@puresoftrestoration.com";
const REPLY_TO =
  process.env.SES_REPLY_TO ?? "admin@puresoftrestoration.com";
const NOTIFY_TO =
  process.env.SES_CLAIM_NOTIFICATION_TO ?? "admin@puresoftrestoration.com";

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

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return c;
    }
  });
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr><td style="padding:6px 14px 6px 0;color:#6A6356;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-family:Hanken Grotesk,Arial,sans-serif;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#1A1813;font-size:14.5px;font-family:Hanken Grotesk,Arial,sans-serif;">${escapeHtml(value)}</td></tr>`;
}

export async function sendIntakeNotification(fields: IntakeFields): Promise<string> {
  const subjectLine = `[Pure Soft intake] ${fields.lossType || "New loss"} — ${fields.name || "unknown sender"}`;

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#F6F2E9;font-family:Hanken Grotesk,Arial,sans-serif;color:#1A1813;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F2E9;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#FBF8F1;border:1px solid #DAD1BF;">
        <tr><td style="padding:28px 32px 8px 32px;">
          <div style="font-family:Newsreader,Georgia,serif;font-size:24px;letter-spacing:-0.01em;color:#1A1813;">Pure Soft Restoration</div>
          <div style="font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:#938B7B;font-weight:600;margin-top:4px;">New intake submission</div>
        </td></tr>
        <tr><td style="padding:8px 32px 28px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:8px;">
            ${row("Role", fields.role)}
            ${row("Name", fields.name)}
            ${row("Email", fields.email)}
            ${row("Phone", fields.phone)}
            ${row("Loss type", fields.lossType)}
            ${row("Carrier / claim", fields.carrierAndClaim)}
            ${row("Address", fields.lossAddress)}
          </table>
          ${
            fields.notes
              ? `<div style="margin-top:20px;padding:16px;background:#F6F2E9;border-left:2px solid #7A2E2E;"><div style="font-size:11.5px;letter-spacing:0.16em;text-transform:uppercase;color:#6A6356;font-weight:600;margin-bottom:8px;">Notes</div><div style="font-size:14.5px;color:#3C372E;line-height:1.6;white-space:pre-wrap;">${escapeHtml(fields.notes)}</div></div>`
              : ""
          }
          <div style="margin-top:24px;padding-top:18px;border-top:1px solid #DAD1BF;font-size:12px;color:#938B7B;letter-spacing:0.04em;">Submitted via puresoftrestoration.com</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    "Pure Soft Restoration — new intake submission",
    "",
    `Role:            ${fields.role}`,
    `Name:            ${fields.name}`,
    `Email:           ${fields.email}`,
    `Phone:           ${fields.phone}`,
    `Loss type:       ${fields.lossType}`,
    `Carrier/claim:   ${fields.carrierAndClaim}`,
    `Address:         ${fields.lossAddress}`,
    "",
    fields.notes ? `Notes:\n${fields.notes}\n` : "",
    "—",
    "Submitted via puresoftrestoration.com",
  ].join("\n");

  const command = new SendEmailCommand({
    FromEmailAddress: FROM,
    Destination: { ToAddresses: [NOTIFY_TO] },
    ReplyToAddresses: [fields.email || REPLY_TO],
    Content: {
      Simple: {
        Subject: { Data: subjectLine, Charset: "UTF-8" },
        Body: {
          Html: { Data: html, Charset: "UTF-8" },
          Text: { Data: text, Charset: "UTF-8" },
        },
      },
    },
  });

  const response = await client.send(command);
  return response.MessageId ?? "";
}
