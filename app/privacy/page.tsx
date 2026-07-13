import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for the RKC Technology website, operated by rkctechnology s. r. o.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page header */}
      <div className="bg-[#163F7A] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-[#00B89F] text-xs font-semibold tracking-[0.25em] uppercase border border-[#00B89F]/30 px-3 py-1 rounded-full mb-5">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-4 text-white/50 text-sm">Last updated: 10 July 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 sm:p-12 space-y-10 text-[#1C2033]">

          {/* Notice */}
          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#64748B] leading-relaxed">
            This Privacy Policy has been prepared as a general GDPR-aligned framework. It should
            be reviewed by a qualified legal professional before being relied upon as final legal
            documentation.
          </div>

          {/* 1 */}
          <section>
            <h2 className="text-lg font-bold mb-3">1. Data Controller</h2>
            <div className="text-[#64748B] text-sm leading-relaxed space-y-1">
              <p>The data controller responsible for your personal data is:</p>
              <ul className="mt-3 space-y-1 pl-0 list-none">
                <li><strong>Company:</strong> rkctechnology s. r. o., trading as RKC Technology</li>
                <li><strong>Registered office:</strong> Mrázová 11, 831 06 Bratislava – Rača, Slovakia</li>
                <li><strong>IČO:</strong> 57282145</li>
                <li><strong>Contact:</strong> <a href="mailto:info@advancednavigation.sk" className="text-[#1E5FBF] hover:underline">info@advancednavigation.sk</a></li>
              </ul>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-bold mb-3">2. What Personal Data We Collect</h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-3">
              We collect personal data only when you voluntarily provide it to us, primarily
              through the contact enquiry form on this Website. The data collected may include:
            </p>
            <ul className="text-[#64748B] text-sm leading-relaxed space-y-1 list-disc pl-5">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name (if provided)</li>
              <li>The content of your message or enquiry</li>
            </ul>
            <p className="text-[#64748B] text-sm leading-relaxed mt-3">
              We also collect limited data via cookies (see Section 5 below).
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-bold mb-3">3. Purpose and Legal Basis for Processing</h2>
            <div className="text-[#64748B] text-sm leading-relaxed space-y-3">
              <p>
                We process your personal data for the following purposes and on the following
                legal bases under the GDPR:
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
                      <td className="py-2 px-3 border border-[#E2E8F0]">Responding to your enquiry</td>
                      <td className="py-2 px-3 border border-[#E2E8F0]">Legitimate interest (Art. 6(1)(f) GDPR) and/or your consent (Art. 6(1)(a))</td>
                    </tr>
                    <tr className="bg-[#F8FAFC]">
                      <td className="py-2 px-3 border border-[#E2E8F0]">Sending you an acknowledgement of your enquiry</td>
                      <td className="py-2 px-3 border border-[#E2E8F0]">Consent given via the contact form checkbox</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 border border-[#E2E8F0]">Storing your cookie preference</td>
                      <td className="py-2 px-3 border border-[#E2E8F0]">Legitimate interest / your consent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-bold mb-3">4. How We Use Your Data</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Your personal data is used solely to respond to your enquiry and, where you have
              consented, to send you an automated acknowledgement email confirming receipt.
              We do not use your data for unsolicited marketing. Email delivery is handled
              through a third-party email service provider acting as a data processor on our
              behalf under an appropriate data processing agreement. We do not use your personal
              data for profiling or automated decision-making.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-bold mb-3">5. Cookies</h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-3">
              This Website uses a small number of cookies. When you first visit, a cookie
              consent banner is displayed. Your preference (accepted or rejected) is stored
              in your browser&apos;s local storage under the key{" "}
              <code className="text-xs bg-[#F8FAFC] px-1 py-0.5 rounded border border-[#E2E8F0]">an_cookie_consent</code>.
              This is a functional preference record, not a tracking cookie.
            </p>
            <p className="text-[#64748B] text-sm leading-relaxed">
              We do not currently use analytics, advertising, or third-party tracking cookies.
              If this changes, this policy will be updated and the cookie banner will reflect it.
              You can clear your stored cookie preference at any time by clearing your
              browser&apos;s local storage.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-bold mb-3">6. Data Retention</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              We retain your personal data only for as long as necessary to handle your enquiry
              and for any subsequent follow-up, or as required by applicable law. Once the
              purpose for which the data was collected has been fulfilled and no legal retention
              obligation applies, your data is deleted or anonymised.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-bold mb-3">7. Data Sharing</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              We do not sell, rent, or trade your personal data. We may share your data with:
            </p>
            <ul className="text-[#64748B] text-sm leading-relaxed space-y-1 list-disc pl-5 mt-2">
              <li>
                <strong>Email service providers</strong> — used to deliver and receive emails,
                acting as data processors under a data processing agreement.
              </li>
              <li>
                <strong>Hosting providers</strong> — the Website is hosted on infrastructure
                that may process request data (e.g. IP addresses) as part of normal operation.
              </li>
            </ul>
            <p className="text-[#64748B] text-sm leading-relaxed mt-3">
              No personal data is shared with any third party for their own marketing or
              commercial purposes.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-bold mb-3">8. International Transfers</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Some of our third-party service providers (email delivery, hosting) may process
              data outside the European Economic Area. Where this occurs, we ensure that
              appropriate safeguards are in place in accordance with GDPR requirements, such
              as standard contractual clauses or adequacy decisions recognised by the European
              Commission.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-bold mb-3">9. Your Rights</h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-3">
              Under the GDPR, you have the following rights in relation to your personal data:
            </p>
            <ul className="text-[#64748B] text-sm leading-relaxed space-y-1.5 list-disc pl-5">
              <li><strong>Right of access</strong> — to receive a copy of the personal data we hold about you.</li>
              <li><strong>Right to rectification</strong> — to have inaccurate data corrected.</li>
              <li><strong>Right to erasure</strong> — to request deletion of your data where there is no legitimate reason for us to continue holding it.</li>
              <li><strong>Right to restriction</strong> — to request that we restrict how we use your data in certain circumstances.</li>
              <li><strong>Right to object</strong> — to object to processing based on legitimate interests.</li>
              <li><strong>Right to data portability</strong> — to receive your data in a structured, commonly used format.</li>
              <li><strong>Right to withdraw consent</strong> — where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing.</li>
            </ul>
            <p className="text-[#64748B] text-sm leading-relaxed mt-3">
              You also have the right to lodge a complaint with the Slovak data protection
              supervisory authority:{" "}
              <strong>Úrad na ochranu osobných údajov Slovenskej republiky</strong>,
              Hraničná 12, 820 07 Bratislava,{" "}
              <a
                href="https://www.dataprotection.gov.sk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E5FBF] hover:underline"
              >
                www.dataprotection.gov.sk
              </a>.
            </p>
            <p className="text-[#64748B] text-sm leading-relaxed mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:info@advancednavigation.sk" className="text-[#1E5FBF] hover:underline">
                info@advancednavigation.sk
              </a>. We will respond within 30 days.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-lg font-bold mb-3">10. Changes to This Policy</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo;
              date at the top of this page will reflect any changes. We encourage you to review
              this page periodically.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-lg font-bold mb-3">11. Contact</h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              For any questions or requests relating to this Privacy Policy or your personal
              data, please contact us at:{" "}
              <a href="mailto:info@advancednavigation.sk" className="text-[#1E5FBF] hover:underline">
                info@advancednavigation.sk
              </a>
              {" "}or by post at: rkctechnology s. r. o., Mrázová 11, 831 06 Bratislava – Rača, Slovakia.
            </p>
          </section>

          {/* Back link */}
          <div className="pt-4 border-t border-[#E2E8F0]">
            <Link href="/" className="text-[#1E5FBF] text-sm hover:underline">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
