"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { mockHarmoniums } from "@/lib/data/mockProducts";
import { useCart } from "@/lib/context/CartContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HarmoniumDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const product = mockHarmoniums.find(h => h.slug === resolvedParams.slug);
  const { addItem, setIsCartOpen } = useCart();
  const router = useRouter();

  if (!product) {
    notFound();
  }

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      priceEUR: product.priceEUR,
      image: product.image
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartOpen(false);
    router.push("/checkout");
  };

  const images = product.images || [product.image];
  const activeImage = images[activeImageIdx];
  const isSoldOut = product.availability === "SOLD_OUT";

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24">
      <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Images (Sticky on Desktop) */}
        <div className="relative flex flex-col gap-4 md:sticky md:top-32 md:h-fit md:flex-row md:gap-6">
          {/* Thumbnails (Vertical on MD+) */}
          {images.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 flex w-full gap-3 overflow-x-auto overflow-y-hidden pb-1 md:order-none md:max-h-[70vh] md:w-24 md:flex-col md:overflow-x-hidden md:overflow-y-auto md:pb-0 flex-shrink-0 scrollbar-hide"
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-sm overflow-hidden border transition-colors ${
                    activeImageIdx === idx ? 'border-charcoal opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </motion.div>
          )}

          {/* Main Image */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="order-1 relative aspect-square rounded-sm overflow-hidden shadow-sm flex-1 group bg-white sm:aspect-[4/3] md:order-none"
          >
            <img 
              src={activeImage} 
              alt={product.name}
              className="w-full h-full object-cover object-center transition-opacity duration-300"
            />
            {images.length > 1 && (
              <>
                {/* Left Arrow Area */}
                <button 
                  onClick={prevImage} 
                  aria-label="Previous image"
                  className="absolute inset-y-0 left-0 flex w-1/3 items-center justify-start px-3 opacity-100 transition-opacity sm:px-4 md:opacity-0 md:group-hover:opacity-100"
                >
                  <div className="w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal shadow-sm">
                    <ChevronLeft className="w-6 h-6" />
                  </div>
                </button>
                {/* Right Arrow Area */}
                <button 
                  onClick={nextImage} 
                  aria-label="Next image"
                  className="absolute inset-y-0 right-0 flex w-1/3 items-center justify-end px-3 opacity-100 transition-opacity sm:px-4 md:opacity-0 md:group-hover:opacity-100"
                >
                  <div className="w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal shadow-sm">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </button>
              </>
            )}
          </motion.div>
        </div>

        {/* Right Side: Details (Scrollable) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col py-4"
        >
          <h1 className="font-serif font-light text-[clamp(2rem,6vw,3rem)] text-charcoal mb-4 tracking-wide leading-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xl tracking-widest uppercase text-charcoal font-medium">
              {product.availability.replace("_", " ")}
            </span>
          </div>
          
          <div className="flex items-end gap-4 mb-8">
            <span className="text-2xl font-medium text-charcoal">
              €{product.priceEUR.toLocaleString()}
            </span>
            {product.originalPriceEUR && (
              <span className="text-lg line-through text-charcoal/60 mb-[2px]">
                €{product.originalPriceEUR.toLocaleString()}
              </span>
            )}
          </div>

          <div className="font-sans text-charcoal leading-relaxed whitespace-pre-line mb-10 text-base">
            {product.fullDescription || product.shortDescription}
          </div>

          {!isSoldOut && (
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex items-center justify-center min-h-[56px] px-8 py-4 bg-forest text-ivory uppercase tracking-widest text-sm hover:bg-forest/90 transition-colors flex-1"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex items-center justify-center min-h-[56px] px-8 py-4 border border-forest text-forest uppercase tracking-widest text-sm hover:bg-forest/5 transition-colors flex-1"
                >
                  Buy Now
                </button>
              </>
            </div>
          )}

          {/* Specifications */}
          <div className="border-t border-charcoal/10 pt-10">
            <div className="flex flex-col gap-6 text-sm text-charcoal">
              {product.specifications ? (
                product.specifications.map((spec: { label: string; value: string }, idx: number) => (
                  <div key={idx} className="flex flex-col md:flex-row md:gap-4 border-b border-charcoal/5 pb-4">
                    <span className="font-semibold min-w-[120px] mb-1 md:mb-0">{spec.label}:</span>
                    <span className="opacity-90">{spec.value}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex flex-col md:flex-row md:gap-4 border-b border-charcoal/5 pb-4">
                    <span className="font-semibold min-w-[120px] mb-1 md:mb-0">Material:</span>
                    <span className="opacity-90">{product.name === "Terra" ? "Aged Teak Wood" : "Premium Pine Wood"}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4 border-b border-charcoal/5 pb-4">
                    <span className="font-semibold min-w-[120px] mb-1 md:mb-0">Finish:</span>
                    <span className="opacity-90">Natural Matte Finish</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4 border-b border-charcoal/5 pb-4">
                    <span className="font-semibold min-w-[120px] mb-1 md:mb-0">Weight:</span>
                    <span className="opacity-90">Approx. 6.5 kg</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4 border-b border-charcoal/5 pb-4">
                    <span className="font-semibold min-w-[120px] mb-1 md:mb-0">Accessories:</span>
                    <span className="opacity-90">Padded Travel Bag included</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {isSoldOut && (
            <div className="mt-10">
              <button
                type="button"
                disabled
                className="flex w-full items-center justify-center min-h-[56px] px-8 py-4 bg-forest text-ivory uppercase tracking-widest text-sm cursor-not-allowed opacity-50"
              >
                Sold Out
              </button>
            </div>
          )}

        </motion.div>
      </section>
    </div>
  );
}
