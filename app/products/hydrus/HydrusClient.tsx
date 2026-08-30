"use client";

import { motion } from "framer-motion";
import ProductHero from "@/components/ProductHero";
import ProductGallery from "@/components/ProductGallery";
import FeatureVideo from "@/components/FeatureVideo";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { ProductImage } from "@/lib/getProductImages";
import type { HydrusVideos } from "@/lib/getHydrusVideos";
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

/** "Label: Value" (as stored in the sheet) → ["Label", "Value"] */
function splitLabelValue(str: string): [string, string] {
  const idx = str.indexOf(": ");
  if (idx === -1) return [str, ""];
  return [str.slice(0, idx), str.slice(idx + 2)];
}

const capabilitiesFallback = [
  { titleKey: "hydrus.capabilities.cap1_title", title: "AI-Enhanced INS", bodyKey: "hydrus.capabilities.cap1_body", body: "Fuses all navigation and positioning data using Advanced Navigation's proprietary INS algorithm." },
  { titleKey: "hydrus.capabilities.cap2_title", title: "USBL Positioning", bodyKey: "hydrus.capabilities.cap2_body", body: "Delivers absolute positioning and time synchronization when paired with a Subsonus USBL unit." },
  { titleKey: "hydrus.capabilities.cap3_title", title: "DVL Transducers", bodyKey: "hydrus.capabilities.cap3_body", body: "High-frequency acoustics for obstacle avoidance, camera focal length control, and precise velocity measurement." },
  { titleKey: "hydrus.capabilities.cap4_title", title: "High Speed Communication", bodyKey: "hydrus.capabilities.cap4_body", body: "Wi-Fi data transfer above water; optical modem communication underwater." },
  { titleKey: "hydrus.capabilities.cap5_title", title: "4K 60FPS Camera", bodyKey: "hydrus.capabilities.cap5_body", body: "Cinema-grade simultaneous video and stills, optimised for low light and computer vision." },
  { titleKey: "hydrus.capabilities.cap6_title", title: "Hubless Thrusters", bodyKey: "hydrus.capabilities.cap6_body", body: "Fine control authority with reduced entanglement risk; swappable impellers for easy maintenance." },
  { titleKey: "hydrus.capabilities.cap7_title", title: "Connectorless Design", bodyKey: "hydrus.capabilities.cap7_body", body: "Fully sealed body design reduces maintenance and eliminates water ingress risk." },
  { titleKey: "hydrus.capabilities.cap8_title", title: "Wireless Charging", bodyKey: "hydrus.capabilities.cap8_body", body: "Safe, fast Qi-standard charging, even underwater." },
  { titleKey: "hydrus.capabilities.cap9_title", title: "E-ink Screen", bodyKey: "hydrus.capabilities.cap9_body", body: "Pressure-tolerant, ultra-low-power display for a clear on-device interface." },
];

const applicationsFallback = [
  {
    titleKey: "hydrus.applications.app1_title",
    title: "Reef & Habitat Monitoring",
    bodyKey: "hydrus.applications.app1_body",
    body: "With 6 degrees of freedom, obstacle detection, and collision avoidance, Hydrus navigates confidently around reefs and tight spaces. Its 4K camera captures millimetre-precision imagery for 3D photogrammetry modelling, and its single-user hand deployment removes the need for specialist dive crews.",
    tagsKey: "hydrus.applications.app1_tags",
    tags: "Long-term reef health tracking, Coral growth assessment, Seagrass monitoring, Subtidal monitoring",
  },
  {
    titleKey: "hydrus.applications.app2_title",
    title: "Seabed Verification & Mapping",
    bodyKey: "hydrus.applications.app2_body",
    body: "Tight integration between Hydrus's imaging and navigation systems produces natively georeferenced, high-resolution seabed imagery, compatible with industry-standard GIS, mosaicing, and photogrammetry software. Missions can be saved and repeated on schedule for consistent data collection.",
    tagsKey: "hydrus.applications.app2_tags",
    tags: "Site investigation, Ground truthing, ISR, Environmental change observation, Underwater archaeology",
  },
  {
    titleKey: "hydrus.applications.app3_title",
    title: "Underwater Asset Inspection",
    bodyKey: "hydrus.applications.app3_body",
    body: "Hydrus operates untethered and autonomously, without the need for large support vessels or expert crews — reducing operational costs by up to 75% compared with traditional diver or ROV inspections.",
    tagsKey: "hydrus.applications.app3_tags",
    tags: "Subsea cable inspection, Oil & gas pipeline survey, Marine pre/post-construction assessment",
  },
  {
    titleKey: "hydrus.applications.app4_title",
    title: "Object Localisation & Classification",
    bodyKey: "hydrus.applications.app4_body",
    body: "Hydrus's open platform allows users to run custom machine vision software directly onboard with full access to imaging and sensor data, enabling rapid object localisation and classification.",
    tagsKey: "hydrus.applications.app4_tags",
    tags: "Subtidal monitoring and research, Search and rescue support",
  },
];

const specsFallback = [
  "Max. Transit Speed: 1.5 knots",
  "Max. Survey Speed: 1.5 knots",
  "Depth Rating: 300 m",
  "Size: 520 × 264 × 235 mm",
  "Weight: 7.1 kg",
  "Video Resolution: 4K @ 60 FPS",
  "Lighting: 5,000 Lumen",
];

export default function HydrusClient({
  images,
  videos,
  heroImage,
  content,
}: {
  images: ProductImage[];
  videos: HydrusVideos;
  heroImage?: string | null;
  content: ContentMap;
}) {
  const c = (key: string, fallback = "") => content[key] || fallback;

  return (
    <>
      <ProductHero
        name={c("hydrus.hero.name", "Hydrus")}
        tagline={c("hydrus.hero.tagline", "The Drone Revolution, Underwater.")}
        intro={c(
          "hydrus.hero.intro",
          "Hydrus is a micro hovering Autonomous Underwater Vehicle (AUV) that makes underwater surveying easy and affordable. Designed for anyone who needs underwater data — not just specialists — Hydrus brings the drone revolution beneath the surface."
        )}
        heroImage={heroImage}
        stats={[
          { value: c("hydrus.hero.stat1_value", "300m"), label: c("hydrus.hero.stat1_label", "Depth Rating") },
          { value: c("hydrus.hero.stat2_value", "4K@60"), label: c("hydrus.hero.stat2_label", "Video") },
          { value: c("hydrus.hero.stat3_value", "1.5km"), label: c("hydrus.hero.stat3_label", "Range") },
          { value: c("hydrus.hero.stat4_value", "2hrs"), label: c("hydrus.hero.stat4_label", "Endurance") },
        ]}
      />

      {/* Core sections */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

          {/* Truly Autonomous */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("hydrus.core.autonomous_eyebrow", "Navigation")}</span>
              <h2 className="mt-2 text-3xl font-bold text-[#1C2033] mb-4">{c("hydrus.core.autonomous_heading", "Truly Autonomous")}</h2>
              <p className="text-[#64748B] leading-relaxed text-[15px]">
                {c(
                  "hydrus.core.autonomous_body",
                  "Hydrus brings the most advanced navigation and communication systems of any subsea vehicle underwater. It integrates a DVL, USBL, INS, and both acoustic and optical modems into one tightly coupled system, enabling highly reliable, fully autonomous underwater missions — complete with obstacle detection and collision avoidance."
                )}
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideRight}
              className="h-56 rounded-2xl overflow-hidden relative bg-gradient-to-br from-[#163F7A] to-[#0D2E5A]"
            >
              <FeatureVideo src={videos.autonomous} label="DVL" />
            </motion.div>
          </div>

          {/* Stunning Imagery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideLeft}
              className="h-56 rounded-2xl overflow-hidden relative bg-gradient-to-br from-[#00B89F]/20 to-[#163F7A] order-last lg:order-first"
            >
              <FeatureVideo src={videos.imagery} label="4K" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("hydrus.core.imagery_eyebrow", "Imaging")}</span>
              <h2 className="mt-2 text-3xl font-bold text-[#1C2033] mb-4">{c("hydrus.core.imagery_heading", "Stunning Imagery")}</h2>
              <p className="text-[#64748B] leading-relaxed text-[15px]">
                {c(
                  "hydrus.core.imagery_body",
                  "Hydrus produces high-quality imagery even in low light and turbid conditions, combining a 4K camera, dynamic lighting, and AI image processing to deliver georeferenced footage. Recording at 60 frames per second captures fast movement and strengthens onboard machine vision, enabling AI classification and analysis directly on the vehicle. Hydrus can also generate 3D RGB point clouds by fusing camera imagery with sonar and navigation data."
                )}
              </p>
            </motion.div>
          </div>

          {/* Small & Affordable */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("hydrus.core.design_eyebrow", "Design")}</span>
              <h2 className="mt-2 text-3xl font-bold text-[#1C2033] mb-4">{c("hydrus.core.design_heading", "Small and Affordable")}</h2>
              <p className="text-[#64748B] leading-relaxed text-[15px]">
                {c(
                  "hydrus.core.design_body",
                  "Hydrus packs advanced capability into one of the smallest and most affordable AUVs on the market. Its fully encapsulated polymer construction delivers best-in-class reliability with minimal maintenance."
                )}
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("hydrus.core.mission_eyebrow", "Mission Control")}</span>
              <h2 className="mt-2 text-3xl font-bold text-[#1C2033] mb-4">{c("hydrus.core.mission_heading", "Intuitive Mission Control")}</h2>
              <p className="text-[#64748B] leading-relaxed text-[15px]">
                {c(
                  "hydrus.core.mission_body",
                  "Mission planning is handled through an intuitive point-and-click 3D map interface, removing complex mission design from the realm of trained specialists. Even untrained operators can deploy Hydrus straight out of the box, with AI handling navigation reliability and image quality control during the mission."
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("hydrus.capabilities.eyebrow", "Platform")}</span>
            <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">{c("hydrus.capabilities.heading", "Key Capabilities")}</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilitiesFallback.map((cap, i) => (
              <motion.div
                key={cap.titleKey}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={i % 2 === 0 ? slideLeft : slideRight}
                whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(28,32,51,0.08)" }}
                className="bg-white p-6 rounded-xl border border-[#E2E8F0] transition-shadow"
              >
                <div className="w-6 h-1 bg-[#00B89F] rounded mb-3" />
                <h3 className="text-sm font-bold text-[#1C2033] mb-2">{c(cap.titleKey, cap.title)}</h3>
                <p className="text-[#64748B] text-xs leading-relaxed">{c(cap.bodyKey, cap.body)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("hydrus.applications.eyebrow", "Use Cases")}</span>
            <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">{c("hydrus.applications.heading", "Applications")}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applicationsFallback.map((app, i) => {
              const tags = c(app.tagsKey, app.tags).split(",").map((t) => t.trim()).filter(Boolean);
              return (
                <motion.div
                  key={app.titleKey}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={i % 2 === 0 ? slideLeft : slideRight}
                  className="p-7 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]"
                >
                  <h3 className="text-base font-bold text-[#1C2033] mb-2">{c(app.titleKey, app.title)}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-4">{c(app.bodyKey, app.body)}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-full text-xs text-[#64748B]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-20 bg-[#163F7A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">{c("hydrus.specs.heading", "Specifications")}</h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            className="max-w-2xl mx-auto divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden"
          >
            {specsFallback.map((fallback, i) => {
              const [label, value] = splitLabelValue(c(`hydrus.specs.spec${i + 1}`, fallback));
              return (
                <motion.div key={`spec${i + 1}`} variants={fadeUp} className="flex justify-between items-center px-6 py-4 bg-white/5">
                  <span className="text-white/60 text-sm">{label}</span>
                  <span className="text-white font-semibold text-sm">{value}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <ProductGallery images={images} productName="Hydrus" />

      {/* CTA */}
      <section className="py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#1C2033]">{c("hydrus.cta.heading", "Interested in Hydrus?")}</h2>
              <p className="mt-3 text-[#64748B]">{c("hydrus.cta.subtext", "Get in touch and we'll tell you everything you need to know.")}</p>
            </motion.div>
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8">
              <ContactForm />
              <WhatsAppButton message={c("hydrus.whatsapp_prefill", "Hi, I'm interested in the Hydrus AUV. Could you tell me more?")} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
