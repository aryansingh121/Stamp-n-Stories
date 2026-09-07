import nodemailer from "nodemailer";
import { formatText } from "@/lib/partner-inquiry";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM || process.env.EMAIL_FROM || "no-reply@stampnstories.com";

function getMailTransport() {
  const host = process.env.EMAIL_HOST || process.env.SMTP_HOST;
  const port = Number(process.env.EMAIL_PORT || process.env.SMTP_PORT || "587");
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const password = process.env.EMAIL_PASSWORD || process.env.SMTP_PASSWORD;

  if (!host || !user || !password) {
    throw new Error("Email service is not configured.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.EMAIL_SECURE === "true" || process.env.SMTP_SECURE === "true",
    auth: { user, pass: password },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

async function sendViaResend(values: any, recipient: string) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const now = new Date();
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [recipient],
      subject: "New Stamp ’N’ Stories Partnership Inquiry",
      text: [
        "Partnership Inquiry",
        "",
        `Name: ${values.fullName}`,
        `Email: ${values.workEmail}`,
        `Phone: ${formatText(values.phoneNumber)}`,
        `Organisation: ${values.organizationName}`,
        `Role: ${values.role}`,
        `Partnership Type: ${values.partnershipType}`,
        `Website / Social: ${formatText(values.website)}`,
        `City: ${values.city}`,
        "",
        "Partnership Idea:",
        values.partnershipIdea,
        "",
        "Additional Information:",
        formatText(values.additionalInfo),
        "",
        `Submission date/time: ${now.toISOString()}`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 640px; margin: 0 auto;">
          <h2 style="margin-bottom: 16px; color: #202124;">Partnership Inquiry</h2>
          <p><strong>Name:</strong> ${values.fullName}</p>
          <p><strong>Email:</strong> ${values.workEmail}</p>
          <p><strong>Phone:</strong> ${formatText(values.phoneNumber)}</p>
          <p><strong>Organisation:</strong> ${values.organizationName}</p>
          <p><strong>Role:</strong> ${values.role}</p>
          <p><strong>Partnership Type:</strong> ${values.partnershipType}</p>
          <p><strong>Website / Social:</strong> ${formatText(values.website)}</p>
          <p><strong>City:</strong> ${values.city}</p>
          <div style="margin-top: 20px;"><p><strong>Partnership Idea:</strong></p><p style="white-space: pre-wrap;">${values.partnershipIdea.replace(/\n/g, "<br />")}</p></div>
          <div style="margin-top: 20px;"><p><strong>Additional Information:</strong></p><p style="white-space: pre-wrap;">${formatText(values.additionalInfo).replace(/\n/g, "<br />")}</p></div>
          <p style="margin-top: 20px;"><strong>Submission Date/Time:</strong> ${now.toISOString()}</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Email provider rejected the request: ${errorBody || response.statusText}`);
  }
}

export async function sendPartnerInquiryEmail(values: any) {
  const recipient = process.env.EMAIL_TO || process.env.PARTNER_EMAIL || "yashtiwariworking@gmail.com";

  if (RESEND_API_KEY) {
    await sendViaResend(values, recipient);
    return;
  }

  const mailTransport = getMailTransport();
  const now = new Date();
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 640px; margin: 0 auto;">
      <h2 style="margin-bottom: 16px; color: #202124;">Partnership Inquiry</h2>
      <p><strong>Name:</strong> ${values.fullName}</p>
      <p><strong>Email:</strong> ${values.workEmail}</p>
      <p><strong>Phone:</strong> ${formatText(values.phoneNumber)}</p>
      <p><strong>Organisation:</strong> ${values.organizationName}</p>
      <p><strong>Role:</strong> ${values.role}</p>
      <p><strong>Partnership Type:</strong> ${values.partnershipType}</p>
      <p><strong>Website / Social:</strong> ${formatText(values.website)}</p>
      <p><strong>City:</strong> ${values.city}</p>
      <div style="margin-top: 20px;">
        <p><strong>Partnership Idea:</strong></p>
        <p style="white-space: pre-wrap;">${values.partnershipIdea.replace(/\n/g, "<br />")}</p>
      </div>
      <div style="margin-top: 20px;">
        <p><strong>Additional Information:</strong></p>
        <p style="white-space: pre-wrap;">${formatText(values.additionalInfo).replace(/\n/g, "<br />")}</p>
      </div>
      <p style="margin-top: 20px;"><strong>Submission Date/Time:</strong> ${now.toISOString()}</p>
    </div>
  `;

  await mailTransport.sendMail({
    from: process.env.EMAIL_FROM || '"Stamp ’N’ Stories" <no-reply@stampnstories.com>',
    to: recipient,
    subject: "New Stamp ’N’ Stories Partnership Inquiry",
    text: [
      "Partnership Inquiry",
      "",
      `Name: ${values.fullName}`,
      `Email: ${values.workEmail}`,
      `Phone: ${formatText(values.phoneNumber)}`,
      `Organisation: ${values.organizationName}`,
      `Role: ${values.role}`,
      `Partnership Type: ${values.partnershipType}`,
      `Website / Social: ${formatText(values.website)}`,
      `City: ${values.city}`,
      "",
      "Partnership Idea:",
      values.partnershipIdea,
      "",
      "Additional Information:",
      formatText(values.additionalInfo),
      "",
      `Submission date/time: ${now.toISOString()}`,
    ].join("\n"),
    html: htmlBody,
  });
}

