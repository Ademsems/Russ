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

const WA_MSG = "Hi, I'm interested in the GNSS Compass. Could you tell me more?";

const features = [
  {
    title: "Plug-And-Play",
    body: "Full support for NMEA 2000 and NMEA 0183 with no configuration, setup, or calibration required — reliable position and heading within minutes.",
  },
  {
    title: "GNSS Heading",
    body: "Dual GNSS antennas reliably determine true heading with high accuracy, without requiring motion and without susceptibility to magnetic interference.",
  },
  {
    title: "Interface Options",
    body: "Available in a serial variant (NMEA 2000/0183 for plug-and-play connection to existing marine systems) or a Power over Ethernet variant for simplified cabling and maximum flexibility in new installations.",
  },
  {
    title: "Dual Frequency RTK GNSS",
    body: "L1/L2 RTK delivers real-time position accuracy of 10mm, with support for GPS, GLONASS, GALILEO, and BeiDou satellite systems.",
  },
  {
    title: "Time Server",
    body: "A GPS-disciplined oscillator allows the unit to act as a high-accuracy time reference; the PoE variant supports both PTP and NTP for precise network-wide time synchronisation.",
  },
];

const specs = [
  { label: "Roll & Pitch", value: "0.4°" },
  { label: "Position Accuracy (RTK)", value: "0.01 m" },
  { label: "Heading", value: "0.2°" },
  { label: "Update Rate", value: "200 Hz" },
];

const applications = ["Marine", "Autonomous agriculture", "Hydrography", "Antenna targeting"];

export default function GnssCompassClient({ images, heroImage }: { images: ProductImage[]; heroImage?: string | null }) {
  return (
    <>
      <ProductHero
        name="GNSS Compass"
        heroImage={heroImage}
        tagline="Precision Heading. Anywhere on Earth."
        intro="The GNSS Compass is a plug-and-play GNSS/INS navigation and heading solution. It delivers accurate dual-antenna GPS-based heading immune to magnetic interference and can maintain accurate heading through GNSS outages of up to 20 minutes. Features high-accuracy 1cm RTK positioning and is plug-and-play with NMEA 0183, NMEA 2000, and Ethernet interfaces. ITAR-free."
        stats={[
          { value: "0.4°", label: "Roll & Pitch" },
          { value: "0.01m", label: "RTK Position" },
          { value: "0.2°", label: "Heading" },
          { value: "200Hz", label: "Update Rate" },
        ]}
      />

      {/* Overview */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Overview</span>
              <h2 className="mt-3 text-3xl font-bold text-[#1C2033] mb-5">All-in-One Navigation Solution</h2>
              <p className="text-[#64748B] leading-relaxed text-[15px]">
                GNSS Compass is an all-in-one GNSS/INS navigation and heading solution. It delivers accurate
                dual-antenna GPS-based heading that is immune to magnetic interference and can maintain
                accurate heading through GNSS outages of up to 20 minutes. It features high-accuracy 1cm RTK
                positioning and is plug-and-play with NMEA 0183, NMEA 2000, and Ethernet interfaces.
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

      <ProductGallery images={images} productName="GNSS Compass" />

      {/* CTA */}
      <section className="py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1C2033]">Interested in the GNSS Compass?</h2>
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
