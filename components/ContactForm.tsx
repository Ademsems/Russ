"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#2D7DD2]/10 border border-[#2D7DD2]/30 rounded-xl p-8 text-center"
          >
            <div className="w-12 h-12 bg-[#2D7DD2] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10L8 14L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#0A1628] mb-1">Message Sent</h3>
            <p className="text-[#64748B] text-sm">Thank you, we&apos;ll be in touch.</p>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0A1628] mb-1.5">
                  Name <span className="text-[#2D7DD2]">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0A1628] placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7DD2] focus:ring-1 focus:ring-[#2D7DD2] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A1628] mb-1.5">
                  Email <span className="text-[#2D7DD2]">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0A1628] placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7DD2] focus:ring-1 focus:ring-[#2D7DD2] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A1628] mb-1.5">
                Company <span className="text-[#94A3B8] font-normal text-xs">(optional)</span>
              </label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder="Your company"
                className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0A1628] placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7DD2] focus:ring-1 focus:ring-[#2D7DD2] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A1628] mb-1.5">
                Message <span className="text-[#2D7DD2]">*</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Tell us about your project or question..."
                rows={5}
                className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#0A1628] placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7DD2] focus:ring-1 focus:ring-[#2D7DD2] transition resize-none"
              />
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={loading || !form.name || !form.email || !form.message}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-3 bg-[#2D7DD2] text-white text-sm font-semibold rounded-lg hover:bg-[#2568b5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
