import "server-only";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
  action?: string;
  cdata?: string;
};

export async function verifyTurnstile(
  token: string | null | undefined,
  remoteip?: string | null
): Promise<{ ok: boolean; errors?: string[] }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return { ok: false, errors: ["server-not-configured"] };
  }
  if (!token) {
    return { ok: false, errors: ["missing-token"] };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteip) body.set("remoteip", remoteip);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      cache: "no-store",
    });
    if (!res.ok) {
      return { ok: false, errors: [`http-${res.status}`] };
    }
    const data = (await res.json()) as TurnstileResponse;
    if (data.success) return { ok: true };
    return { ok: false, errors: data["error-codes"] ?? ["unknown"] };
  } catch (err) {
    return {
      ok: false,
      errors: [
        err instanceof Error ? `fetch-error:${err.message}` : "fetch-error",
      ],
    };
  }
}

export const TURNSTILE_SITE_KEY = process.env.TURNSTILE_SITE_KEY ?? "";
