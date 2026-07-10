import Link from "next/link";
import Image from "next/image";

const products = [
  { name: "Hydrus", href: "/products/hydrus" },
  { name: "Subsonus", href: "/products/subsonus" },
  { name: "Subsonus Tag", href: "/products/subsonus-tag" },
  { name: "GNSS Compass", href: "/products/gnss-compass" },
];

// Email is TBC — placeholder only, swap when confirmed
const EMAIL_PLACEHOLDER = "info@advancednavigation.sk";

function FooterLogo() {
  return (
    <div className="flex flex-col leading-none select-none">
      <span className="text-white font-bold text-sm tracking-[0.18em] uppercase">ADVANCED</span>
      <span className="text-[#00B89F] font-bold text-sm tracking-[0.18em] uppercase">NAVIGATION</span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#163F7A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <FooterLogo />
            <p className="mt-4 text-white/50 text-sm leading-relaxed">
              Exclusive distributor of Advanced Navigation technology across Slovakia,
              Czech Republic, Austria &amp; Hungary.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Products</h3>
            <ul className="space-y-2.5">
              {products.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-white/50 hover:text-white text-sm transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-white/50 hover:text-white text-sm transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-white/50 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Contact</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="text-white/50 leading-snug">
                Mrázová 11, Rača<br />831 06 Bratislava, Slovakia
              </li>
              <li>
                <a href={`tel:+421949225542`} className="text-white/50 hover:text-white transition-colors">
                  +421 949 225 542
                </a>
              </li>
              <li>
                {/* Email TBC — placeholder */}
                <a href={`mailto:${EMAIL_PLACEHOLDER}`} className="text-white/50 hover:text-white transition-colors">
                  {EMAIL_PLACEHOLDER}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal line */}
        <div className="mt-10 pt-5 border-t border-white/10">
          <p className="text-white/25 text-xs leading-relaxed text-center sm:text-left">
            rkctechnology s. r. o., trading as Advanced Navigation &nbsp;·&nbsp; IČO: 57282145 &nbsp;·&nbsp; DIČ: 2122652576
          </p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Copyright + legal links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} Advanced Navigation Slovakia. All rights reserved.
            </p>
            <Link href="/terms" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">
              Privacy Policy
            </Link>
          </div>
          <p className="text-white/20 text-xs shrink-0">
            Powered by{" "}
            <a
              href="https://www.dunajmedia.sk/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors underline underline-offset-2"
            >
              DunajMedia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
