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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            {/* Mobile: buttons row first (stays near bottom), text below */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Text — sits below buttons on mobile so buttons are always near bottom-0 */}
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed sm:max-w-2xl">
                <span className="hidden sm:inline">
                  We use cookies to improve your experience on our site. By continuing to browse, you agree to our use of cookies.
                </span>
                <span className="sm:hidden">
                  We use cookies to improve your experience.
                </span>
              </p>

              {/* Buttons — always on-screen; on mobile they render above the text */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => dismiss("rejected")}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors min-w-[80px]"
                >
                  Reject
                </button>
                <button
                  onClick={() => dismiss("accepted")}
                  className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-semibold text-white bg-[#1E5FBF] hover:bg-[#163F7A] rounded-lg transition-colors min-w-[80px]"
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
