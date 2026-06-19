type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
};

export async function verifyRecaptcha(token: string, expectedAction: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) throw new Error("Missing RECAPTCHA_SECRET_KEY");

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  if (!response.ok) return false;

  const result = (await response.json()) as RecaptchaResponse;
  return (
    result.success &&
    (result.score ?? 0) >= 0.5 &&
    (!result.action || result.action === expectedAction)
  );
}
