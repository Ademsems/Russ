"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

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
    body: "The navigation industry is evolving fast. We stay at the forefront so our clients always have access to what's next.",
  },
];

const teamMembers = [
  { name: "Team Member", role: "Navigation Specialist" },
  { name: "Team Member", role: "Technical Consultant" },
  { name: "Team Member", role: "Sales & Support" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0A1628] py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #2D7DD2 0%, transparent 60%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}>
            <motion.span variants={fadeUp} className="inline-block text-[#2D7DD2] text-xs font-semibold tracking-[0.25em] uppercase border border-[#2D7DD2]/30 px-3 py-1 rounded-full mb-5">
              Who We Are
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-5">
              About Russ
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/60 max-w-xl leading-relaxed">
              Connecting Central Europe to the world&apos;s most advanced navigation technology.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideLeft}
            >
              <span className="text-[#2D7DD2] text-xs font-semibold tracking-[0.2em] uppercase">Our Story</span>
              <h2 className="mt-3 text-3xl font-bold text-[#0A1628] mb-6">Built on a Clear Mission</h2>
              <div className="space-y-4 text-[#64748B] leading-relaxed">
                <p>
                  Russ was founded with a clear mission: to make precision navigation technology accessible to organisations across Central Europe. As an authorised distributor of Advanced Navigation — a global leader in navigation and robotics technology — we bring cutting-edge underwater, surface, and inertial navigation systems to the region.
                </p>
                <p>
                  Based in Bratislava, Slovakia, we work closely with our clients across marine, subsea, defence, and autonomous systems sectors. We don&apos;t just sell products — we provide consultation, integration support, and ongoing technical assistance to ensure every deployment is a success.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideRight}
              className="rounded-2xl bg-gradient-to-br from-[#0A1628] to-[#1a3a6e] h-72 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-white/10 text-8xl font-bold tracking-wider">RUSS</div>
                <div className="text-white/30 text-xs tracking-[0.3em] uppercase mt-2">Bratislava, Slovakia</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-[#2D7DD2] text-xs font-semibold tracking-[0.2em] uppercase">What We Stand For</span>
            <h2 className="mt-3 text-4xl font-bold text-[#0A1628]">Our Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={i === 0 ? slideLeft : i === 2 ? slideRight : fadeUp}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(10,22,40,0.08)" }}
                className="p-8 rounded-2xl border border-[#E2E8F0] bg-white transition-shadow"
              >
                <div className="w-8 h-1 bg-[#2D7DD2] rounded mb-5" />
                <h3 className="text-lg font-bold text-[#0A1628] mb-3">{v.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-[#2D7DD2] text-xs font-semibold tracking-[0.2em] uppercase">The People</span>
            <h2 className="mt-3 text-4xl font-bold text-[#0A1628]">Our Team</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-dashed border-[#E2E8F0] p-6 text-center transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-[#F1F5F9] border-2 border-dashed border-[#E2E8F0] mx-auto mb-4 flex items-center justify-center">
                  <span className="text-[#94A3B8] text-xs">Photo</span>
                </div>
                <p className="font-semibold text-[#0A1628] text-sm">{member.name}</p>
                <p className="text-[#94A3B8] text-xs mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-[#94A3B8] text-xs mt-6">Team details coming soon</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Ready to work together?</h2>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-[#2D7DD2] text-white font-semibold rounded-lg hover:bg-[#2568b5] transition-colors"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
