"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import type { E164Number } from "libphonenumber-js";
import "react-phone-number-input/style.css";

type FormState = {
  name: string;
  email: string;
  company: string;
  phone: E164Number | undefined;
  message: string;
  consent: boolean;
  website: string; // honeypot
};

const EMPTY: FormState = {
  name: "",
  email: "",
  company: "",
  phone: undefined,
  message: "",
  consent: false,
  website: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: keyof FormState, value: string | boolean | E164Number | undefined) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canSubmit =
    status !== "loading" &&
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.phone !== undefined &&
    isValidPhoneNumber(form.phone) &&
    form.message.trim() !== "" &&
    form.consent;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          phone: form.phone,
          message: form.message.trim(),
          consent: form.consent,
          website: form.website,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
        setForm(EMPTY);
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#1C2033] placeholder-[#94A3B8] focus:outline-none focus:border-[#1E5FBF] focus:ring-1 focus:ring-[#1E5FBF] transition";

  return (
    <div className="w-full">
      {/* honeypot — hidden from real users */}
      <div style={{ display: "none" }} aria-hidden="true">
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#00B89F]/10 border border-[#00B89F]/30 rounded-xl p-8 text-center"
          >
            <div className="w-12 h-12 bg-[#00B89F] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10L8 14L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1C2033] mb-1">Message Sent</h3>
            <p className="text-[#64748B] text-sm">Thank you, we&apos;ll be in touch shortly.</p>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1C2033] mb-1.5">
                  Name <span className="text-[#1E5FBF]">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1C2033] mb-1.5">
                  Email <span className="text-[#1E5FBF]">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-[#1C2033] mb-1.5">
                Company <span className="text-[#94A3B8] font-normal text-xs">(optional)</span>
              </label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="Your company"
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#1C2033] mb-1.5">
                Phone <span className="text-[#1E5FBF]">*</span>
              </label>
              <PhoneInput
                international
                defaultCountry="SK"
                value={form.phone}
                onChange={(val) => set("phone", val)}
                className="phone-input-wrapper"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-[#1C2033] mb-1.5">
                Message <span className="text-[#1E5FBF]">*</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Tell us about your project or question..."
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* GDPR consent */}
            <div className="flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#CBD5E1] text-[#1E5FBF] accent-[#1E5FBF] cursor-pointer"
              />
              <label htmlFor="consent" className="text-xs text-[#64748B] leading-relaxed cursor-pointer">
                I agree to the processing of my personal data so that Advanced Navigation can respond to my
                enquiry and contact me by email.{" "}
                <span className="text-[#1E5FBF]">*</span>
              </label>
            </div>

            {/* Error banner */}
            {status === "error" && errorMsg && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {errorMsg}
              </div>
            )}

            <motion.button
              onClick={handleSubmit}
              disabled={!canSubmit}
              whileHover={canSubmit ? { y: -2 } : {}}
              whileTap={canSubmit ? { scale: 0.98 } : {}}
              className="w-full sm:w-auto px-8 py-3 bg-[#1E5FBF] text-white text-sm font-semibold rounded-lg hover:bg-[#163F7A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === "loading" ? "Sending…" : "Send Message"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
