"use client";

import { useState } from "react";
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

const WA_MSG = "Hi, I'm interested in the Hydrus AUV. Could you tell me more?";

const capabilities = [
  {
    title: "AI-Enhanced INS",
    body: "Fuses all navigation and positioning data using Advanced Navigation's proprietary INS algorithm.",
  },
  {
    title: "USBL Positioning",
    body: "Delivers absolute positioning and time synchronization when paired with a Subsonus USBL unit.",
  },
  {
    title: "DVL Transducers",
    body: "High-frequency acoustics for obstacle avoidance, camera focal length control, and precise velocity measurement.",
  },
  {
    title: "High Speed Communication",
    body: "Wi-Fi data transfer above water; optical modem communication underwater.",
  },
  {
    title: "4K 60FPS Camera",
    body: "Cinema-grade simultaneous video and stills, optimised for low light and computer vision.",
  },
  {
    title: "Hubless Thrusters",
    body: "Fine control authority with reduced entanglement risk; swappable impellers for easy maintenance.",
  },
  {
    title: "Connectorless Design",
    body: "Fully sealed body design reduces maintenance and eliminates water ingress risk.",
  },
  {
    title: "Wireless Charging",
    body: "Safe, fast Qi-standard charging, even underwater.",
  },
  {
    title: "E-ink Screen",
    body: "Pressure-tolerant, ultra-low-power display for a clear on-device interface.",
  },
];

const applications = [
  {
    title: "Reef & Habitat Monitoring",
    body: "With 6 degrees of freedom, obstacle detection, and collision avoidance, Hydrus navigates confidently around reefs and tight spaces. Its 4K camera captures millimetre-precision imagery for 3D photogrammetry modelling, and its single-user hand deployment removes the need for specialist dive crews.",
    tags: ["Long-term reef health tracking", "Coral growth assessment", "Seagrass monitoring", "Subtidal monitoring"],
  },
  {
    title: "Seabed Verification & Mapping",
    body: "Tight integration between Hydrus's imaging and navigation systems produces natively georeferenced, high-resolution seabed imagery, compatible with industry-standard GIS, mosaicing, and photogrammetry software. Missions can be saved and repeated on schedule for consistent data collection.",
    tags: ["Site investigation", "Ground truthing", "ISR", "Environmental change observation", "Underwater archaeology"],
  },
  {
    title: "Underwater Asset Inspection",
    body: "Hydrus operates untethered and autonomously, without the need for large support vessels or expert crews — reducing operational costs by up to 75% compared with traditional diver or ROV inspections.",
    tags: ["Subsea cable inspection", "Oil & gas pipeline survey", "Marine pre/post-construction assessment"],
  },
  {
    title: "Object Localisation & Classification",
    body: "Hydrus's open platform allows users to run custom machine vision software directly onboard with full access to imaging and sensor data, enabling rapid object localisation and classification.",
    tags: ["Subtidal monitoring and research", "Search and rescue support"],
  },
];

const specs = [
  { label: "Max. Transit Speed", value: "1.5 knots" },
  { label: "Max. Survey Speed", value: "1.5 knots" },
  { label: "Depth Rating", value: "300 m" },
  { label: "Size", value: "520 × 264 × 235 mm" },
  { label: "Weight", value: "7.1 kg" },
  { label: "Video Resolution", value: "4K @ 60 FPS" },
  { label: "Lighting", value: "5,000 Lumen" },
];

export default function HydrusClient({ images }: { images: ProductImage[] }) {
  return (
    <>
      <ProductHero
        name="Hydrus"
        tagline="The Drone Revolution, Underwater."
        intro="Hydrus is a micro hovering Autonomous Underwater Vehicle (AUV) that makes underwater surveying easy and affordable. Designed for anyone who needs underwater data — not just specialists — Hydrus brings the drone revolution beneath the surface."
        stats={[
          { value: "300m", label: "Depth Rating" },
          { value: "4K@60", label: "Video" },
          { value: "1.5km", label: "Range" },
          { value: "2hrs", label: "Endurance" },
        ]}
      />

      {/* Core sections */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

          {/* Truly Autonomous */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Navigation</span>
              <h2 className="mt-2 text-3xl font-bold text-[#1C2033] mb-4">Truly Autonomous</h2>
              <p className="text-[#64748B] leading-relaxed text-[15px]">
                Hydrus brings the most advanced navigation and communication systems of any subsea vehicle
                underwater. It integrates a DVL, USBL, INS, and both acoustic and optical modems into one
                tightly coupled system, enabling highly reliable, fully autonomous underwater missions —
                complete with obstacle detection and collision avoidance.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideRight}
              className="h-56 rounded-2xl bg-gradient-to-br from-[#163F7A] to-[#0D2E5A] flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #00B89F 0%, transparent 60%)" }} />
              <span className="text-white/10 text-8xl font-bold">DVL</span>
            </motion.div>
          </div>

          {/* Stunning Imagery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideLeft}
              className="h-56 rounded-2xl bg-gradient-to-br from-[#00B89F]/20 to-[#163F7A] flex items-center justify-center relative overflow-hidden order-last lg:order-first"
            >
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 40% 60%, #00B89F 0%, transparent 60%)" }} />
              <span className="text-white/10 text-8xl font-bold">4K</span>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Imaging</span>
              <h2 className="mt-2 text-3xl font-bold text-[#1C2033] mb-4">Stunning Imagery</h2>
              <p className="text-[#64748B] leading-relaxed text-[15px]">
                Hydrus produces high-quality imagery even in low light and turbid conditions, combining a 4K
                camera, dynamic lighting, and AI image processing to deliver georeferenced footage. Recording
                at 60 frames per second captures fast movement and strengthens onboard machine vision, enabling
                AI classification and analysis directly on the vehicle. Hydrus can also generate 3D RGB point
                clouds by fusing camera imagery with sonar and navigation data.
              </p>
            </motion.div>
          </div>

          {/* Small & Affordable */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Design</span>
              <h2 className="mt-2 text-3xl font-bold text-[#1C2033] mb-4">Small and Affordable</h2>
              <p className="text-[#64748B] leading-relaxed text-[15px]">
                Hydrus packs advanced capability into one of the smallest and most affordable AUVs on the
                market. Its fully encapsulated polymer construction delivers best-in-class reliability with
                minimal maintenance.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Mission Control</span>
              <h2 className="mt-2 text-3xl font-bold text-[#1C2033] mb-4">Intuitive Mission Control</h2>
              <p className="text-[#64748B] leading-relaxed text-[15px]">
                Mission planning is handled through an intuitive point-and-click 3D map interface, removing
                complex mission design from the realm of trained specialists. Even untrained operators can
                deploy Hydrus straight out of the box, with AI handling navigation reliability and image
                quality control during the mission.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Platform</span>
            <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">Key Capabilities</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={i % 2 === 0 ? slideLeft : slideRight}
                whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(28,32,51,0.08)" }}
                className="bg-white p-6 rounded-xl border border-[#E2E8F0] transition-shadow"
              >
                <div className="w-6 h-1 bg-[#00B89F] rounded mb-3" />
                <h3 className="text-sm font-bold text-[#1C2033] mb-2">{cap.title}</h3>
                <p className="text-[#64748B] text-xs leading-relaxed">{cap.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Use Cases</span>
            <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">Applications</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app, i) => (
              <motion.div
                key={app.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={i % 2 === 0 ? slideLeft : slideRight}
                className="p-7 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]"
              >
                <h3 className="text-base font-bold text-[#1C2033] mb-2">{app.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">{app.body}</p>
                <div className="flex flex-wrap gap-2">
                  {app.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-full text-xs text-[#64748B]">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-20 bg-[#163F7A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Specifications</h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            className="max-w-2xl mx-auto divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden"
          >
            {specs.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="flex justify-between items-center px-6 py-4 bg-white/5">
                <span className="text-white/60 text-sm">{s.label}</span>
                <span className="text-white font-semibold text-sm">{s.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ProductGallery images={images} productName="Hydrus" />

      {/* CTA */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1C2033]">Interested in Hydrus?</h2>
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
