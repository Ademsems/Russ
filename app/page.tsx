"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const products = [
  {
    name: "Hydrus",
    tagline: "The autonomous underwater drone redefining subsea surveying.",
    href: "/products/hydrus",
  },
  {
    name: "Subsonus",
    tagline: "Compact acoustic positioning and communication for underwater operations.",
    href: "/products/subsonus",
  },
  {
    name: "Subsonus Tag",
    tagline: "The ultra-long-life transponder built for reliable subsea tracking.",
    href: "/products/subsonus-tag",
  },
  {
    name: "GNSS Compass",
    tagline: "All-in-one satellite compass delivering precise heading and positioning.",
    href: "/products/gnss-compass",
  },
];

const pillars = [
  {
    title: "Expert Distribution",
    body: "We are the authorised regional partner for Advanced Navigation products across Central Europe, providing access to best-in-class navigation technology.",
  },
  {
    title: "Local Support",
    body: "Based in Bratislava, we offer on-the-ground technical support, consultation, and after-sales service in your timezone and language.",
  },
  {
    title: "Proven Technology",
    body: "Every product we carry is field-tested and trusted by defence, marine, and subsea operators worldwide.",
  },
];

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

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0A1628] min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #2D7DD2 0%, transparent 60%), radial-gradient(circle at 80% 30%, #2D7DD2 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(45,125,210,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(45,125,210,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="mb-5">
              <span className="inline-block text-[#2D7DD2] text-xs font-semibold tracking-[0.25em] uppercase border border-[#2D7DD2]/30 px-3 py-1 rounded-full">
                Central Europe&apos;s Navigation Partner
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              Precision Navigation.{" "}
              <span className="text-[#2D7DD2]">Delivered.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/60 leading-relaxed max-w-xl mb-10">
              Russ brings world-class underwater and surface navigation technology to Central Europe.
              Trusted products. Expert support. Based in Bratislava.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="#products"
                className="px-6 py-3 bg-[#2D7DD2] text-white font-semibold text-sm rounded-lg hover:bg-[#2568b5] transition-colors"
              >
                Explore Products
              </Link>
              <Link
                href="#contact"
                className="px-6 py-3 border border-white/30 text-white font-semibold text-sm rounded-lg hover:border-white/60 hover:bg-white/5 transition-colors"
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-[#2D7DD2] text-xs font-semibold tracking-[0.2em] uppercase">Advanced Navigation</span>
            <h2 className="mt-3 text-4xl font-bold text-[#0A1628]">Our Products</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.href}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={i % 2 === 0 ? slideLeft : slideRight}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(10,22,40,0.12)" }}
                className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-[#0A1628] to-[#1a3a6e] flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #2D7DD2 0%, transparent 60%)" }}
                  />
                  <span className="text-white/15 text-6xl font-bold tracking-wider uppercase select-none">
                    {product.name.charAt(0)}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0A1628] mb-2">{product.name}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-5">{product.tagline}</p>
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-1.5 text-[#2D7DD2] text-sm font-semibold hover:gap-3 transition-all duration-200"
                  >
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7H12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Russ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-[#2D7DD2] text-xs font-semibold tracking-[0.2em] uppercase">Our Advantage</span>
            <h2 className="mt-3 text-4xl font-bold text-[#0A1628]">Why Russ?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={i === 0 ? slideLeft : i === 2 ? slideRight : fadeUp}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(10,22,40,0.08)" }}
                className="p-8 rounded-2xl border border-[#E2E8F0] transition-shadow"
              >
                <div className="w-10 h-10 bg-[#2D7DD2]/10 rounded-lg flex items-center justify-center mb-5">
                  <div className="w-4 h-4 rounded-full bg-[#2D7DD2]" />
                </div>
                <h3 className="text-lg font-bold text-[#0A1628] mb-3">{pillar.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-10"
            >
              <span className="text-[#2D7DD2] text-xs font-semibold tracking-[0.2em] uppercase">Reach Out</span>
              <h2 className="mt-3 text-4xl font-bold text-[#0A1628]">Get In Touch</h2>
              <p className="mt-4 text-[#64748B] leading-relaxed">
                Have a question about a product or want to discuss your project? Reach out and our team will get back to you shortly.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideLeft}
            >
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
