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

    await sendContactEmail(parsed.data);

    return jsonResponse(request, { ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse(request, { error: "Unable to send message." }, 500);
  }
}
