"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, CheckCircle2, Loader2, MessageCircle, RefreshCw, Send, X } from "lucide-react";

import {
  generateRecommendation,
  submitAuditToN8n,
  validateAuditContact,
  type AuditAnswers,
} from "@/lib/automation-audit";

type Step = "businessType" | "contactChannel" | "painPoint" | "weeklyInquiries" | "consent" | "details" | "declined" | "success";
type Message = { id: number; sender: "bot" | "user"; text: string };

const questions: Record<Exclude<Step, "consent" | "details" | "declined" | "success">, { text: string; options: string[] }> = {
  businessType: {
    text: "Hi, I’m NETA AI’s Automation Audit Assistant. I can help you find what parts of your business can be automated in 2 minutes. What type of business do you run?",
    options: ["Real Estate", "Clinic / Healthcare", "E-commerce", "Restaurant / Cafe", "Education Institute", "Agency", "Other"],
  },
  contactChannel: {
    text: "Where do most of your customer inquiries come from?",
    options: ["WhatsApp", "Instagram", "Website", "Facebook", "Phone Calls", "Email"],
  },
  painPoint: {
    text: "Which repetitive task takes the most time from your team?",
    options: ["Answering repeated questions", "Following up leads", "Booking appointments", "Sending reminders", "Managing orders", "Creating reports", "Updating CRM / Sheets"],
  },
  weeklyInquiries: {
    text: "About how many customer inquiries do you receive each week?",
    options: ["0-10", "10-50", "50-100", "100+"],
  },
};

const initialAnswers: AuditAnswers = { businessType: "", contactChannel: "", painPoint: "", weeklyInquiries: "" };
const initialLead = { name: "", businessName: "", phone: "", email: "" };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("businessType");
  const [messages, setMessages] = useState<Message[]>([{ id: 1, sender: "bot", text: questions.businessType.text }]);
  const [answers, setAnswers] = useState(initialAnswers);
  const [recommendation, setRecommendation] = useState("");
  const [lead, setLead] = useState(initialLead);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(2);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, step, error]);

  const addMessage = (sender: Message["sender"], text: string) => {
    setMessages((current) => [...current, { id: idRef.current++, sender, text }]);
  };

  const choose = async (value: string) => {
    addMessage("user", value);
    if (step === "businessType" || step === "contactChannel" || step === "painPoint") {
      const nextStep = step === "businessType" ? "contactChannel" : step === "contactChannel" ? "painPoint" : "weeklyInquiries";
      setAnswers((current) => ({ ...current, [step]: value }));
      setStep(nextStep);
      addMessage("bot", questions[nextStep].text);
      return;
    }
    if (step === "weeklyInquiries") {
      const completed = { ...answers, weeklyInquiries: value };
      setAnswers(completed);
      const result = await generateRecommendation(completed);
      setRecommendation(result);
      setStep("consent");
      addMessage("bot", `Based on your answers, we recommend: ${result}. This system can help you reduce manual work, capture better leads, and notify your team automatically. Would you like NETA AI to send you a free automation audit?`);
      return;
    }
    if (step === "consent" && value === "Yes, send me the audit") {
      setStep("details");
      addMessage("bot", "Great — tell us where to send your free audit. A phone number or email is enough.");
    } else if (step === "consent") {
      setStep("declined");
      addMessage("bot", "No problem. Your recommendation is here whenever you need it. Thanks for exploring automation with NETA AI!");
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationError = validateAuditContact(lead);
    if (validationError) return setError(validationError);
    setError("");
    setSubmitting(true);
    try {
      const result = await submitAuditToN8n({
        ...answers,
        ...lead,
        recommendedAutomation: recommendation,
        source: "NETA AI Website Automation Audit Assistant",
      });
      const finalRecommendation = result.recommendedAutomation || recommendation;
      setRecommendation(finalRecommendation);
      setStep("success");
      addMessage("bot", `Thank you, ${lead.name.trim()}. Your automation audit request has been received. Based on your answers, we recommend ${finalRecommendation}. NETA AI will contact you soon.`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to submit your audit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep("businessType");
    setMessages([{ id: 1, sender: "bot", text: questions.businessType.text }]);
    setAnswers(initialAnswers);
    setLead(initialLead);
    setRecommendation("");
    setError("");
    setSubmitting(false);
    idRef.current = 2;
  };

  const activeOptions = step in questions ? questions[step as keyof typeof questions].options : step === "consent" ? ["Yes, send me the audit", "Not right now"] : [];

  return (
    <div className="fixed bottom-4 right-4 z-[100] sm:bottom-6 sm:right-6">
      {open && (
        <section role="dialog" aria-label="NETA AI Automation Audit Assistant" className="mb-3 flex h-[min(580px,calc(100dvh-120px))] w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:w-[410px]">
          <header className="flex items-center gap-3 bg-[var(--ink)] px-4 py-3 text-white">
            <span className="grid size-10 place-items-center rounded-full bg-[#2563eb] shadow-md"><Bot className="size-5 text-white" /></span>
            <div className="min-w-0 flex-1"><p className="font-semibold">Automation Audit Assistant</p><p className="text-xs text-white/65">NETA AI · typically 2 minutes</p></div>
            <button onClick={reset} aria-label="Start over" className="cursor-pointer rounded-lg p-2 hover:bg-white/10"><RefreshCw className="size-4" /></button>
            <button onClick={() => setOpen(false)} aria-label="Close assistant" className="cursor-pointer rounded-lg p-2 hover:bg-white/10"><X className="size-5" /></button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <p className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${message.sender === "user" ? "rounded-br-md bg-brand-blue text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm"}`}>{message.text}</p>
              </div>
            ))}

            {activeOptions.length > 0 && (
              <div className="grid gap-2 pt-1">
                {activeOptions.map((option) => <button key={option} onClick={() => void choose(option)} className="cursor-pointer rounded-xl border border-brand-blue/25 bg-white px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:border-brand-blue hover:bg-brand-blue/5">{option}</button>)}
              </div>
            )}

            {step === "details" && (
              <form onSubmit={submit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <Field label="Name *" value={lead.name} onChange={(name) => setLead((current) => ({ ...current, name }))} />
                <Field label="Business name *" value={lead.businessName} onChange={(businessName) => setLead((current) => ({ ...current, businessName }))} />
                <Field label="WhatsApp number" type="tel" value={lead.phone} onChange={(phone) => setLead((current) => ({ ...current, phone }))} />
                <Field label="Email" type="email" value={lead.email} onChange={(email) => setLead((current) => ({ ...current, email }))} />
                {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                <button disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">{submitting ? <><Loader2 className="size-4 animate-spin" /> Sending audit…</> : <><Send className="size-4" /> Send my free audit</>}</button>
              </form>
            )}

            {step === "success" && <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-700"><CheckCircle2 className="size-5" /> Request submitted successfully.</div>}
            {(step === "success" || step === "declined") && <button onClick={reset} className="cursor-pointer w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">Start another audit</button>}
            <div ref={endRef} />
          </div>
        </section>
      )}

      {!open && <button onClick={() => setOpen(true)} className="btn-primary group cursor-pointer flex items-center gap-2"><MessageCircle className="size-5" /><span>Get Free Automation Audit</span></button>}
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="block text-xs font-medium text-slate-600">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15" /></label>;
}
