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

const WA_MSG = "Hi, I'm interested in the Subsonus USBL system. Could you tell me more?";

const features = [
  {
    title: "Industry-Leading Hydrophone Array",
    body: "An eight-channel, factory-calibrated hydrophone array enables beamforming, giving exceptional multipath rejection in poor conditions and higher accuracy measurements.",
  },
  {
    title: "Dynamic Power and Signal Encoding",
    body: "Automatically adjusts acoustic transmit power and signal encoding to the operating environment for improved reliability in difficult conditions.",
  },
  {
    title: "Acoustic Heading",
    body: "Transfers high-accuracy GNSS heading from the surface to an underwater unit, giving underwater systems accurate heading without a gyrocompass and with no susceptibility to magnetic interference.",
  },
  {
    title: "Internal Speed of Sound Sensor",
    body: "Measures the speed of sound through water directly, making the system self-tuning with no extra equipment or manual setup required.",
  },
  {
    title: "Fully Integrated Miniature Enclosure",
    body: "All processing happens inside a miniature titanium enclosure, connecting via a single ethernet connection with a web browser-based interface — no rack-mount units, interface boxes, or PCs required.",
  },
  {
    title: "Acoustic Modem",
    body: "Rapidly transmits third-party data via a TCP network port from one Subsonus unit to another.",
  },
  {
    title: "Miniaturization",
    body: "Modern high-end electronics and manufacturing techniques shrink the physical footprint without compromising performance; runs entirely on the transceiver's own processor.",
  },
];

const specs = [
  { label: "Position Accuracy", value: "0.1 m" },
  { label: "Roll & Pitch", value: "0.1°" },
  { label: "Acoustic Heading", value: "0.3°" },
  { label: "Range & Depth", value: "1,000 m" },
];

const applications = ["AUVs", "ROVs", "Subsea surveying", "Diver tracking"];

export default function SubsonusClient({ images }: { images: ProductImage[] }) {
  return (
    <>
      <ProductHero
        name="Subsonus"
        tagline="Know Exactly Where They Are."
        intro="Subsonus is a next-generation USBL/INS that delivers high-accuracy position, velocity, and heading at depths of up to 1,000 metres."
        stats={[
          { value: "0.1m", label: "Position Accuracy" },
          { value: "0.1°", label: "Roll & Pitch" },
          { value: "0.3°", label: "Acoustic Heading" },
          { value: "1,000m", label: "Range & Depth" },
        ]}
      />

      {/* Overview */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Overview</span>
              <h2 className="mt-3 text-3xl font-bold text-[#1C2033] mb-5">Miniature USBL for Real-World Conditions</h2>
              <p className="text-[#64748B] leading-relaxed text-[15px]">
                Subsonus is a miniature underwater acoustic positioning system providing high-accuracy
                position, velocity, and heading at ranges of up to 1,000 metres. Its advanced signal
                processing and unique hydrophone design deliver highly reliable tracking, and it also
                operates seamlessly as a modem capable of transmitting user data underwater. ITAR-free.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideRight}
              className="grid grid-cols-2 gap-4"
            >
              {specs.map((s) => (
                <div key={s.label} className="p-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-center">
                  <div className="text-2xl font-bold text-[#1E5FBF]">{s.value}</div>
                  <div className="text-xs text-[#64748B] mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#F8FAFC] overflow-hidden">
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
                  <div className="w-8 h-8 rounded-lg bg-[#1E5FBF] flex items-center justify-center shrink-0 mt-0.5">
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

      {/* Applications */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Use Cases</span>
            <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">Applications</h2>
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
              <h2 className="text-3xl font-bold text-[#1C2033]">Interested in Subsonus?</h2>
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
