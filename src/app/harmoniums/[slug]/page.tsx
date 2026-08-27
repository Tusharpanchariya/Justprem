"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { mockHarmoniums } from "@/lib/data/mockProducts";
import { InteractiveKeyboard } from "@/components/harmonium/InteractiveKeyboard";
import { Harmonium3DViewer } from "@/components/harmonium/Harmonium3DViewer";
import { useCart } from "@/lib/context/CartContext";

export default function HarmoniumDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const product = mockHarmoniums.find(h => h.slug === resolvedParams.slug);
  const { addItem } = useCart();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      priceINR: product.priceINR,
      image: product.image
    });
  };

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24">
      {/* Hero Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative aspect-square rounded-sm overflow-hidden shadow-sm w-full"
        >
          {/* Interactive 3D Viewer */}
          <Harmonium3DViewer />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4 uppercase tracking-widest">
            {product.name}
          </h1>
          
          <p className="text-sm tracking-widest uppercase text-wood mb-8">
            {product.keyCount} Keys · {product.categories.join(" & ")}
          </p>
          
          <p className="font-serif italic text-xl md:text-2xl text-charcoal/80 mb-8 leading-relaxed">
            {product.shortDescription}
          </p>
          
          <div className="flex items-end gap-6 mb-12">
            <span className="text-3xl text-charcoal">₹{product.priceINR.toLocaleString()}</span>
            <span className="text-sm tracking-widest uppercase mb-1 px-3 py-1 bg-forest/10 text-forest">
              {product.availability.replace("_", " ")}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              className="px-8 py-4 bg-forest text-ivory uppercase tracking-widest text-xs hover:bg-forest/90 transition-colors"
            >
              Add to Cart
            </button>
            <button className="px-8 py-4 border border-forest text-forest uppercase tracking-widest text-xs hover:bg-forest/5 transition-colors">
              Buy Now
            </button>
          </div>
        </motion.div>
      </section>

      {/* Interactive Feature Section */}
      <section className="bg-sandstone/10 py-32 border-y border-sandstone/30">
        <div className="px-6 md:px-12 max-w-5xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 uppercase tracking-widest">
            Hear The Instrument
          </h2>
          <p className="text-sm tracking-widest text-charcoal/60 uppercase">
            A Journey In Sound
          </p>
        </div>
        
        <InteractiveKeyboard />
      </section>

      {/* Details Section */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto py-32">
        <h2 className="font-serif text-3xl text-charcoal mb-12 uppercase tracking-widest text-center">
          Crafted for the Journey
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-8 text-sm text-charcoal/80">
          <div className="border-b border-charcoal/10 pb-4">
            <span className="uppercase tracking-widest text-xs block mb-1 opacity-60">Material</span>
            {product.name === "Terra" ? "Aged Teak Wood" : "Premium Pine Wood"}
          </div>
          <div className="border-b border-charcoal/10 pb-4">
            <span className="uppercase tracking-widest text-xs block mb-1 opacity-60">Finish</span>
            Natural Matte Finish
          </div>
          <div className="border-b border-charcoal/10 pb-4">
            <span className="uppercase tracking-widest text-xs block mb-1 opacity-60">Weight</span>
            Approx. 6.5 kg
          </div>
          <div className="border-b border-charcoal/10 pb-4">
            <span className="uppercase tracking-widest text-xs block mb-1 opacity-60">Accessories</span>
            Padded Travel Bag included
          </div>
        </div>
      </section>
    </div>
  );
}
