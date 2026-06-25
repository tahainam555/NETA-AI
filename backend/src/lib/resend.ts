import { Resend } from "resend";

import type { ContactApiValues } from "@/lib/contact-schema";

const serverToken = process.env.RESEND_SERVER_TOKEN;
const fromEmail = process.env.CONTACT_FROM_EMAIL;
const toEmail = process.env.CONTACT_TO_EMAIL;

export function getResendClient() {
  if (!serverToken) {
    throw new Error("Missing RESEND_SERVER_TOKEN");
  }

  return new Resend(serverToken);
}

export async function sendContactEmail(payload: ContactApiValues) {
  if (!fromEmail || !toEmail) {
    throw new Error("Missing CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL");
  }

  const resend = getResendClient();

  const safe = {
    name: escapeHtml(payload.name),
    email: escapeHtml(payload.email),
    company: escapeHtml(payload.company),
    interest: escapeHtml(payload.interest),
    message: escapeHtml(payload.message),
  };

  const textBody = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company}`,
    `Service Interest: ${payload.interest}`,
    "",
    payload.message,
  ].join("\n");

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="margin: 0 0 12px;">New contact request</h2>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>Email:</strong> ${safe.email}</p>
      <p><strong>Company:</strong> ${safe.company}</p>
      <p><strong>Service Interest:</strong> ${safe.interest}</p>
      <p><strong>Message:</strong></p>
      <p>${safe.message.replace(/\n/g, "<br />")}</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: payload.email,
    subject: `New contact request - ${payload.name}`,
    text: textBody,
    html: htmlBody,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error("Failed to send email");
  }

  // Non-critical automation: if the internal notification succeeds but the
  // auto-reply fails, keep the lead captured and log the issue for follow-up.
  const { error: autoReplyError } = await resend.emails.send({
    from: fromEmail,
    to: [payload.email],
    subject: "We received your NETA AI automation request",
    text: [
      `Hi ${payload.name},`,
      "",
      "Thanks for reaching out to NETA AI. We received your automation request and our team will review it shortly.",
      "",
      `Company: ${payload.company}`,
      `Interest: ${payload.interest}`,
      "",
      "What happens next:",
      "1. We review your current workflow and automation goal.",
      "2. We identify the fastest automation opportunity.",
      "3. We contact you with the next steps.",
      "",
      "If you want to add anything, just reply to this email.",
      "",
      "Best,",
      "NETA AI",
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 620px;">
        <h2 style="margin: 0 0 12px;">Thanks for contacting NETA AI</h2>
        <p>Hi ${safe.name},</p>
        <p>We received your automation request and our team will review it shortly.</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 18px 0;">
          <p style="margin: 0 0 8px;"><strong>Company:</strong> ${safe.company}</p>
          <p style="margin: 0;"><strong>Interest:</strong> ${safe.interest}</p>
        </div>
        <p><strong>What happens next:</strong></p>
        <ol>
          <li>We review your current workflow and automation goal.</li>
          <li>We identify the fastest automation opportunity.</li>
          <li>We contact you with the next steps.</li>
        </ol>
        <p>If you want to add anything, just reply to this email.</p>
        <p>Best,<br />NETA AI</p>
      </div>
    `,
  });

  if (autoReplyError) {
    console.warn("Contact auto-reply failed:", autoReplyError);
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
