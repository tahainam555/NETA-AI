"use client";

import { type ComponentProps, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, MapPin, MessagesSquare } from "lucide-react";

import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import { apiUrl } from "@/lib/api";

const interests = [
  "AI Automation",
  "Autonomous AI Agents",
  "Workflow Orchestration",
  "Conversational AI",
  "CRM Automation",
  "AI Customer Support",
  "AI Sales Automation",
  "Other",
];

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      interest: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setMessage("Thanks for reaching out. We'll get back within one business day.");
      reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send your request.");
    }
  });

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border bg-white p-8 shadow-elevated lg:col-span-3"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          placeholder="Jane Cooper"
          error={errors.name?.message}
          {...register("name")}
        />
        <Field
          label="Work email"
          type="email"
          placeholder="jane@company.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Field
          label="Company"
          placeholder="Company Inc."
          error={errors.company?.message}
          {...register("company")}
        />
        <div>
          <label className="block text-[12.5px] font-medium text-foreground">Service interest</label>
          <select
            {...register("interest")}
            className="mt-1.5 w-full cursor-pointer rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
          >
            <option value="">Select a focus</option>
            {interests.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.interest?.message && (
            <p className="mt-1 text-[11.5px] text-red-500">{errors.interest.message}</p>
          )}
        </div>
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register("website")}
      />

      <div className="mt-4">
        <label className="block text-[12.5px] font-medium text-foreground">What are you looking to automate?</label>
        <textarea
          rows={5}
          placeholder="Share your current workflows, tools and goals..."
          className="mt-1.5 w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
          {...register("message")}
        />
        {errors.message?.message && (
          <p className="mt-1 text-[11.5px] text-red-500">{errors.message.message}</p>
        )}
      </div>

      {status !== "idle" && (
        <div
          className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
            status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary group mt-6 w-full cursor-pointer justify-center disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Schedule a strategy call"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </motion.form>
  );
}

export function ContactSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5 lg:col-span-2"
        >
          {[
            { Icon: Mail, k: "Email", v: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "neta.ai.pk@gmail.com" },
            { Icon: MapPin, k: "HQ", v: "Islamabad · Remote" },
          ].map((b) => (
            <div key={b.k} className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-card">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-white">
                <b.Icon className="h-4.5 w-4.5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{b.k}</div>
                <div className="font-display text-[15.5px] font-semibold">{b.v}</div>
              </div>
            </div>
          ))}
        </motion.div>

        <ContactForm />
      </div>
    </section>
  );
}

const Field = ({ label, error, ...props }: ComponentProps<"input"> & { label: string; error?: string }) => (
  <div>
    <label className="block text-[12.5px] font-medium text-foreground">{label}</label>
    <input
      {...props}
      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
    />
    {error && <p className="mt-1 text-[11.5px] text-red-500">{error}</p>}
  </div>
);
