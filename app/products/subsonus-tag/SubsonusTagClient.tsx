"use client";

import { motion } from "framer-motion";
import ProductHero from "@/components/ProductHero";
import ProductGallery from "@/components/ProductGallery";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { ProductImage } from "@/lib/getProductImages";
import type { ContentMap } from "@/lib/content";

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

function splitLabelValue(str: string): [string, string] {
  const idx = str.indexOf(": ");
  if (idx === -1) return [str, ""];
  return [str.slice(0, idx), str.slice(idx + 2)];
}

const featuresFallback = [
  { titleKey: "subsonus_tag.features.f1_title", title: "Ultra-Long Battery Life", bodyKey: "subsonus_tag.features.f1_body", body: "A revolutionary acoustic processing architecture achieves up to 18 months of battery life in slow-update applications." },
  { titleKey: "subsonus_tag.features.f2_title", title: "Multi-Track Technology", bodyKey: "subsonus_tag.features.f2_body", body: "Multiple tags can be deployed in the same area and tracked from a single surface Subsonus unit, each with a unique, nameable address for easy identification." },
  { titleKey: "subsonus_tag.features.f3_title", title: "Integrated Display", bodyKey: "subsonus_tag.features.f3_body", body: "A pressure-tolerant electronic paper display lets divers receive and respond to messages from the surface, consuming no power between screen updates." },
  { titleKey: "subsonus_tag.features.f4_title", title: "Hermetically Sealed", bodyKey: "subsonus_tag.features.f4_body", body: "Total encapsulation of electronics and batteries delivers unparalleled reliability with no servicing required." },
  { titleKey: "subsonus_tag.features.f5_title", title: "Completely Wireless", bodyKey: "subsonus_tag.features.f5_body", body: "Qi-compatible wireless charging means no connectors are needed, and tags can be configured and updated from a smartphone over Bluetooth." },
];

const specsFallback = [
  "Position Accuracy: 0.25 m",
  "Range: 1,000 m",
  "Depth Rating: 2,000 m",
  "Battery Life: 18 months",
];

export default function SubsonusTagClient({
  images,
  heroImage,
  content,
}: {
  images: ProductImage[];
  heroImage?: string | null;
  content: ContentMap;
}) {
  const c = (key: string, fallback = "") => content[key] || fallback;
  const applications = c("subsonus_tag.applications.tags", "Diver tracking, ROV tracking, Subsea asset tracking, Net tracking")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <>
      <ProductHero
        name={c("subsonus_tag.hero.name", "Subsonus Tag")}
        heroImage={heroImage}
        tagline={c("subsonus_tag.hero.tagline", "Track Anything. Anywhere Underwater.")}
        intro={c(
          "subsonus_tag.hero.intro",
          "Subsonus Tag is a battery-powered acoustic positioning transponder that operates with the Subsonus USBL. It features an integrated battery, wireless charging, and a pressure-tolerant display, with ultra-low-power consumption enabling up to 18 months of operation on a single charge. ITAR-free."
        )}
        stats={[
          { value: c("subsonus_tag.hero.stat1_value", "0.25m"), label: c("subsonus_tag.hero.stat1_label", "Position Accuracy") },
          { value: c("subsonus_tag.hero.stat2_value", "1,000m"), label: c("subsonus_tag.hero.stat2_label", "Range") },
          { value: c("subsonus_tag.hero.stat3_value", "2,000m"), label: c("subsonus_tag.hero.stat3_label", "Depth Rating") },
          { value: c("subsonus_tag.hero.stat4_value", "18mo"), label: c("subsonus_tag.hero.stat4_label", "Battery Life") },
        ]}
      />

      {/* Features */}
      <section className="py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("subsonus_tag.features.eyebrow", "Technology")}</span>
            <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">{c("subsonus_tag.features.heading", "Key Features")}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuresFallback.map((f, i) => (
              <motion.div
                key={f.titleKey}
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
                    <h3 className="text-sm font-bold text-[#1C2033] mb-1.5">{c(f.titleKey, f.title)}</h3>
                    <p className="text-[#64748B] text-sm leading-relaxed">{c(f.bodyKey, f.body)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("subsonus_tag.specs.eyebrow", "Specifications")}</span>
              <h2 className="mt-3 text-3xl font-bold text-[#1C2033] mb-6">{c("subsonus_tag.specs.heading", "Key Specs")}</h2>
              <div className="space-y-3">
                {specsFallback.map((fallback, i) => {
                  const [label, value] = splitLabelValue(c(`subsonus_tag.specs.spec${i + 1}`, fallback));
                  return (
                    <div key={`spec${i + 1}`} className="flex justify-between items-center py-3 border-b border-[#E2E8F0]">
                      <span className="text-[#64748B] text-sm">{label}</span>
                      <span className="text-[#1C2033] font-semibold text-sm">{value}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("subsonus_tag.applications.eyebrow", "Use Cases")}</span>
              <h2 className="mt-3 text-3xl font-bold text-[#1C2033] mb-6">{c("subsonus_tag.applications.heading", "Applications")}</h2>
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
      <section className="py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1C2033]">{c("subsonus_tag.cta.heading", "Interested in Subsonus Tag?")}</h2>
              <p className="mt-3 text-[#64748B]">{c("subsonus_tag.cta.subtext", "Get in touch and we'll tell you everything you need to know.")}</p>
            </motion.div>
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8">
              <ContactForm />
              <WhatsAppButton message={c("subsonus_tag.whatsapp_prefill", "Hi, I'm interested in the Subsonus Tag transponder. Could you tell me more?")} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
