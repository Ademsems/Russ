import type { Metadata } from "next";
import Link from "next/link";
import { fetchContent, getContent, toFallbackMap } from "@/lib/content";
import { SHEET_CSV_TERMS } from "@/lib/config";
import termsContent from "@/content/terms.json";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for the RKC Technology website, operated by rkctechnology s. r. o.",
  alternates: { canonical: "/terms" },
};

/** "Label: Value | Label: Value | ..." (as stored in the sheet) → [{ label, value }] */
function parsePairs(str: string): { label: string; value: string }[] {
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

function DetailValue({ label, value }: { label: string; value: string }) {
  const lower = label.toLowerCase();
  if (lower.includes("email")) {
    return (
      <a href={`mailto:${value}`} className="text-[#1E5FBF] hover:underline">
        {value}
      </a>
    );
  }
  if (lower.includes("phone")) {
    return (
      <a href={`tel:${value.replace(/\s+/g, "")}`} className="text-[#1E5FBF] hover:underline">
        {value}
      </a>
    );
  }
  return <>{value}</>;
}

const detailsFallback =
  "Company name: rkctechnology s. r. o., trading as RKC Technology | Legal form: Spoločnosť s ručením obmedzeným (s. r. o.) | Registered office: Mrázová 7383/11, 831 06 Bratislava – mestská časť Rača, Slovakia | IČO: 57282145 | DIČ: 2122652576 | Commercial register: Obchodný register Mestského súdu Bratislava III, oddiel: Sro, vložka č. 193189/B | Contact email: info@advancednavigation.sk | Phone: +421 949 225 542";

export default async function TermsPage() {
  const sheetContent = await fetchContent(SHEET_CSV_TERMS);
  const content = getContent(sheetContent, toFallbackMap(termsContent));
  const c = (key: string, fallback = "") => content[key] || fallback;

  const details = parsePairs(c("terms.s2.details", detailsFallback));

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page header */}
      <div className="bg-[#163F7A] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-[#00B89F] text-xs font-semibold tracking-[0.25em] uppercase border border-[#00B89F]/30 px-3 py-1 rounded-full mb-5">
            {c("terms.hero.badge", "Legal")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">{c("terms.hero.heading", "Terms & Conditions")}</h1>
          <p className="mt-4 text-white/50 text-sm">{c("terms.hero.last_updated", "Last updated: 10 July 2025")}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 sm:p-12 space-y-10 text-[#1C2033]">

          {/* Notice */}
          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#64748B] leading-relaxed">
            {c(
              "terms.notice",
              "These terms have been prepared as a general framework for this website. They should be reviewed by a qualified legal professional before being relied upon as final legal documentation."
            )}
          </div>

          {/* 1 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("terms.s1.heading", "1. Introduction and Acceptance")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "terms.s1.body",
                "By accessing or using the website at advancednavigation.sk (the \"Website\"), you agree to be bound by these Terms & Conditions (\"Terms\"). If you do not agree with any part of these Terms, please do not use the Website. We reserve the right to update these Terms at any time; continued use of the Website following any changes constitutes acceptance of the revised Terms."
              )}
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("terms.s2.heading", "2. Company Identification")}</h2>
            <div className="text-[#64748B] text-sm leading-relaxed space-y-1">
              <p>{c("terms.s2.intro", "The Website is operated by:")}</p>
              <ul className="mt-3 space-y-1 pl-0 list-none">
                {details.map((d) => (
                  <li key={d.label}>
                    <strong>{d.label}:</strong> <DetailValue label={d.label} value={d.value} />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("terms.s3.heading", "3. Purpose of the Website")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "terms.s3.body",
                "This Website is an informational and lead-generation platform. Its purpose is to present the products distributed by RKC Technology and to allow prospective customers to submit enquiries. The Website does not operate as an online store; no purchases, payments, or binding sales contracts are concluded through this Website."
              )}
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("terms.s4.heading", "4. Authorised Dealer Status")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "terms.s4.body",
                "RKC Technology (rkctechnology s. r. o.) is the authorised dealer for Advanced Navigation Pty Ltd products in Slovakia, the Czech Republic, Austria, and Hungary. RKC Technology is a dealer and distributor — it is not the manufacturer. Advanced Navigation Pty Ltd (Sydney, Australia) designs, manufactures, and owns all product intellectual property. Product specifications, imagery, datasheets, and technical information displayed on this Website are provided for reference purposes and reflect information supplied by Advanced Navigation Pty Ltd. Specifications are subject to change by the manufacturer at any time without prior notice. We endeavour to keep information up to date but cannot guarantee its completeness or accuracy at all times."
              )}
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("terms.s5.heading", "5. Intellectual Property")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "terms.s5.body",
                "The design, layout, text, and original content of this Website are the property of RKC Technology or its content suppliers and are protected by applicable intellectual property laws. Product names, logos, imagery, trademarks, and other materials relating to Advanced Navigation products are the property of Advanced Navigation Pty Ltd and/or their respective owners. Nothing on this Website grants any licence to use those materials without the express written permission of the respective rights holder."
              )}
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("terms.s6.heading", "6. Enquiries and No-Contract Clause")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "terms.s6.body",
                "Submitting an enquiry through the contact form on this Website does not constitute a binding offer, order, or contract of any kind. Any enquiry submitted is solely a request for information or a quotation. A binding agreement between rkctechnology s. r. o. and a customer is only formed when both parties have signed a separate written contract or order confirmation. We reserve the right to decline any enquiry at our sole discretion."
              )}
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("terms.s7.heading", "7. Limitation of Liability")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "terms.s7.body",
                "To the fullest extent permitted by applicable law, RKC Technology (rkctechnology s. r. o.) shall not be liable for any direct, indirect, incidental, or consequential loss or damage arising out of or in connection with your use of, or inability to use, this Website or its content. The Website is provided on an \"as is\" and \"as available\" basis without warranties of any kind, express or implied, including but not limited to accuracy, completeness, fitness for a particular purpose, or non-infringement."
              )}
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("terms.s8.heading", "8. External Links")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "terms.s8.body",
                "This Website may contain links to third-party websites, including the website of Advanced Navigation Pty Ltd. These links are provided for convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them. The inclusion of any link does not imply endorsement of that site by rkctechnology s. r. o."
              )}
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("terms.s9.heading", "9. Governing Law and Jurisdiction")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "terms.s9.body",
                "These Terms are governed by and construed in accordance with the laws of the Slovak Republic. Any disputes arising out of or relating to these Terms or the use of this Website shall be subject to the exclusive jurisdiction of the competent courts of the Slovak Republic."
              )}
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("terms.s10.heading", "10. Changes to These Terms")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "terms.s10.body",
                "We may update these Terms at any time by publishing a revised version on this page with an updated \"Last updated\" date. We encourage you to review this page periodically. Material changes will be highlighted where practicable."
              )}
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-lg font-bold mb-3">{c("terms.s11.heading", "11. Contact")}</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              {c(
                "terms.s11.body",
                "If you have any questions about these Terms, please contact us at info@advancednavigation.sk or by post at: rkctechnology s. r. o., Mrázová 11, 831 06 Bratislava – Rača, Slovakia."
              )}
            </p>
          </section>

          {/* Back link */}
          <div className="pt-4 border-t border-[#E2E8F0]">
            <Link href="/" className="text-[#1E5FBF] text-sm hover:underline">
              {c("terms.back_link", "← Back to home")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
