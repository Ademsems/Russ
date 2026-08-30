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
  { titleKey: "subsonus.features.f1_title", title: "Industry-Leading Hydrophone Array", bodyKey: "subsonus.features.f1_body", body: "An eight-channel, factory-calibrated hydrophone array enables beamforming, giving exceptional multipath rejection in poor conditions and higher accuracy measurements." },
  { titleKey: "subsonus.features.f2_title", title: "Dynamic Power and Signal Encoding", bodyKey: "subsonus.features.f2_body", body: "Automatically adjusts acoustic transmit power and signal encoding to the operating environment for improved reliability in difficult conditions." },
  { titleKey: "subsonus.features.f3_title", title: "Acoustic Heading", bodyKey: "subsonus.features.f3_body", body: "Transfers high-accuracy GNSS heading from the surface to an underwater unit, giving underwater systems accurate heading without a gyrocompass and with no susceptibility to magnetic interference." },
  { titleKey: "subsonus.features.f4_title", title: "Internal Speed of Sound Sensor", bodyKey: "subsonus.features.f4_body", body: "Measures the speed of sound through water directly, making the system self-tuning with no extra equipment or manual setup required." },
  { titleKey: "subsonus.features.f5_title", title: "Fully Integrated Miniature Enclosure", bodyKey: "subsonus.features.f5_body", body: "All processing happens inside a miniature titanium enclosure, connecting via a single ethernet connection with a web browser-based interface — no rack-mount units, interface boxes, or PCs required." },
  { titleKey: "subsonus.features.f6_title", title: "Acoustic Modem", bodyKey: "subsonus.features.f6_body", body: "Rapidly transmits third-party data via a TCP network port from one Subsonus unit to another." },
  { titleKey: "subsonus.features.f7_title", title: "Miniaturization", bodyKey: "subsonus.features.f7_body", body: "Modern high-end electronics and manufacturing techniques shrink the physical footprint without compromising performance; runs entirely on the transceiver's own processor." },
];

const specsFallback = [
  "Position Accuracy: 0.1 m",
  "Roll & Pitch: 0.1°",
  "Acoustic Heading: 0.3°",
  "Range & Depth: 1,000 m",
];

export default function SubsonusClient({
  images,
  heroImage,
  content,
}: {
  images: ProductImage[];
  heroImage?: string | null;
  content: ContentMap;
}) {
  const c = (key: string, fallback = "") => content[key] || fallback;
  const applications = c("subsonus.applications.tags", "AUVs, ROVs, Subsea surveying, Diver tracking")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <>
      <ProductHero
        name={c("subsonus.hero.name", "Subsonus")}
        heroImage={heroImage}
        tagline={c("subsonus.hero.tagline", "Know Exactly Where They Are.")}
        intro={c("subsonus.hero.intro", "Subsonus is a next-generation USBL/INS that delivers high-accuracy position, velocity, and heading at depths of up to 1,000 metres.")}
        stats={[
          { value: c("subsonus.hero.stat1_value", "0.1m"), label: c("subsonus.hero.stat1_label", "Position Accuracy") },
          { value: c("subsonus.hero.stat2_value", "0.1°"), label: c("subsonus.hero.stat2_label", "Roll & Pitch") },
          { value: c("subsonus.hero.stat3_value", "0.3°"), label: c("subsonus.hero.stat3_label", "Acoustic Heading") },
          { value: c("subsonus.hero.stat4_value", "1,000m"), label: c("subsonus.hero.stat4_label", "Range & Depth") },
        ]}
      />

      {/* Overview */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("subsonus.overview.eyebrow", "Overview")}</span>
              <h2 className="mt-3 text-3xl font-bold text-[#1C2033] mb-5">{c("subsonus.overview.heading", "Miniature USBL for Real-World Conditions")}</h2>
              <p className="text-[#64748B] leading-relaxed text-[15px]">
                {c(
                  "subsonus.overview.body",
                  "Subsonus is a miniature underwater acoustic positioning system providing high-accuracy position, velocity, and heading at ranges of up to 1,000 metres. Its advanced signal processing and unique hydrophone design deliver highly reliable tracking, and it also operates seamlessly as a modem capable of transmitting user data underwater. ITAR-free."
                )}
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideRight}
              className="grid grid-cols-2 gap-4"
            >
              {specsFallback.map((spec, i) => {
                const [label, value] = splitLabelValue(spec);
                return (
                  <div key={`overview-spec-${i}`} className="p-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-center">
                    <div className="text-2xl font-bold text-[#1E5FBF]">{value}</div>
                    <div className="text-xs text-[#64748B] mt-1">{label}</div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("subsonus.features.eyebrow", "Technology")}</span>
            <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">{c("subsonus.features.heading", "Key Features")}</h2>
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
                  <div className="w-8 h-8 rounded-lg bg-[#1E5FBF] flex items-center justify-center shrink-0 mt-0.5">
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

      {/* Applications */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("subsonus.applications.eyebrow", "Use Cases")}</span>
            <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">{c("subsonus.applications.heading", "Applications")}</h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            className="flex flex-wrap justify-center gap-3"
          >
            {applications.map((app) => (
              <motion.span key={app} variants={fadeUp} className="px-5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full text-sm text-[#1C2033] font-medium">
                {app}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <ProductGallery images={images} productName="Subsonus" />

      {/* CTA */}
      <section className="py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1C2033]">{c("subsonus.cta.heading", "Interested in Subsonus?")}</h2>
              <p className="mt-3 text-[#64748B]">{c("subsonus.cta.subtext", "Get in touch and we'll tell you everything you need to know.")}</p>
            </motion.div>
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8">
              <ContactForm />
              <WhatsAppButton message={c("subsonus.whatsapp_prefill", "Hi, I'm interested in the Subsonus USBL system. Could you tell me more?")} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
