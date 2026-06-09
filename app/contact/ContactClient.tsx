"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0A1628] py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #2D7DD2 0%, transparent 60%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}>
            <motion.span variants={fadeUp} className="inline-block text-[#2D7DD2] text-xs font-semibold tracking-[0.25em] uppercase border border-[#2D7DD2]/30 px-3 py-1 rounded-full mb-5">
              Get In Touch
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white mb-5">
              Contact Us
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-lg leading-relaxed">
              We&apos;re based in Bratislava, Slovakia and ready to help.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact body */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideLeft}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-[#0A1628] mb-2">Let&apos;s talk</h2>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Fill in the form or reach out directly. Our team will get back to you shortly.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#2D7DD2]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.49-2.01-4.5-4.5-4.5zm0 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="#2D7DD2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Location</p>
                    <p className="text-[#0A1628] text-sm font-medium">Bratislava, Slovakia</p>
                    <p className="text-[#94A3B8] text-xs mt-0.5">(Address TBC)</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#2D7DD2]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm1 0v.5l5 3.5 5-3.5V4H3zm10 1.5l-5 3.5L3 5.5V12h10V5.5z" fill="#2D7DD2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:info@russ.sk" className="text-[#0A1628] text-sm font-medium hover:text-[#2D7DD2] transition-colors">
                      info@russ.sk
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#2D7DD2]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path d="M3.5 2A1.5 1.5 0 002 3.5v1C2 10.299 5.701 14 11.5 14h1a1.5 1.5 0 001.5-1.5v-1.293a1 1 0 00-.293-.707l-1.5-1.5a1 1 0 00-1.32-.083l-.91.683a6.073 6.073 0 01-2.577-2.577l.683-.91a1 1 0 00-.083-1.32l-1.5-1.5A1 1 0 004.793 2H3.5z" fill="#2D7DD2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-[#0A1628] text-sm font-medium">+421 (TBC)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideRight}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
