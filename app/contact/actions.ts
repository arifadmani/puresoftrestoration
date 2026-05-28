"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sendIntakeNotification } from "@/lib/ses";
import { verifyTurnstile } from "@/lib/turnstile";

const IntakeSchema = z.object({
  role: z.string().min(1, "Required").max(80),
  name: z.string().min(2, "Required").max(120),
  email: z.string().email("Valid email required").max(160),
  phone: z.string().min(7, "Required").max(40),
  lossType: z.string().min(1, "Required").max(60),
  carrierAndClaim: z.string().max(200).optional().default(""),
  lossAddress: z.string().max(240).optional().default(""),
  notes: z.string().max(2000).optional().default(""),
  // Honeypot field — should be empty.
  website: z.string().max(0).optional().default(""),
});

export type IntakeResult = {
  ok: boolean;
  fieldErrors?: Partial<Record<keyof z.infer<typeof IntakeSchema>, string>>;
  formError?: string;
};

export async function submitIntake(
  _prev: IntakeResult | null,
  formData: FormData
): Promise<IntakeResult> {
  const raw = {
    role: String(formData.get("role") ?? ""),
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    lossType: String(formData.get("lossType") ?? ""),
    carrierAndClaim: String(formData.get("carrierAndClaim") ?? ""),
    lossAddress: String(formData.get("lossAddress") ?? ""),
    notes: String(formData.get("notes") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  // Honeypot trip — silently accept and discard
  if (raw.website) {
    redirect("/contact/submitted");
  }

  const parsed = IntakeSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: IntakeResult["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        (fieldErrors as Record<string, string>)[key] = issue.message;
      }
    }
    return { ok: false, fieldErrors };
  }

  const fields = parsed.data;
  const turnstileToken = String(
    formData.get("cf-turnstile-response") ?? ""
  );

  // Turnstile verification only enforced if a server-side secret is configured.
  if (process.env.TURNSTILE_SECRET_KEY) {
    const hdrs = await headers();
    const remoteip =
      hdrs.get("cf-connecting-ip") ??
      hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      null;

    const verify = await verifyTurnstile(turnstileToken, remoteip);
    if (!verify.ok) {
      return {
        ok: false,
        formError:
          "We couldn't verify the bot-protection challenge. Please refresh and try again, or call the response line.",
      };
    }
  }

  try {
    await sendIntakeNotification(fields);
  } catch (err) {
    console.error("[intake] SES send failed", err);
    return {
      ok: false,
      formError:
        "Submission accepted, but we hit a temporary delivery error. Please call the response line.",
    };
  }

  redirect("/contact/submitted");
}
