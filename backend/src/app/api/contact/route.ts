import { contactApiSchema } from "@/lib/contact-schema";
import { jsonResponse, optionsResponse } from "@/lib/http";
import { sendContactEmail } from "@/lib/resend";

export const runtime = "nodejs";
export const OPTIONS = optionsResponse;

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (payload?.website) {
      return jsonResponse(request, { ok: true });
    }

    const parsed = contactApiSchema.safeParse(payload);

    if (!parsed.success) {
      return jsonResponse(request, { error: "Invalid request payload." }, 400);
    }

    const { recaptchaToken, ...data } = parsed.data;
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    if (!secret) {
      return jsonResponse(request, { error: "Missing reCAPTCHA secret." }, 500);
    }

    const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: recaptchaToken,
      }),
    });

    const verifyData = (await verifyResponse.json()) as {
      success: boolean;
      score?: number;
      action?: string;
    };

    if (!verifyData.success || (verifyData.score ?? 0) < 0.5) {
      return jsonResponse(request, { error: "reCAPTCHA verification failed." }, 403);
    }

    if (verifyData.action && verifyData.action !== "contact_submit") {
      return jsonResponse(request, { error: "Invalid reCAPTCHA action." }, 403);
    }

    await sendContactEmail({ ...data, recaptchaToken });

    return jsonResponse(request, { ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse(request, { error: "Unable to send message." }, 500);
  }
}
