"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProductHeroProps {
  name: string;
  tagline: string;
  intro: string;
  stats?: { label: string; value: string }[];
  heroImage?: string | null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ProductHero({ name, tagline, intro, stats, heroImage }: ProductHeroProps) {
  return (
    <section className="relative bg-[#163F7A] py-32 overflow-hidden">
      {/* Hero background image (if present) */}
      {heroImage && (
        <>
          <Image
            src={heroImage}
            alt={`${name} hero`}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Navy overlay so text stays readable */}
          <div className="absolute inset-0 bg-[#163F7A]/75" />
        </>
      )}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,184,159,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,159,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(30,95,191,0.5) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(0,184,159,0.1) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="max-w-3xl"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-[#00B89F] text-xs font-semibold tracking-[0.25em] uppercase border border-[#00B89F]/30 px-3 py-1 rounded-full mb-5"
          >
            Advanced Navigation
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white mb-4">
            {name}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-2xl text-[#00B89F] font-medium mb-6">
            {tagline}
          </motion.p>
          <motion.p variants={fadeUp} className="text-white/60 leading-relaxed text-lg max-w-2xl">
            {intro}
          </motion.p>
        </motion.div>

        {stats && stats.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } } }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="bg-[#163F7A]/80 px-6 py-6 text-center backdrop-blur-sm"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/40 text-xs mt-1 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
