export type AuditAnswers = {
  businessType: string;
  contactChannel: string;
  painPoint: string;
  weeklyInquiries: string;
};

export type AuditLead = AuditAnswers & {
  name: string;
  businessName: string;
  recommendedAutomation: string;
  phone: string;
  email: string;
  source: "NETA AI Website Automation Audit Assistant";
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
  if (painPoint.includes("follow") || painPoint.includes("lead")) {
    return "Lead Capture + Instant Follow-up Automation";
  }
  if (painPoint.includes("appointment") || painPoint.includes("booking")) {
    return "Appointment Booking Automation";
  }
  if (answers.contactChannel === "WhatsApp") return "WhatsApp Inquiry + Follow-up Automation";
  return "Custom Business Workflow Automation";
}

// Kept as the single entry point so a local Ollama provider can be introduced later.
export async function generateRecommendation(answers: AuditAnswers) {
  return generateRecommendationRuleBased(answers);
}

export type N8nAuditResponse = {
  success: boolean;
  recommendedAutomation?: string;
  summary?: string;
  benefits?: string[];
  message?: string;
};

export function validateAuditContact(lead: Pick<AuditLead, "name" | "businessName" | "phone" | "email">) {
  if (!lead.name.trim()) return "Please enter your name.";
  if (!lead.businessName.trim()) return "Please enter your business name.";
  if (!lead.phone.trim() && !lead.email.trim()) return "Please provide a WhatsApp number or email.";
  if (lead.phone.trim() && lead.phone.trim().length < 8) return "The WhatsApp number must be at least 8 characters.";
  if (lead.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim())) return "Please enter a valid email address.";
  return "";
}

export async function submitAuditToN8n(payload: AuditLead): Promise<N8nAuditResponse> {
  // The backend owns the private n8n webhook URL and forwards validated submissions.
  const response = await fetch(apiUrl("/api/audit"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json().catch(() => ({}))) as Partial<N8nAuditResponse>;
  if (!response.ok || data.success === false) {
    throw new Error(data.message || "We couldn't submit your audit. Please try again.");
  }
  return { success: true, ...data };
}
import { apiUrl } from "@/lib/api";
