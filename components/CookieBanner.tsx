"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_KEY = "an_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage unavailable — don't show banner
    }
  }, []);

  const dismiss = (choice: "accepted" | "rejected") => {
    try {
      localStorage.setItem(COOKIE_KEY, choice);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" as const }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-[#1C2033] border-t border-white/10 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
                We use cookies to improve your experience on our site. By continuing to browse,
                you agree to our use of cookies.{" "}
                <span className="text-white/40 text-xs">
                  (Privacy policy coming soon)
                </span>
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => dismiss("rejected")}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => dismiss("accepted")}
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#1E5FBF] hover:bg-[#163F7A] rounded-lg transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
