"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

const valuesFallback = [
  {
    titleKey: "about.values.value1_title",
    title: "Precision",
    bodyKey: "about.values.value1_body",
    body: "We represent only the most accurate and reliable technology on the market. Our clients depend on performance, and so do we.",
  },
  {
    titleKey: "about.values.value2_title",
    title: "Partnership",
    bodyKey: "about.values.value2_body",
    body: "We build long-term relationships with our clients, acting as an extension of their team rather than a transactional supplier.",
  },
  {
    titleKey: "about.values.value3_title",
    title: "Innovation",
    bodyKey: "about.values.value3_body",
    body: "Pushing the boundaries of innovation — we stay at the forefront of navigation technology so our clients always have access to what's next.",
  },
];

export default function AboutClient({ content }: { content: ContentMap }) {
  const c = (key: string, fallback = "") => content[key] || fallback;

  const countryTags = c("about.manufacturer.country_tags", "Slovakia, Czech Republic, Austria, Hungary")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

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
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(30,95,191,0.4) 0%, transparent 60%)" }}
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
              {c("about.hero.eyebrow", "Who We Are")}
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-5">
              {c("about.hero.heading", "About RKC Technology")}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-xl leading-relaxed">
              {c("about.hero.subheadline", "The authorised dealer for Advanced Navigation across Slovakia, the Czech Republic, Austria, and Hungary.")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are — RKC */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("about.who.eyebrow", "Who We Are")}</span>
              <h2 className="mt-3 text-3xl font-bold text-[#1C2033] mb-6">{c("about.who.heading", "RKC Technology")}</h2>
              <div className="space-y-4 text-[#64748B] leading-relaxed text-[15px]">
                <p>
                  {c(
                    "about.who.paragraph1",
                    "RKC Technology is a Bratislava-based technology company and the authorised dealer for Advanced Navigation across Slovakia, the Czech Republic, Austria, and Hungary. We bring world-leading navigation, positioning, and autonomy technology to organisations across the region — supported by local expertise, consultation, and hands-on technical service."
                  )}
                </p>
                <p>
                  {c(
                    "about.who.paragraph2",
                    "We work with clients across marine, subsea, defence, and autonomous systems sectors, helping them specify, source, and deploy the right solution for their project. Our role goes beyond supply: we act as a technical partner from first enquiry through to deployment and beyond."
                  )}
                </p>
                <p>
                  {c(
                    "about.who.paragraph3",
                    "Pushing the boundaries of innovation, we stay at the forefront of navigation technology so our clients always have direct access to what's next — backed by the expertise and support to make it work in the field."
                  )}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideRight}
              className="space-y-4 lg:pt-14"
            >
              {[
                {
                  labelKey: "about.who.stat1_label",
                  label: "Authorised Dealer",
                  valueKey: "about.who.stat1_value",
                  value: "Official",
                  subKey: "about.who.stat1_sub",
                  sub: "Exclusive Advanced Navigation dealer for SK, CZ, AT & HU",
                },
                {
                  labelKey: "about.who.stat2_label",
                  label: "Coverage",
                  valueKey: "about.who.stat2_value",
                  value: "4 Countries",
                  subKey: "about.who.stat2_sub",
                  sub: "Slovakia · Czech Republic · Austria · Hungary",
                },
                {
                  labelKey: "about.who.stat3_label",
                  label: "Products Supplied",
                  valueKey: "about.who.stat3_value",
                  value: "4",
                  subKey: "about.who.stat3_sub",
                  sub: "Hydrus, Subsonus, Subsonus Tag, GNSS Compass",
                },
              ].map((stat) => (
                <div key={stat.labelKey} className="p-6 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
                  <div className="text-3xl font-bold text-[#1E5FBF] mb-1">{c(stat.valueKey, stat.value)}</div>
                  <div className="text-sm font-semibold text-[#1C2033] mb-1">{c(stat.labelKey, stat.label)}</div>
                  <div className="text-xs text-[#64748B]">{c(stat.subKey, stat.sub)}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About the manufacturer */}
      <section className="py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("about.manufacturer.eyebrow", "The Manufacturer")}</span>
              <h2 className="mt-3 text-3xl font-bold text-[#1C2033] mb-6">{c("about.manufacturer.heading", "About Advanced Navigation")}</h2>
              <div className="space-y-4 text-[#64748B] leading-relaxed text-[15px]">
                <p>
                  {c(
                    "about.manufacturer.paragraph1",
                    "Advanced Navigation Pty Ltd is the Australian manufacturer whose products RKC Technology supplies and supports in Central Europe. By combining software-enhanced hardware, Advanced Navigation's solutions deliver unmatched capability and performance across land, air, sea and space applications — including environments where GPS is unreliable or unavailable."
                  )}
                </p>
                <p>
                  {c(
                    "about.manufacturer.paragraph2",
                    "Built on a foundation of extensive research, testing, and vertically integrated manufacturing, the company operates across deep technology fields including robotics, inertial, photonic and quantum sensing, artificial intelligence, underwater acoustics, and GPS antennas and receivers. Customers choose Advanced Navigation for fast product delivery and unmatched technical field expertise."
                  )}
                </p>
                <p>
                  {c(
                    "about.manufacturer.paragraph3",
                    "Founded on a culture of research and discovery, Advanced Navigation's mission is to be the catalyst of the autonomy revolution — applying breakthrough technology to extend human capability and build a more resilient, sustainable, and safer future."
                  )}
                </p>
                <p>
                  {c(
                    "about.manufacturer.paragraph4",
                    "Advanced Navigation is headquartered in Sydney, Australia, with research and production facilities across the country and offices around the world. It is an Australian manufacturer exporting worldwide."
                  )}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {countryTags.map((country) => (
                  <span
                    key={country}
                    className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-full text-sm font-medium text-[#1C2033]"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">{c("about.values.eyebrow", "What We Stand For")}</span>
            <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">{c("about.values.heading", "Our Values")}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valuesFallback.map((v, i) => (
              <motion.div
                key={v.titleKey}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={i === 0 ? slideLeft : i === 2 ? slideRight : fadeUp}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(28,32,51,0.08)" }}
                className="p-8 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] transition-shadow"
              >
                <div className="w-8 h-1 bg-[#00B89F] rounded mb-5" />
                <h3 className="text-lg font-bold text-[#1C2033] mb-3">{c(v.titleKey, v.title)}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{c(v.bodyKey, v.body)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#163F7A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-3">{c("about.cta.heading", "Ready to work together?")}</h2>
            <p className="text-white/50 mb-8 text-sm">{c("about.cta.subtext", "Get in touch to discuss your navigation technology requirements.")}</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-[#1E5FBF] text-white font-semibold rounded-lg hover:bg-[#1a52a8] border border-white/20 transition-colors"
            >
              {c("about.cta.button", "Contact RKC Technology")}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
