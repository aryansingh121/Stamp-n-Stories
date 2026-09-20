import nodemailer from "nodemailer";

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
      subject: `New Goa Susegad Invite Application — ${values.name}`,
      text: [
        "New Request Invite Application",
        "",
        "Event:",
        "The Susegad Stamp — Goa",
        "",
        `Name:\n${values.name}`,
        "",
        `Age:\n${values.age}`,
        "",
        `Gender:\n${values.gender}`,
        "",
        `Profession:\n${values.profession}`,
        "",
        `Outside Work:\n${values.interests}`,
        "",
        `Goa Off-Beat Experience:\n${values.goaExperience}`,
        "",
        `Date Commitment:\n${values.dateCommitment}`,
        "",
        `Trip Cost Response:\n${values.tripCostResponse}`,
        "",
        `Instagram:\n${values.instagram}`,
        "",
        `Verification Call:\n${values.verificationCall}`,
        "",
        `Selected Batch:\n${values.upcomingBatch}`,
        "",
        `WhatsApp:\n${values.whatsappNumber}`,
        "",
        `Email:\n${values.emailId}`,
        "",
        `Submission Time:\n${now.toISOString()}`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 640px; margin: 0 auto;">
          <h2 style="margin-bottom: 16px; color: #202124;">New Request Invite Application</h2>
          <p><strong>Event:</strong> The Susegad Stamp — Goa</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p><strong>Name:</strong> ${values.name}</p>
          <p><strong>Age:</strong> ${values.age}</p>
          <p><strong>Gender:</strong> ${values.gender}</p>
          <p><strong>Profession:</strong> ${values.profession}</p>
          <div style="margin-top: 20px;"><p><strong>Outside Work:</strong></p><p style="white-space: pre-wrap;">${values.interests.replace(/\n/g, "<br />")}</p></div>
          <p><strong>Goa Off-Beat Experience:</strong> ${values.goaExperience}</p>
          <p><strong>Date Commitment:</strong> ${values.dateCommitment}</p>
          <p><strong>Trip Cost Response:</strong> ${values.tripCostResponse}</p>
          <p><strong>Instagram:</strong> ${values.instagram}</p>
          <p><strong>Verification Call:</strong> ${values.verificationCall}</p>
          <p><strong>Selected Batch:</strong> ${values.upcomingBatch}</p>
          <p><strong>WhatsApp:</strong> ${values.whatsappNumber}</p>
          <p><strong>Email:</strong> ${values.emailId}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="margin-top: 20px;"><strong>Submission Time:</strong> ${now.toISOString()}</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Email provider rejected the request: ${errorBody || response.statusText}`);
  }
}

export async function sendRequestInviteEmail(values: any) {
  const recipient = process.env.EMAIL_TO || process.env.PARTNER_EMAIL || "yashtiwariworking@gmail.com";
  const now = new Date();

  console.log(`[REQUEST INVITE APPLICATION] New submission received at ${now.toISOString()}:`, {
    name: values.name,
    age: values.age,
    gender: values.gender,
    profession: values.profession,
    interests: values.interests,
    goaExperience: values.goaExperience,
    dateCommitment: values.dateCommitment,
    tripCostResponse: values.tripCostResponse,
    instagram: values.instagram,
    verificationCall: values.verificationCall,
    upcomingBatch: values.upcomingBatch,
    whatsappNumber: values.whatsappNumber,
    emailId: values.emailId,
  });

  if (RESEND_API_KEY) {
    try {
      await sendViaResend(values, recipient);
      console.log(`[REQUEST INVITE EMAIL] Successfully sent via Resend to ${recipient}`);
      return { success: true, delivered: true };
    } catch (resendError) {
      console.error("[REQUEST INVITE EMAIL] Failed sending via Resend:", resendError);
    }
  }

  const host = process.env.EMAIL_HOST || process.env.SMTP_HOST;
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const password = process.env.EMAIL_PASSWORD || process.env.SMTP_PASSWORD;

  if (host && user && password) {
    try {
      const mailTransport = getMailTransport();
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 640px; margin: 0 auto;">
          <h2 style="margin-bottom: 16px; color: #202124;">New Request Invite Application</h2>
          <p><strong>Event:</strong> The Susegad Stamp — Goa</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p><strong>1. Name:</strong> ${values.name}</p>
          <p><strong>2. Age:</strong> ${values.age}</p>
          <p><strong>3. Gender:</strong> ${values.gender}</p>
          <p><strong>4. Profession:</strong> ${values.profession}</p>
          <div style="margin-top: 20px;"><p><strong>5. Outside Work:</strong></p><p style="white-space: pre-wrap;">${values.interests.replace(/\n/g, "<br />")}</p></div>
          <p><strong>6. Goa Off-Beat Experience:</strong> ${values.goaExperience}</p>
          <p><strong>7. Date Commitment:</strong> ${values.dateCommitment}</p>
          <p><strong>8. Trip Cost Response:</strong> ${values.tripCostResponse}</p>
          <p><strong>9. Instagram:</strong> ${values.instagram}</p>
          <p><strong>10. Verification Call:</strong> ${values.verificationCall}</p>
          <p><strong>11. Selected Batch:</strong> ${values.upcomingBatch}</p>
          <p><strong>12. WhatsApp:</strong> ${values.whatsappNumber}</p>
          <p><strong>13. Email:</strong> ${values.emailId}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="margin-top: 20px;"><strong>Submission Time:</strong> ${now.toISOString()}</p>
        </div>
      `;

      await mailTransport.sendMail({
        from: process.env.EMAIL_FROM || '"Stamp ’N’ Stories" <no-reply@stampnstories.com>',
        to: recipient,
        subject: `New Goa Susegad Invite Application — ${values.name}`,
        text: [
          "New Request Invite Application",
          "",
          "Event:",
          "The Susegad Stamp — Goa",
          "",
          `1. Name:\n${values.name}`,
          "",
          `2. Age:\n${values.age}`,
          "",
          `3. Gender:\n${values.gender}`,
          "",
          `4. Profession:\n${values.profession}`,
          "",
          `5. Outside Work:\n${values.interests}`,
          "",
          `6. Goa Off-Beat Experience:\n${values.goaExperience}`,
          "",
          `7. Date Commitment:\n${values.dateCommitment}`,
          "",
          `8. Trip Cost Response:\n${values.tripCostResponse}`,
          "",
          `9. Instagram:\n${values.instagram}`,
          "",
          `10. Verification Call:\n${values.verificationCall}`,
          "",
          `11. Selected Batch:\n${values.upcomingBatch}`,
          "",
          `12. WhatsApp:\n${values.whatsappNumber}`,
          "",
          `13. Email:\n${values.emailId}`,
          "",
          `Submission Time:\n${now.toISOString()}`,
        ].join("\n"),
        html: htmlBody,
      });
      console.log(`[REQUEST INVITE EMAIL] Successfully sent via SMTP to ${recipient}`);
      return { success: true, delivered: true };
    } catch (smtpError) {
      console.error("[REQUEST INVITE EMAIL] Failed sending via SMTP:", smtpError);
    }
  } else {
    console.warn("[REQUEST INVITE EMAIL] Email provider (Resend/SMTP) not configured. Application safely recorded in server logs.");
  }

  return { success: true, delivered: false, note: "Logged to console (email service not configured)" };
}
