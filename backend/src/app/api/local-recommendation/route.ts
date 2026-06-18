import { z } from "zod";

import { jsonResponse, optionsResponse } from "@/lib/http";
import { generateRecommendation } from "@/lib/recommendation";

const answersSchema = z.object({
  businessType: z.string().min(1),
  contactChannel: z.string().min(1),
  painPoint: z.string().min(1),
  weeklyInquiries: z.string().min(1),
});

export const OPTIONS = optionsResponse;

export async function POST(request: Request) {
  try {
    const parsed = answersSchema.safeParse(await request.json());
    if (!parsed.success) return jsonResponse(request, { error: "Invalid audit answers." }, 400);
    const recommendedAutomation = await generateRecommendation(parsed.data);
    return jsonResponse(request, { success: true, recommendedAutomation });
  } catch (error) {
    console.error("Recommendation error:", error);
    return jsonResponse(request, { error: "Unable to generate a recommendation." }, 500);
  }
}
