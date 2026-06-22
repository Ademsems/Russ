"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCarousel from "@/components/ProductCarousel";
import type { CarouselSlide } from "@/components/ProductCarousel";

interface Product {
  slug: string;
  name: string;
  href: string;
  accent: string;
  heroImage: string | null;
}

interface HomeClientProps {
  products: Product[];
}

const pillars = [
  {
    title: "Expert Distribution",
    body: "We are the exclusive authorised regional partner for Advanced Navigation products across Slovakia, the Czech Republic, Austria, and Hungary — providing direct access to best-in-class navigation technology.",
  },
  {
    title: "Local Support",
    body: "Based in Bratislava, we offer on-the-ground technical support, consultation, and after-sales service in your timezone and language.",
  },
  {
    title: "Proven Technology",
    body: "Every product we carry is field-tested and trusted by defence, marine, and subsea operators worldwide. Backed by Advanced Navigation's global expertise.",
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

const HOME_WA_MSG =
  "Hi, I'm interested in Advanced Navigation products. Could you tell me more?";

export default function HomeClient({ products }: HomeClientProps) {
  const carouselSlides: CarouselSlide[] = products
    .filter((p): p is Product & { heroImage: string } => p.heroImage !== null)
    .map((p) => ({ name: p.name, href: p.href, heroImage: p.heroImage }));

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#163F7A] min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,184,159,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,159,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(30,95,191,0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(0,184,159,0.15) 0%, transparent 50%)",
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
              <span className="inline-block text-[#00B89F] text-xs font-semibold tracking-[0.25em] uppercase border border-[#00B89F]/30 px-3 py-1 rounded-full">
                Authorised Distributor · Slovakia · CZ · AT · HU
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6"
            >
              Precision Navigation.{" "}
              <span className="text-[#00B89F]">Delivered.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/60 leading-relaxed max-w-xl mb-10">
              Advanced Navigation brings world-class underwater, surface, and inertial navigation
              technology to Central Europe. Trusted technology. Expert support. Based in Bratislava.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="#products"
                className="px-6 py-3 bg-[#1E5FBF] text-white font-semibold text-sm rounded-lg hover:bg-[#163F7A] border border-white/20 transition-colors"
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

      {/* Carousel — only renders when at least one hero image exists */}
      {carouselSlides.length > 0 && <ProductCarousel slides={carouselSlides} />}

      {/* Products */}
      <section id="products" className="py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Advanced Navigation Portfolio</span>
            <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">Our Products</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.href}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={i % 2 === 0 ? slideLeft : slideRight}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(28,32,51,0.10)" }}
                className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden transition-shadow"
              >
                {/* Card image area */}
                <div className="h-40 relative overflow-hidden">
                  {product.heroImage ? (
                    <>
                      <Image
                        src={product.heroImage}
                        alt={product.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-[#163F7A]/40" />
                    </>
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center relative"
                      style={{
                        background: `linear-gradient(135deg, #163F7A 0%, ${product.accent === "#00B89F" ? "#0D2E5A" : "#163F7A"} 100%)`,
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `radial-gradient(circle at 60% 40%, ${product.accent} 0%, transparent 60%)`,
                        }}
                      />
                      <span className="text-white/10 text-7xl font-bold tracking-wider uppercase select-none">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1C2033] mb-2">{product.name}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-5">
                    {product.name === "Hydrus" && "The autonomous underwater drone redefining subsea surveying."}
                    {product.name === "Subsonus" && "Compact acoustic positioning and communication for underwater operations."}
                    {product.name === "Subsonus Tag" && "The ultra-long-life transponder built for reliable subsea tracking."}
                    {product.name === "GNSS Compass" && "All-in-one satellite compass delivering precise heading and positioning."}
                  </p>
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-1.5 text-[#1E5FBF] text-sm font-semibold hover:gap-3 transition-all duration-200"
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

      {/* Why us */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Our Advantage</span>
            <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">Why Work With Us?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={i === 0 ? slideLeft : i === 2 ? slideRight : fadeUp}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(28,32,51,0.08)" }}
                className="p-8 rounded-2xl border border-[#E2E8F0] transition-shadow"
              >
                <div className="w-10 h-1 bg-[#00B89F] rounded mb-5" />
                <h3 className="text-lg font-bold text-[#1C2033] mb-3">{pillar.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-10"
            >
              <span className="text-[#00B89F] text-xs font-semibold tracking-[0.2em] uppercase">Reach Out</span>
              <h2 className="mt-3 text-4xl font-bold text-[#1C2033]">Get In Touch</h2>
              <p className="mt-4 text-[#64748B] leading-relaxed">
                Have a question about a product or want to discuss your project? Our team will get back to you shortly.
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
                <WhatsAppButton message={HOME_WA_MSG} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
