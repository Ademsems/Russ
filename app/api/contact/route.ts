import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WA_URL =
  "https://wa.me/421949225542?text=Hi%2C%20I%20just%20submitted%20an%20enquiry%20on%20your%20website%20and%20would%20like%20to%20chat.";

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

  // ── Client notification email ──────────────────────────────────────────────

  const companyLine = company
    ? `<tr><td style="padding:6px 0;color:#64748B;font-size:14px;">Company</td><td style="padding:6px 0;font-size:14px;font-weight:600;">${String(company)}</td></tr>`
    : "";

  const notifyHtml = `
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
      <p style="margin:0;font-size:12px;color:#94A3B8;">&#10004; GDPR consent given — visitor agreed to data processing for this enquiry.</p>
    </div>
  </div>
</body>
</html>`.trim();

  const notifyText = [
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
  ]
    .filter((l) => l !== null)
    .join("\n");

  // ── Visitor autoresponder email ────────────────────────────────────────────

  const quotedMessage = String(message)
    .split("\n")
    .map((l) => `> ${l}`)
    .join("\n");

  const autoHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,Helvetica,sans-serif;background:#F8FAFC;margin:0;padding:32px;">
  <div style="max-width:560px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;border:1px solid #E2E8F0;">

    <!-- Header -->
    <div style="background:#163F7A;padding:28px 32px;">
      <p style="margin:0;color:#00B89F;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">Advanced Navigation</p>
      <h1 style="margin:6px 0 0;color:white;font-size:22px;font-weight:700;">We&apos;ve received your enquiry</h1>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      <p style="margin:0 0 16px;font-size:15px;color:#1C2033;line-height:1.7;">Hi ${String(name)},</p>
      <p style="margin:0 0 16px;font-size:15px;color:#1C2033;line-height:1.7;">
        Thank you for reaching out to Advanced Navigation. We&apos;ve received your enquiry and a member of
        our team will get back to you shortly.
      </p>

      <!-- WhatsApp CTA -->
      <div style="background:#F0FBF8;border:1px solid #00B89F33;border-radius:10px;padding:24px;margin:24px 0;text-align:center;">
        <p style="margin:0 0 16px;font-size:14px;color:#1C2033;line-height:1.6;">
          Prefer a faster response? Message us directly on WhatsApp and we&apos;ll get straight back to you.
        </p>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
          <tr>
            <td style="border-radius:6px;background:#25D366;">
              <a href="${WA_URL}"
                 target="_blank"
                 style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:700;color:white;text-decoration:none;border-radius:6px;font-family:Arial,Helvetica,sans-serif;">
                &#128172; Chat with us on WhatsApp
              </a>
            </td>
          </tr>
        </table>
      </div>

      <!-- Message copy -->
      <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0;">
      <p style="margin:0 0 8px;color:#64748B;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">Your message</p>
      <p style="margin:0;font-size:14px;color:#64748B;line-height:1.7;white-space:pre-wrap;border-left:3px solid #E2E8F0;padding-left:14px;">${String(message)}</p>

      <!-- Sign-off -->
      <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0;">
      <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#1C2033;">Best regards,</p>
      <p style="margin:0 0 12px;font-size:14px;color:#1C2033;">The Advanced Navigation Team</p>
      <p style="margin:0;font-size:12px;color:#94A3B8;line-height:1.8;">
        Advanced Navigation<br>
        Mr&#225;zov&#225; 11, Ra&#269;a, 831 06 Bratislava, Slovakia<br>
        +421 949 225 542<br>
        advancednavigation.sk
      </p>
    </div>
  </div>
</body>
</html>`.trim();

  const autoText = [
    `Hi ${String(name)},`,
    "",
    "Thank you for reaching out to Advanced Navigation. We've received your enquiry and a member of our team will get back to you shortly.",
    "",
    "Prefer a faster response? Message us on WhatsApp:",
    "https://wa.me/421949225542",
    "",
    "--- Your message ---",
    quotedMessage,
    "",
    "Best regards,",
    "The Advanced Navigation Team",
    "Advanced Navigation · Mrázová 11, Rača, 831 06 Bratislava · +421 949 225 542 · advancednavigation.sk",
  ].join("\n");

  // ── Send ───────────────────────────────────────────────────────────────────

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    // 1. Critical: notify the client
    const { error: notifyError } = await resend.emails.send({
      from: "Advanced Navigation <noreply@advancednavigation.sk>",
      to: [toEmail],
      replyTo: String(email),
      subject: `Enquiry from ${String(name)}`,
      html: notifyHtml,
      text: notifyText,
    });

    if (notifyError) {
      console.error("[contact] Notify send error:", notifyError);
      return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
    }

    // 2. Non-critical: autoresponder to the visitor
    try {
      const { error: autoError } = await resend.emails.send({
        from: "Advanced Navigation <noreply@advancednavigation.sk>",
        to: [String(email)],
        replyTo: toEmail,
        subject: "Thank you for contacting Advanced Navigation",
        html: autoHtml,
        text: autoText,
      });

      if (autoError) {
        console.warn("[contact] Autoresponder send error (non-fatal):", autoError);
      }
    } catch (autoErr) {
      console.warn("[contact] Autoresponder unexpected error (non-fatal):", autoErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
