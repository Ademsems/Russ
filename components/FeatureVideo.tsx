"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FeatureVideoProps {
  src: string | null;
  label?: string;
}

export default function FeatureVideo({ src, label }: FeatureVideoProps) {
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const ambientRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLVideoElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // When modal opens: pause ambient, play modal unmuted from start
  // When modal closes: resume ambient muted loop
  useEffect(() => {
    if (open) {
      ambientRef.current?.pause();
      if (modalRef.current) {
        modalRef.current.currentTime = 0;
        modalRef.current.muted = false;
        modalRef.current.play().catch(() => {});
      }
    } else {
      if (modalRef.current) {
        modalRef.current.pause();
        modalRef.current.muted = true;
      }
      if (ambientRef.current) {
        ambientRef.current.muted = true;
        ambientRef.current.play().catch(() => {});
      }
    }
  }, [open]);

  function close() { setOpen(false); }

  // No src or load error → static placeholder, not clickable
  if (!src || failed) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#163F7A] to-[#0D2E5A] flex items-center justify-center relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #00B89F 0%, transparent 60%)" }}
        />
        {label && (
          <span className="text-white/10 text-8xl font-bold select-none relative">{label}</span>
        )}
      </div>
    );
  }

  return (
    <>
      {/* ── Ambient slot ──────────────────────────────────────────────── */}
      <button
        className="w-full h-full relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B89F] rounded-2xl overflow-hidden"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }}
        aria-label="Click to watch video fullscreen with sound"
      >
        <video
          ref={ambientRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex flex-col items-center justify-center gap-2">
          {/* Play circle */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-xs font-medium tracking-wide">
            Watch with sound
          </span>
        </div>
      </button>

      {/* ── Modal overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Video player"
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              onClick={close}
              aria-label="Close video"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl rounded-xl overflow-hidden"
              style={{ aspectRatio: "16/9" }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={modalRef}
                src={src}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-contain bg-black"
                onError={() => { close(); setFailed(true); }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
