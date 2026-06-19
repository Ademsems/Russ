"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";

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

// Email placeholder — TBC, swap once confirmed
const EMAIL = "info@advancednavigation.sk";
const WA_MSG = "Hi, I'm interested in Advanced Navigation products. Could you tell me more?";

export default function ContactClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#163F7A] py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,184,159,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,159,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-[#00B89F] text-xs font-semibold tracking-[0.25em] uppercase border border-[#00B89F]/30 px-3 py-1 rounded-full mb-5"
            >
              Get In Touch
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white mb-5">
              Contact Us
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-lg leading-relaxed">
              We&apos;re based in Bratislava, Slovakia and ready to help. Fill in the form below or reach out directly.
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
                <h2 className="text-2xl font-bold text-[#1C2033] mb-2">Let&apos;s talk</h2>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Fill in the form or reach out directly. Our team will respond promptly.
                </p>
              </div>

              <div className="space-y-5">
                {/* Location */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#1E5FBF]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.49-2.01-4.5-4.5-4.5zm0 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="#1E5FBF" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Location</p>
                    <p className="text-[#1C2033] text-sm font-medium">Mrázová 11, Rača</p>
                    <p className="text-[#1C2033] text-sm">831 06 Bratislava, Slovakia</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#1E5FBF]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm1 0v.5l5 3.5 5-3.5V4H3zm10 1.5l-5 3.5L3 5.5V12h10V5.5z" fill="#1E5FBF" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Email</p>
                    <a href={`mailto:${EMAIL}`} className="text-[#1C2033] text-sm font-medium hover:text-[#1E5FBF] transition-colors">
                      {EMAIL}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#1E5FBF]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path d="M3.5 2A1.5 1.5 0 002 3.5v1C2 10.299 5.701 14 11.5 14h1a1.5 1.5 0 001.5-1.5v-1.293a1 1 0 00-.293-.707l-1.5-1.5a1 1 0 00-1.32-.083l-.91.683a6.073 6.073 0 01-2.577-2.577l.683-.91a1 1 0 00-.083-1.32l-1.5-1.5A1 1 0 004.793 2H3.5z" fill="#1E5FBF" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Phone</p>
                    <a href="tel:+421949225542" className="text-[#1C2033] text-sm font-medium hover:text-[#1E5FBF] transition-colors">
                      +421 949 225 542
                    </a>
                  </div>
                </div>

                {/* WhatsApp info */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "#25D366" + "1A" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">WhatsApp</p>
                    <a
                      href={`https://wa.me/421949225542?text=${encodeURIComponent(WA_MSG)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1C2033] text-sm font-medium hover:text-[#25D366] transition-colors"
                    >
                      +421 949 225 542
                    </a>
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
                <WhatsAppButton message={WA_MSG} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
