"use client";

import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  body: string;
  index: number;
}

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function FeatureCard({ title, body, index }: FeatureCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={index % 2 === 0 ? slideLeft : slideRight}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(10,22,40,0.08)" }}
      className="p-8 rounded-2xl border border-[#E2E8F0] bg-white transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-[#1E5FBF] flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-white text-xs font-bold">{index + 1}</span>
        </div>
        <div>
          <h3 className="text-base font-bold text-[#1C2033] mb-2">{title}</h3>
          <p className="text-[#64748B] text-sm leading-relaxed">{body}</p>
        </div>
      </div>
    </motion.div>
  );
}
