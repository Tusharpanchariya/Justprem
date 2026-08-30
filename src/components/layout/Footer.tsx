import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-forest text-ivory py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="font-serif text-3xl tracking-widest mb-4 text-saffron">
              JustPrem
            </h2>
            <p className="text-sm opacity-80 leading-relaxed font-serif italic text-lg">
              A Journey Into Devotion.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="text-xs tracking-widest uppercase mb-6 opacity-50">
              Explore
            </h3>
            <ul className="space-y-4 text-sm">
              {/* Removed Harmoniums link as requested */}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="text-xs tracking-widest uppercase mb-6 opacity-50">
              Information
            </h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/terms" className="hover:text-saffron transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-saffron transition-colors">Privacy Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-saffron transition-colors">Shipping Policy</Link></li>
              <li><Link href="/refunds" className="hover:text-saffron transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-xs tracking-widest uppercase mb-6 opacity-50">
              Connect
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="mailto:justprem108@gmail.com" className="hover:text-saffron transition-colors">
                  justprem108@gmail.com
                </a>
              </li>
              <li className="pt-4 flex space-x-6">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-saffron transition-colors uppercase tracking-wider text-xs">
                  Instagram
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-saffron transition-colors uppercase tracking-wider text-xs">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 text-xs opacity-50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} JustPrem. All rights reserved.</p>
          <p className="tracking-widest uppercase">Designed for the Journey</p>
        </div>
      </div>
    </footer>
  );
}
