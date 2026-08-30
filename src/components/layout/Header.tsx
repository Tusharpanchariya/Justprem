"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/context/CartContext";

const navLinks: { name: string; href: string }[] = [];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-ivory/90 backdrop-blur-md shadow-sm py-4 text-charcoal"
          : "bg-transparent py-6 text-ivory"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl tracking-widest relative z-50"
        >
          JustPrem
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:opacity-70 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6 relative z-50">
          <button className="text-sm tracking-wider uppercase hover:opacity-70 transition-opacity">
            EN
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="hover:opacity-70 transition-opacity relative"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-saffron text-ivory text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center space-x-4 relative z-50">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="hover:opacity-70 transition-opacity relative"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-saffron text-ivory text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hover:opacity-70 transition-opacity p-2 -mr-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-forest text-ivory pt-32 px-6 flex flex-col z-40"
          >
            <nav className="flex flex-col space-y-8 text-2xl font-serif">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-saffron transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-12 flex justify-between items-center border-t border-white/10 pt-8">
              <button className="text-sm tracking-wider uppercase hover:text-saffron transition-colors">
                EN / Language
              </button>
              <div className="flex space-x-4">
                {/* Socials can go here */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
