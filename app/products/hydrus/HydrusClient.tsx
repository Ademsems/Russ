"use client";

import { motion } from "framer-motion";
import ProductHero from "@/components/ProductHero";
import FeatureCard from "@/components/FeatureCard";
import ContactForm from "@/components/ContactForm";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const features = [
  {
    title: "Truly Autonomous",
    body: "Equipped with DVL, USBL, INS, acoustic and optical modem, all tightly integrated. Hydrus executes fully autonomous underwater missions with obstacle detection and collision avoidance.",
  },
  {
    title: "Stunning Imagery",
    body: "A 4K camera, dynamic smart lighting system, and AI image processing deliver high-quality georeferenced footage even in low light and turbid conditions. Capable of generating 3D RGB point clouds.",
  },
  {
    title: "Intuitive Mission Control",
    body: "A point-and-click 3D map interface makes complex mission design simple. Untrained operators can deploy Hydrus out of the box.",
  },
  {
    title: "Open Platform",
    body: "Integrate custom software payloads with full access to the camera, sensors, and navigation systems.",
  },
  {
    title: "Small and Affordable",
    body: "Fully encapsulated polymer construction provides best-in-class reliability with minimal maintenance in one of the most compact and cost-effective AUVs on the market.",
  },
];

const applications = [
  "Subsea inspection",
  "Coral reef and environmental monitoring",
  "Search and rescue support",
  "Infrastructure surveys",
  "Scientific research",
  "Defence and security",
];

export default function HydrusClient() {
  return (
    <>
      <ProductHero
        name="Hydrus"
        tagline="The Drone Revolution, Underwater."
        intro="Hydrus is a micro hovering Autonomous Underwater Vehicle (AUV) that makes subsea surveying and inspection easy and affordable. Designed for anyone who needs underwater data — not just specialists — Hydrus brings the drone revolution beneath the surface."
        stats={[
          { value: "300m", label: "Depth Rating" },
          { value: "4K@60", label: "Video" },
          { value: "1.5km", label: "Range" },
          { value: "2hrs", label: "Endurance" },
        ]}
      />

      {/* Features */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-[#2D7DD2] text-xs font-semibold tracking-[0.2em] uppercase">Capabilities</span>
            <h2 className="mt-3 text-4xl font-bold text-[#0A1628]">Built for the Deep</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <FeatureCard key={f.title} title={f.title} body={f.body} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="text-[#2D7DD2] text-xs font-semibold tracking-[0.2em] uppercase">Use Cases</span>
            <h2 className="mt-3 text-4xl font-bold text-[#0A1628]">Applications</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
          >
            {applications.map((app) => (
              <motion.span
                key={app}
                variants={fadeUp}
                className="px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full text-sm text-[#0A1628] font-medium"
              >
                {app}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold text-[#0A1628]">Interested in Hydrus?</h2>
              <p className="mt-3 text-[#64748B]">Get in touch and we&apos;ll tell you everything you need to know.</p>
            </motion.div>
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
