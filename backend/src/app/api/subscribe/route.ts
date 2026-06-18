import { z } from "zod";
import { Resend } from "resend";

import { jsonResponse, optionsResponse } from "@/lib/http";

export const OPTIONS = optionsResponse;

const subscribeSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = subscribeSchema.safeParse(payload);

    if (!parsed.success) {
      return jsonResponse(request, { error: "Invalid email" }, 400);
    }

    const resendToken = process.env.RESEND_SERVER_TOKEN;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!resendToken || !fromEmail || !toEmail) {
      return jsonResponse(request, { error: "Server configuration error" }, 500);
    }

    const resend = new Resend(resendToken);

    // This emails the site owner that someone subscribed
    const { error: notifyError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: "New Newsletter Subscriber",
      html: `<p>You have a new subscriber for NETA AI insights: <strong>${parsed.data.email}</strong></p>`,
    });

    if (notifyError) {
      throw notifyError;
    }

    // Optional: Send a welcome email to the subscriber
    const { error: welcomeError } = await resend.emails.send({
      from: fromEmail, // Needs to be a verified domain in Resend
      to: [parsed.data.email],
      subject: "Welcome to NETA AI Insights",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to NETA AI</h2>
          <p>Thanks for subscribing to our insights. You'll receive our latest research and updates on enterprise AI automation.</p>
        </div>
      `,
    });

    if (welcomeError) {
      console.warn("Failed to send welcome email to subscriber:", welcomeError);
      // We don't fail the request here, as we already got their info
    }

    return jsonResponse(request, { ok: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return jsonResponse(request, { error: "Failed to subscribe" }, 500);
  }
}
