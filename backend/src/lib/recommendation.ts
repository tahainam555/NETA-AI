export type AuditAnswers = {
  businessType: string;
  contactChannel: string;
  painPoint: string;
  weeklyInquiries: string;
};

const businessRecommendations: Record<string, string> = {
  "Real Estate": "WhatsApp Lead Qualification + Property Inquiry Automation",
  "Clinic / Healthcare": "Appointment Booking + Patient Reminder Automation",
  "E-commerce": "AI Customer Support + Order Inquiry Automation",
  "Restaurant / Cafe": "Reservation + Menu Inquiry Automation",
  "Education Institute": "Admission Inquiry + Follow-up Automation",
  Agency: "Lead Capture + CRM Follow-up Automation",
};

export function generateRecommendationRuleBased(answers: AuditAnswers) {
  if (businessRecommendations[answers.businessType]) return businessRecommendations[answers.businessType];
  const painPoint = answers.painPoint.toLowerCase();
  if (painPoint.includes("follow") || painPoint.includes("lead")) return "Lead Capture + Instant Follow-up Automation";
  if (painPoint.includes("appointment") || painPoint.includes("booking")) return "Appointment Booking Automation";
  if (answers.contactChannel === "WhatsApp") return "WhatsApp Inquiry + Follow-up Automation";
  return "Custom Business Workflow Automation";
}

export async function generateRecommendationWithOllama(answers: AuditAnswers) {
  const baseUrl = process.env.OLLAMA_BASE_URL?.replace(/\/$/, "");
  if (!baseUrl) throw new Error("OLLAMA_BASE_URL is not configured");

  const response = await fetch(`${baseUrl}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OLLAMA_MODEL || "llama3.2",
      stream: false,
      prompt: `Return only one concise business automation recommendation (no explanation) for: ${JSON.stringify(answers)}`,
    }),
  });
  if (!response.ok) throw new Error("Ollama request failed");
  const data = (await response.json()) as { response?: string };
  if (!data.response?.trim()) throw new Error("Ollama returned an empty recommendation");
  return data.response.trim();
}

export async function generateRecommendation(answers: AuditAnswers) {
  if (process.env.OLLAMA_ENABLED === "true" && process.env.OLLAMA_BASE_URL) {
    try {
      return await generateRecommendationWithOllama(answers);
    } catch (error) {
      console.warn("Ollama unavailable; using rule-based recommendation.", error);
    }
  }
  return generateRecommendationRuleBased(answers);
}
