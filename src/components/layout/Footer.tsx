import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#121315] text-[#e5e5e5] py-12 md:py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left: Brand & Business Name */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="font-serif text-2xl tracking-widest text-white mb-2">
              JustPrem
            </Link>
            <p className="text-xs text-neutral-400 font-light max-w-sm leading-relaxed">
              a brand/trading name operated by VITTHAL PREM TRAVELS LLP
            </p>
          </div>

          {/* Center: Social Icons */}
          <div className="flex items-center space-x-6 text-neutral-300">
            <a
              href="https://www.instagram.com/justprem_community/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@justpremfoundation"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          {/* Right: Contact Information */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right text-xs space-y-1.5 text-neutral-300">
            <a
              href="mailto:justprem108@gmail.com"
              className="hover:underline hover:text-white transition-colors"
            >
              justprem108@gmail.com
            </a>
            <a
              href="tel:+919289001698"
              className="hover:text-white transition-colors"
            >
              +91 9289001698
            </a>
            <a
              href="tel:+919971141996"
              className="hover:text-white transition-colors"
            >
              +91 9971141996
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
