import Link from "next/link";

const products = [
  { name: "Hydrus", href: "/products/hydrus" },
  { name: "Subsonus", href: "/products/subsonus" },
  { name: "Subsonus Tag", href: "/products/subsonus-tag" },
  { name: "GNSS Compass", href: "/products/gnss-compass" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="text-white font-bold text-xl tracking-[0.2em] uppercase">RUSS</span>
            <p className="mt-3 text-white/50 text-sm leading-relaxed">
              Advanced navigation technology for Central Europe.
            </p>
            <p className="mt-2 text-white/40 text-xs">Bratislava, Slovakia</p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">Products</h3>
            <ul className="space-y-2">
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
            <h3 className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white/50 hover:text-white text-sm transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-white/50 hover:text-white text-sm transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-white/50 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-white/50">
              <li>Bratislava, Slovakia</li>
              <li>
                <a href="mailto:info@russ.sk" className="hover:text-white transition-colors">
                  info@russ.sk
                </a>
              </li>
              <li className="text-white/30 text-xs">+421 (TBC)</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Russ. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">Bratislava, Slovakia</p>
        </div>
      </div>
    </footer>
  );
}
