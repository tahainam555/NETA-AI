const LOCAL_URL = "http://localhost:3000";

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/^['"]|['"]$/g, "");
  if (!configured) return LOCAL_URL;

  const candidate = /^https?:\/\//i.test(configured) ? configured : `https://${configured}`;
  try {
    return new URL(candidate).origin;
  } catch {
    return LOCAL_URL;
  }
}
