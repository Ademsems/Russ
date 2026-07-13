"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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

const values = [
  {
    title: "Precision",
    body: "We represent only the most accurate and reliable technology on the market. Our clients depend on performance, and so do we.",
  },
  {
    title: "Partnership",
    body: "We build long-term relationships with our clients, acting as an extension of their team rather than a transactional supplier.",
  },
  {
    title: "Innovation",
    body: "Pushing the boundaries of innovation — we stay at the forefront of navigation technology so our clients always have access to what's next.",
  },
];

export default function AboutClient() {
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
              Who We Are
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-5">
              About RKC Technology
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-xl leading-relaxed">
              The authorised dealer for Advanced Navigation across Slovakia, the Czech Republic, Austria, and Hungary.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are — RKC */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideLeft}>
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Who We Are</span>
              <h2 className="mt-3 text-3xl font-bold text-[#1C2033] mb-6">RKC Technology</h2>
              <div className="space-y-4 text-[#64748B] leading-relaxed text-[15px]">
                <p>
                  RKC Technology is a Bratislava-based technology company and the authorised dealer for
                  Advanced Navigation across Slovakia, the Czech Republic, Austria, and Hungary. We bring
                  world-leading navigation, positioning, and autonomy technology to organisations across the
                  region — supported by local expertise, consultation, and hands-on technical service.
                </p>
                <p>
                  We work with clients across marine, subsea, defence, and autonomous systems sectors,
                  helping them specify, source, and deploy the right solution for their project. Our role
                  goes beyond supply: we act as a technical partner from first enquiry through to deployment
                  and beyond.
                </p>
                <p>
                  Pushing the boundaries of innovation, we stay at the forefront of navigation technology
                  so our clients always have direct access to what&apos;s next — backed by the expertise
                  and support to make it work in the field.
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
                { label: "Authorised Dealer", value: "Official", sub: "Exclusive Advanced Navigation dealer for SK, CZ, AT & HU" },
                { label: "Coverage", value: "4 Countries", sub: "Slovakia · Czech Republic · Austria · Hungary" },
                { label: "Products Supplied", value: "4", sub: "Hydrus, Subsonus, Subsonus Tag, GNSS Compass" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
                  <div className="text-3xl font-bold text-[#1E5FBF] mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold text-[#1C2033] mb-1">{stat.label}</div>
                  <div className="text-xs text-[#64748B]">{stat.sub}</div>
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
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">The Manufacturer</span>
              <h2 className="mt-3 text-3xl font-bold text-[#1C2033] mb-6">About Advanced Navigation</h2>
              <div className="space-y-4 text-[#64748B] leading-relaxed text-[15px]">
                <p>
                  Advanced Navigation Pty Ltd is the Australian manufacturer whose products RKC Technology
                  supplies and supports in Central Europe. By combining software-enhanced hardware, Advanced
                  Navigation&apos;s solutions deliver unmatched capability and performance across land, air,
                  sea and space applications — including environments where GPS is unreliable or unavailable.
                </p>
                <p>
                  Built on a foundation of extensive research, testing, and vertically integrated
                  manufacturing, the company operates across deep technology fields including robotics,
                  inertial, photonic and quantum sensing, artificial intelligence, underwater acoustics,
                  and GPS antennas and receivers. Customers choose Advanced Navigation for fast product
                  delivery and unmatched technical field expertise.
                </p>
                <p>
                  Founded on a culture of research and discovery, Advanced Navigation&apos;s mission is to be
                  the catalyst of the autonomy revolution — applying breakthrough technology to extend
                  human capability and build a more resilient, sustainable, and safer future.
                </p>
                <p>
                  Advanced Navigation is headquartered in Sydney, Australia, with research and production
                  facilities across the country and offices around the world. It is an Australian
                  manufacturer exporting worldwide.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Slovakia", "Czech Republic", "Austria", "Hungary"].map((country) => (
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
            <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">What We Stand For</span>
            <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">Our Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={i === 0 ? slideLeft : i === 2 ? slideRight : fadeUp}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(28,32,51,0.08)" }}
                className="p-8 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] transition-shadow"
              >
                <div className="w-8 h-1 bg-[#00B89F] rounded mb-5" />
                <h3 className="text-lg font-bold text-[#1C2033] mb-3">{v.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#163F7A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-3">Ready to work together?</h2>
            <p className="text-white/50 mb-8 text-sm">Get in touch to discuss your navigation technology requirements.</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-[#1E5FBF] text-white font-semibold rounded-lg hover:bg-[#1a52a8] border border-white/20 transition-colors"
            >
              Contact RKC Technology
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
