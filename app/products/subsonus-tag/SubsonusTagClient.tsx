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
    title: "Ultra-Long Battery Life",
    body: "Designed for extended underwater deployments without the need for frequent recharging.",
  },
  {
    title: "Multi-Track Technology",
    body: "Can be tracked simultaneously by multiple Subsonus units, enabling complex multi-asset operations.",
  },
  {
    title: "Integrated Display",
    body: "Onboard display for status monitoring and configuration in the field.",
  },
  {
    title: "Robust and Reliable",
    body: "Built for demanding subsea conditions.",
  },
];

const applications = [
  "Diver positioning",
  "ROV and AUV tracking",
  "Asset tagging",
  "Offshore operations",
];

export default function SubsonusTagClient() {
  return (
    <>
      <ProductHero
        name="Subsonus Tag"
        tagline="Track Anything. Anywhere Underwater."
        intro="Subsonus Tag is the companion transponder to the Subsonus positioning system. Attach it to a diver, ROV, or any underwater asset and track its position in real time with precision."
      />

      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="text-[#2D7DD2] text-xs font-semibold tracking-[0.2em] uppercase">Capabilities</span>
            <h2 className="mt-3 text-4xl font-bold text-[#0A1628]">Key Features</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <FeatureCard key={f.title} title={f.title} body={f.body} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
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
              <motion.span key={app} variants={fadeUp} className="px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full text-sm text-[#0A1628] font-medium">
                {app}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0A1628]">Interested in Subsonus Tag?</h2>
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
