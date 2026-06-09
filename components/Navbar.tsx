"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

const products = [
  { name: "Hydrus", href: "/products/hydrus" },
  { name: "Subsonus", href: "/products/subsonus" },
  { name: "Subsonus Tag", href: "/products/subsonus-tag" },
  { name: "GNSS Compass", href: "/products/gnss-compass" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A1628]/95 backdrop-blur-md shadow-lg"
          : "bg-[#0A1628]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-white font-bold text-xl tracking-[0.2em] uppercase">
              RUSS
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`nav-link text-sm font-medium transition-colors ${
                pathname === "/" ? "text-[#2D7DD2]" : "text-white/80 hover:text-white"
              }`}
            >
              Home
            </Link>

            {/* Products dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProductsOpen((v) => !v)}
                className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Products
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-8 left-0 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                  >
                    {products.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="block px-4 py-2.5 text-sm text-[#0A1628] hover:bg-[#F8FAFC] hover:text-[#2D7DD2] transition-colors"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                pathname === "/about" ? "text-[#2D7DD2]" : "text-white/80 hover:text-white"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors ${
                pathname === "/contact" ? "text-[#2D7DD2]" : "text-white/80 hover:text-white"
              }`}
            >
              Contact
            </Link>

            <Link
              href="/contact"
              className="ml-2 px-4 py-2 bg-[#2D7DD2] text-white text-sm font-medium rounded-lg hover:bg-[#2568b5] transition-colors"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0A1628] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <Link href="/" className="block px-3 py-2 text-white/80 hover:text-white text-sm font-medium rounded">
                Home
              </Link>

              <div>
                <button
                  onClick={() => setMobileProductsOpen((v) => !v)}
                  className="flex items-center justify-between w-full px-3 py-2 text-white/80 hover:text-white text-sm font-medium rounded"
                >
                  Products
                  <ChevronDown size={14} className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileProductsOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    {products.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="block px-3 py-2 text-white/60 hover:text-white text-sm rounded"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about" className="block px-3 py-2 text-white/80 hover:text-white text-sm font-medium rounded">
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-white/80 hover:text-white text-sm font-medium rounded">
                Contact
              </Link>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="block px-4 py-2.5 bg-[#2D7DD2] text-white text-sm font-medium rounded-lg text-center"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
