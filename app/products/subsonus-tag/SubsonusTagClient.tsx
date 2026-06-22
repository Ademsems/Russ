"use client";

import { motion } from "framer-motion";
import ProductHero from "@/components/ProductHero";
import ProductGallery from "@/components/ProductGallery";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { ProductImage } from "@/lib/getProductImages";

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

const WA_MSG = "Hi, I'm interested in the Subsonus Tag transponder. Could you tell me more?";

const features = [
  {
    title: "Ultra-Long Battery Life",
    body: "A revolutionary acoustic processing architecture achieves up to 18 months of battery life in slow-update applications.",
  },
  {
    title: "Multi-Track Technology",
    body: "Multiple tags can be deployed in the same area and tracked from a single surface Subsonus unit, each with a unique, nameable address for easy identification.",
  },
  {
    title: "Integrated Display",
    body: "A pressure-tolerant electronic paper display lets divers receive and respond to messages from the surface, consuming no power between screen updates.",
  },
  {
    title: "Hermetically Sealed",
    body: "Total encapsulation of electronics and batteries delivers unparalleled reliability with no servicing required.",
  },
  {
    title: "Completely Wireless",
    body: "Qi-compatible wireless charging means no connectors are needed, and tags can be configured and updated from a smartphone over Bluetooth.",
  },
];

const specs = [
  { label: "Position Accuracy", value: "0.25 m" },
  { label: "Range", value: "1,000 m" },
  { label: "Depth Rating", value: "2,000 m" },
  { label: "Battery Life", value: "18 months" },
];

const applications = ["Diver tracking", "ROV tracking", "Subsea asset tracking", "Net tracking"];

export default function SubsonusTagClient({ images }: { images: ProductImage[] }) {
  return (
    <>
      <ProductHero
        name="Subsonus Tag"
        tagline="Track Anything. Anywhere Underwater."
        intro="Subsonus Tag is a battery-powered acoustic positioning transponder that operates with the Subsonus USBL. It features an integrated battery, wireless charging, and a pressure-tolerant display, with ultra-low-power consumption enabling up to 18 months of operation on a single charge. ITAR-free."
        stats={[
          { value: "0.25m", label: "Position Accuracy" },
          { value: "1,000m", label: "Range" },
          { value: "2,000m", label: "Depth Rating" },
          { value: "18mo", label: "Battery Life" },
        ]}
      />

      {/* Features */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Technology</span>
            <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">Key Features</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={i % 2 === 0 ? slideLeft : slideRight}
                whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(28,32,51,0.08)" }}
                className="bg-white p-7 rounded-2xl border border-[#E2E8F0] transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#00B89F] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1C2033] mb-1.5">{f.title}</h3>
                    <p className="text-[#64748B] text-sm leading-relaxed">{f.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Specifications</span>
              <h2 className="mt-3 text-3xl font-bold text-[#1C2033] mb-6">Key Specs</h2>
              <div className="space-y-3">
                {specs.map((s) => (
                  <div key={s.label} className="flex justify-between items-center py-3 border-b border-[#E2E8F0]">
                    <span className="text-[#64748B] text-sm">{s.label}</span>
                    <span className="text-[#1C2033] font-semibold text-sm">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Use Cases</span>
              <h2 className="mt-3 text-3xl font-bold text-[#1C2033] mb-6">Applications</h2>
              <div className="flex flex-wrap gap-3">
                {applications.map((app) => (
                  <span key={app} className="px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full text-sm font-medium text-[#1C2033]">
                    {app}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ProductGallery images={images} productName="Subsonus Tag" />

      {/* CTA */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1C2033]">Interested in Subsonus Tag?</h2>
              <p className="mt-3 text-[#64748B]">Get in touch and we&apos;ll tell you everything you need to know.</p>
            </motion.div>
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8">
              <ContactForm />
              <WhatsAppButton message={WA_MSG} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
