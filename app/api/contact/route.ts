import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !toEmail) {
    console.error("[contact] Missing env vars: RESEND_API_KEY or CONTACT_EMAIL_TO");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, company, phone, consent, message, website } = body as Record<string, string | boolean>;

  // Honeypot
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // Validation
  const errors: string[] = [];
  if (!name || String(name).trim().length < 1) errors.push("Name is required.");
  if (String(name).trim().length > 200) errors.push("Name is too long.");
  if (!email || !EMAIL_REGEX.test(String(email))) errors.push("A valid email is required.");
  if (!phone || String(phone).trim().length < 4) errors.push("Phone number is required.");
  if (!message || String(message).trim().length < 1) errors.push("Message is required.");
  if (String(message).trim().length > 5000) errors.push("Message is too long.");
  if (consent !== true) errors.push("You must consent to data processing.");

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  const companyLine = company ? `<tr><td style="padding:6px 0;color:#64748B;font-size:14px;">Company</td><td style="padding:6px 0;font-size:14px;font-weight:600;">${String(company)}</td></tr>` : "";
  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Inter,sans-serif;background:#F8FAFC;margin:0;padding:32px;">
  <div style="max-width:560px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;border:1px solid #E2E8F0;">
    <div style="background:#163F7A;padding:28px 32px;">
      <p style="margin:0;color:#00B89F;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">Advanced Navigation</p>
      <h1 style="margin:6px 0 0;color:white;font-size:22px;font-weight:700;">New Contact Enquiry</h1>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#64748B;font-size:14px;">Name</td><td style="padding:6px 0;font-size:14px;font-weight:600;">${String(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748B;font-size:14px;">Email</td><td style="padding:6px 0;font-size:14px;font-weight:600;"><a href="mailto:${String(email)}" style="color:#1E5FBF;">${String(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#64748B;font-size:14px;">Phone</td><td style="padding:6px 0;font-size:14px;font-weight:600;">${String(phone)}</td></tr>
        ${companyLine}
      </table>
      <hr style="border:none;border-top:1px solid #E2E8F0;margin:20px 0;">
      <p style="margin:0 0 8px;color:#64748B;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
      <p style="margin:0;font-size:15px;color:#1C2033;line-height:1.7;white-space:pre-wrap;">${String(message)}</p>
      <hr style="border:none;border-top:1px solid #E2E8F0;margin:20px 0;">
      <p style="margin:0;font-size:12px;color:#94A3B8;">✔ GDPR consent given — visitor agreed to data processing for this enquiry.</p>
    </div>
  </div>
</body>
</html>`.trim();

  const textBody = [
    "New Contact Enquiry — Advanced Navigation",
    "",
    `Name: ${String(name)}`,
    `Email: ${String(email)}`,
    `Phone: ${String(phone)}`,
    company ? `Company: ${String(company)}` : null,
    "",
    "Message:",
    String(message),
    "",
    "GDPR consent given.",
  ].filter((l) => l !== null).join("\n");

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Advanced Navigation <noreply@advancednavigation.sk>",
      to: [toEmail],
      replyTo: String(email),
      subject: `Enquiry from ${String(name)}`,
      html: htmlBody,
      text: textBody,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
