// Contact form and newsletter sign-ups go straight from the visitor's browser
// to the ERP's public endpoint (not through this site's server), because the
// ERP rate-limits by the visitor's IP. No auth, no Supabase here.

/** Full URL of the ERP endpoint, e.g. https://erp.example.com/api/public/web-leads */
const endpoint = process.env.NEXT_PUBLIC_WEB_LEADS_URL;

/** Version of the privacy-policy wording the visitor agreed to; bump when it changes. */
export const CONSENT_TEXT_VERSION = "2026-09";

export type LeadPayload =
  | {
      kind: "contact";
      name: string;
      phone: string;
      email: string;
      company: string;
      storeLocation: string;
      storeCondition: string;
      storeType: string;
    }
  | { kind: "newsletter"; email: string };

export type LeadResult = { ok: true } | { ok: false; message: string };

const genericError = "Something went wrong. Please try again.";

function utmParams() {
  const utm: Record<string, string> = {};
  new URLSearchParams(window.location.search).forEach((value, key) => {
    if (key.startsWith("utm_") && value) utm[key] = value.slice(0, 200);
  });
  return utm;
}

/** Sends one lead. `honeypot` is the value of the hidden trap input (bots fill it). */
export async function submitLead(payload: LeadPayload, honeypot: string): Promise<LeadResult> {
  if (!endpoint) {
    console.error("Lead form: NEXT_PUBLIC_WEB_LEADS_URL is not set (restart the dev server after adding it to .env.local).");
    return { ok: false, message: genericError };
  }

  const utm = utmParams();
  const body = {
    ...payload,
    consentAccepted: true,
    consentTextVersion: CONSENT_TEXT_VERSION,
    honeypot,
    sourcePage: window.location.pathname,
    ...(Object.keys(utm).length ? { utm } : {}),
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.status === 201) {
      // Lets Google Tag Manager / Analytics count the conversion (a trigger on this event name).
      const dataLayer = ((window as unknown as { dataLayer?: unknown[] }).dataLayer ??= []);
      dataLayer.push({ event: "lead_submitted", lead_kind: payload.kind, source_page: window.location.pathname });
      return { ok: true };
    }
    if (response.status === 429) return { ok: false, message: "Too many attempts. Please try again in a little while." };
    if (response.status === 400) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      return { ok: false, message: data?.error || "Please check the form and try again." };
    }
    console.error(`Lead form: the ERP endpoint answered ${response.status}.`);
    return { ok: false, message: genericError };
  } catch (error) {
    // Usually CORS (the ERP must allow this origin) or the endpoint being unreachable.
    console.error("Lead form: request to the ERP endpoint failed.", error);
    return { ok: false, message: genericError };
  }
}
