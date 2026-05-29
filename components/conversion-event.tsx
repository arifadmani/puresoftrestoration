"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Fires a GA4 `generate_lead` conversion event once on mount.
 *
 * Mount this on the post-submit confirmation page (/contact/submitted) so
 * the event corresponds 1:1 to successful intake submissions. GA4's
 * recommended event for lead capture is `generate_lead` — surfaces in
 * Reports → Engagement → Conversions automatically.
 *
 * `sendGAEvent` is a no-op if the `gtag` global isn't loaded (i.e. the
 * Measurement ID env var isn't set), so this is safe to render
 * unconditionally.
 */
export function GenerateLeadEvent() {
  useEffect(() => {
    sendGAEvent("event", "generate_lead", {
      currency: "USD",
      value: 1,
      event_category: "intake",
      event_label: "contact-form",
    });
  }, []);

  return null;
}
