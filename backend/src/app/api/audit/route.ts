import { z } from "zod";

import { jsonResponse, optionsResponse } from "@/lib/http";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { generateRecommendationRuleBased } from "@/lib/recommendation";

const auditSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    businessName: z.string().trim().min(1).max(150),
    businessType: z.string().trim().min(1).max(100),
    contactChannel: z.string().trim().min(1).max(100),
    painPoint: z.string().trim().min(1).max(150),
    weeklyInquiries: z.string().trim().min(1).max(50),
    recommendedAutomation: z.string().trim().min(1).max(250),
    phone: z
      .string()
      .trim()
      .max(50)
      .refine((value) => !value || value.length >= 8, "Phone number is too short."),
    email: z.union([z.string().trim().email(), z.literal("")]),
    source: z.literal("NETA AI Website Automation Audit Assistant"),
    recaptchaToken: z.string().min(1),
  })
  .refine((data) => data.phone.length >= 8 || Boolean(data.email), {
    message: "A valid phone number or email is required.",
  });

export const runtime = "nodejs";
export const OPTIONS = optionsResponse;

export async function POST(request: Request) {
  try {
    const parsed = auditSchema.safeParse(await request.json());
    if (!parsed.success) return jsonResponse(request, { error: "Invalid audit request." }, 400);

    const { recaptchaToken, ...submittedPayload } = parsed.data;
    if (!(await verifyRecaptcha(recaptchaToken, "audit_submit"))) {
      return jsonResponse(request, { error: "reCAPTCHA verification failed." }, 403);
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) return jsonResponse(request, { error: "Audit service is not configured." }, 500);

    const payload = {
      ...submittedPayload,
      recommendedAutomation: generateRecommendationRuleBased(submittedPayload),
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });
    const result = (await webhookResponse.json().catch(() => ({}))) as Record<string, unknown>;
    if (!webhookResponse.ok || result.success === false) {
      return jsonResponse(request, { error: "Unable to submit the audit right now." }, 502);
    }

    return jsonResponse(request, {
      success: true,
      recommendedAutomation:
        typeof result.recommendedAutomation === "string"
          ? result.recommendedAutomation
          : payload.recommendedAutomation,
      summary: typeof result.summary === "string" ? result.summary : undefined,
      benefits: Array.isArray(result.benefits)
        ? result.benefits.filter((item): item is string => typeof item === "string").slice(0, 10)
        : undefined,
      message: typeof result.message === "string" ? result.message : undefined,
    });
  } catch (error) {
    console.error("Audit submission error:", error);
    return jsonResponse(request, { error: "Unable to submit the audit right now." }, 500);
  }
}
