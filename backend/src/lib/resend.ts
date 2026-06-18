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

  const subject = `New contact request — ${payload.name}`;
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
    subject: subject,
    text: textBody,
    html: htmlBody,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error("Failed to send email");
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
