import type { Metadata } from "next";
import Link from "next/link";
import { fetchContent, getContent, toFallbackMap } from "@/lib/content";
import { SHEET_CSV_PRIVACY } from "@/lib/config";
import privacyContent from "@/content/privacy.json";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for the RKC Technology website, operated by rkctechnology s. r. o.",
};

/** "Label: Value | Label: Value | ..." → [{ label, value }] */
function parseColonPairs(str: string): { label: string; value: string }[] {
  return str
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((pair) => {
      const idx = pair.indexOf(": ");
      if (idx === -1) return { label: pair, value: "" };
      return { label: pair.slice(0, idx), value: pair.slice(idx + 2) };
    });
}

/** "Label — description | Label — description | ..." → [{ label, body }] */
function parseDashPairs(str: string): { label: string; body: string }[] {
  return str
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((pair) => {
      const idx = pair.indexOf(" — ");
      if (idx === -1) return { label: pair, body: "" };
      return { label: pair.slice(0, idx), body: pair.slice(idx + 3) };
    });
}

/** "Purpose — Legal basis" → { purpose, basis } */
function parseDashPair(str: string): { purpose: string; basis: string } {
  const idx = str.indexOf(" — ");
  if (idx === -1) return { purpose: str, basis: "" };
  return { purpose: str.slice(0, idx), basis: str.slice(idx + 3) };
}

function DetailValue({ label, value }: { label: string; value: string }) {
  const lower = label.toLowerCase();
  if (lower.includes("contact") || lower.includes("email")) {
    return (
      <a href={`mailto:${value}`} className="text-[#1E5FBF] hover:underline">
        {value}
      </a>
    );
  }
  return <>{value}</>;
}

const detailsFallback =
  "Company: rkctechnology s. r. o., trading as RKC Technology | Registered office: Mrázová 11, 831 06 Bratislava – Rača, Slovakia | IČO: 57282145 | Contact: info@advancednavigation.sk";

export default async function PrivacyPage() {
  const sheetContent = await fetchContent(SHEET_CSV_PRIVACY);
  const content = getContent(sheetContent, toFallbackMap(privacyContent));
  const c = (key: string, fallback = "") => content[key] || fallback;

  const details = parseColonPairs(c("privacy.s1.details", detailsFallback));
  const dataFields = c("privacy.s2.list", "Full name, Email address, Phone number, Company name (if provided), The content of your message or enquiry")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const tableRow1 = parseDashPair(c("privacy.s3.table_row1", "Responding to your enquiry — Legitimate interest (Art. 6(1)(f) GDPR) and/or your consent (Art. 6(1)(a))"));
  const tableRow2 = parseDashPair(c("privacy.s3.table_row2", "Sending you an acknowledgement of your enquiry — Consent given via the contact form checkbox"));
  const tableRow3 = parseDashPair(c("privacy.s3.table_row3", "Storing your cookie preference — Legitimate interest / your consent"));
  const sharingList = parseDashPairs(
    c(
      "privacy.s7.list",
      "Email service providers — used to deliver and receive emails, acting as data processors under a data processing agreement. | Hosting providers — the Website is hosted on infrastructure that may process request data (e.g. IP addresses) as part of normal operation."
    )
  );
  const rightsList = parseDashPairs(
    c(
      "privacy.s9.list",
      "Right of access — to receive a copy of the personal data we hold about you. | Right to rectification — to have inaccurate data corrected. | Right to erasure — to request deletion of your data where there is no legitimate reason for us to continue holding it. | Right to restriction — to request that we restrict how we use your data in certain circumstances. | Right to object — to object to processing based on legitimate interests. | Right to data portability — to receive your data in a structured, commonly used format. | Right to withdraw consent — where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing."
    )
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page header */}
      <div className="bg-[#163F7A] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-[#00B89F] text-xs font-semibold tracking-[0.25em] uppercase border border-[#00B89F]/30 px-3 py-1 rounded-full mb-5">
            {c("privacy.hero.badge", "Legal")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">{c("privacy.hero.heading", "Privacy Policy")}</h1>
          <p className="mt-4 text-white/50 text-sm">{c("privacy.hero.last_updated", "Last updated: 10 July 2025")}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 sm:p-12 space-y-10 text-[#1C2033]">

          {/* Notice */}
          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#64748B] leading-relaxed">
            {c(
              "privacy.notice",
              "This Privacy Policy has been prepared as a general GDPR-aligned framework. It should be reviewed by a qualified legal professional before being relied upon as final legal documentation."
            )}
          </div>

          {/* 1 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("privacy.s1.heading", "1. Data Controller")}</h2>
            <div className="text-[#64748B] text-sm leading-relaxed space-y-1">
              <p>{c("privacy.s1.intro", "The data controller responsible for your personal data is:")}</p>
              <ul className="mt-3 space-y-1 pl-0 list-none">
                {details.map((d) => (
                  <li key={d.label}>
                    <strong>{d.label}:</strong> <DetailValue label={d.label} value={d.value} />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("privacy.s2.heading", "2. What Personal Data We Collect")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-3">
              {c(
                "privacy.s2.intro",
                "We collect personal data only when you voluntarily provide it to us, primarily through the contact enquiry form on this Website. The data collected may include:"
              )}
            </p>
            <ul className="text-[#64748B] text-sm leading-relaxed space-y-1 list-disc pl-5">
              {dataFields.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="text-[#64748B] text-sm leading-relaxed mt-3">
              {c("privacy.s2.footer", "We also collect limited data via cookies (see Section 5 below).")}
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("privacy.s3.heading", "3. Purpose and Legal Basis for Processing")}</h2>
            <div className="text-[#64748B] text-sm leading-relaxed space-y-3">
              <p>
                {c("privacy.s3.intro", "We process your personal data for the following purposes and on the following legal bases under the GDPR:")}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC]">
                      <th className="text-left py-2 px-3 border border-[#E2E8F0] font-semibold text-[#1C2033]">Purpose</th>
                      <th className="text-left py-2 px-3 border border-[#E2E8F0] font-semibold text-[#1C2033]">Legal basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-3 border border-[#E2E8F0]">{tableRow1.purpose}</td>
                      <td className="py-2 px-3 border border-[#E2E8F0]">{tableRow1.basis}</td>
                    </tr>
                    <tr className="bg-[#F8FAFC]">
                      <td className="py-2 px-3 border border-[#E2E8F0]">{tableRow2.purpose}</td>
                      <td className="py-2 px-3 border border-[#E2E8F0]">{tableRow2.basis}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 border border-[#E2E8F0]">{tableRow3.purpose}</td>
                      <td className="py-2 px-3 border border-[#E2E8F0]">{tableRow3.basis}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("privacy.s4.heading", "4. How We Use Your Data")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "privacy.s4.body",
                "Your personal data is used solely to respond to your enquiry and, where you have consented, to send you an automated acknowledgement email confirming receipt. We do not use your data for unsolicited marketing. Email delivery is handled through a third-party email service provider acting as a data processor on our behalf under an appropriate data processing agreement. We do not use your personal data for profiling or automated decision-making."
              )}
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("privacy.s5.heading", "5. Cookies")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-3">
              {c(
                "privacy.s5.body1",
                "This Website uses a small number of cookies. When you first visit, a cookie consent banner is displayed. Your preference (accepted or rejected) is stored in your browser's local storage under the key an_cookie_consent. This is a functional preference record, not a tracking cookie."
              )}
            </p>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "privacy.s5.body2",
                "We do not currently use analytics, advertising, or third-party tracking cookies. If this changes, this policy will be updated and the cookie banner will reflect it. You can clear your stored cookie preference at any time by clearing your browser's local storage."
              )}
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("privacy.s6.heading", "6. Data Retention")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "privacy.s6.body",
                "We retain your personal data only for as long as necessary to handle your enquiry and for any subsequent follow-up, or as required by applicable law. Once the purpose for which the data was collected has been fulfilled and no legal retention obligation applies, your data is deleted or anonymised."
              )}
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("privacy.s7.heading", "7. Data Sharing")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c("privacy.s7.intro", "We do not sell, rent, or trade your personal data. We may share your data with:")}
            </p>
            <ul className="text-[#64748B] text-sm leading-relaxed space-y-1 list-disc pl-5 mt-2">
              {sharingList.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong> — {item.body}
                </li>
              ))}
            </ul>
            <p className="text-[#64748B] text-sm leading-relaxed mt-3">
              {c("privacy.s7.footer", "No personal data is shared with any third party for their own marketing or commercial purposes.")}
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("privacy.s8.heading", "8. International Transfers")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "privacy.s8.body",
                "Some of our third-party service providers (email delivery, hosting) may process data outside the European Economic Area. Where this occurs, we ensure that appropriate safeguards are in place in accordance with GDPR requirements, such as standard contractual clauses or adequacy decisions recognised by the European Commission."
              )}
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("privacy.s9.heading", "9. Your Rights")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-3">
              {c("privacy.s9.intro", "Under the GDPR, you have the following rights in relation to your personal data:")}
            </p>
            <ul className="text-[#64748B] text-sm leading-relaxed space-y-1.5 list-disc pl-5">
              {rightsList.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong> — {item.body}
                </li>
              ))}
            </ul>
            <p className="text-[#64748B] text-sm leading-relaxed mt-3">
              {c(
                "privacy.s9.supervisory_authority",
                "You also have the right to lodge a complaint with the Slovak data protection supervisory authority: Úrad na ochranu osobných údajov Slovenskej republiky, Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk."
              )}
            </p>
            <p className="text-[#64748B] text-sm leading-relaxed mt-3">
              {c("privacy.s9.footer", "To exercise any of these rights, contact us at info@advancednavigation.sk. We will respond within 30 days.")}
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("privacy.s10.heading", "10. Changes to This Policy")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "privacy.s10.body",
                "We may update this Privacy Policy from time to time. The \"Last updated\" date at the top of this page will reflect any changes. We encourage you to review this page periodically."
              )}
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("privacy.s11.heading", "11. Contact")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "privacy.s11.body",
                "For any questions or requests relating to this Privacy Policy or your personal data, please contact us at: info@advancednavigation.sk or by post at: rkctechnology s. r. o., Mrázová 11, 831 06 Bratislava – Rača, Slovakia."
              )}
            </p>
          </section>

          {/* Back link */}
          <div className="pt-4 border-t border-[#E2E8F0]">
            <Link href="/" className="text-[#1E5FBF] text-sm hover:underline">
              {c("privacy.back_link", "← Back to home")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
