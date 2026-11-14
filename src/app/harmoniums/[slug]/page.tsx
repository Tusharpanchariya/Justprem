"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { mockHarmoniums } from "@/lib/data/mockProducts";
import { useCart } from "@/lib/context/CartContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AURA_MINI_FINISHES, AuraFinishPreview } from "@/components/harmoniums/AuraFinishPreview";

export default function HarmoniumDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const product = mockHarmoniums.find(
    (h) =>
      h.slug === resolvedParams.slug ||
      (resolvedParams.slug.toLowerCase().startsWith("matangi(") && h.slug === "matangi") ||
      (resolvedParams.slug === "agni" && h.slug === "prem-agni") ||
      (resolvedParams.slug === "royal-rose" && h.slug === "radha-prema")
  );
  const { addItem, setIsCartOpen } = useCart();
  const router = useRouter();

  if (!product) {
    notFound();
  }

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState("#70291D");
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: `${product.name}${isAuraMini ? ` · ${selectedFinish} finish` : ""}`,
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
  const isAuraMini = product.slug === "aura-mini";
  const isAuraSaraswati = product.slug === "saraswati";
  const description = product.fullDescription || product.shortDescription;
  const auraDescriptionParts = description.split("“Aura” – a");
  const selectedAuraFinish = AURA_MINI_FINISHES.find((finish) => finish.name === selectedFinish) || AURA_MINI_FINISHES[2];
  const isSoldOut = product.availability === "SOLD_OUT";

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24">
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 md:px-12 lg:grid-cols-2 lg:gap-14">
        
        {/* Left Side: Images (Sticky on Desktop) */}
        <div className="relative z-20 flex min-w-0 flex-col gap-4 lg:sticky lg:top-28 lg:h-fit lg:flex-row lg:gap-6 lg:self-start lg:pt-4">
          {/* Thumbnails (Vertical on MD+) */}
          {images.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 flex w-full flex-shrink-0 gap-3 overflow-x-auto overflow-y-hidden pb-1 lg:order-none lg:max-h-[calc(100vh-9rem)] lg:w-24 lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0 scrollbar-hide"
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
            className="group order-1 relative min-w-0 flex-1 overflow-hidden rounded-sm bg-transparent shadow-sm lg:order-none"
          >
            {isAuraMini ? <AuraFinishPreview src={activeImage} finish={selectedAuraFinish} /> : <img
              src={activeImage}
              alt={product.name}
              className="block h-auto w-full object-contain object-center transition-opacity duration-300 lg:max-h-[calc(100vh-9rem)]"
            />}
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
          className="relative z-0 flex min-w-0 flex-col py-4 lg:pt-4"
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
            {isAuraSaraswati && auraDescriptionParts.length > 1 ? <>
              {auraDescriptionParts[0]}“Aura” –<br className="sm:hidden" />{" "}a{auraDescriptionParts.slice(1).join("“Aura” – a")}
            </> : description}
          </div>

          {isAuraMini && (
            <section className="mb-10 border-y border-charcoal/10 py-6" aria-label="Customize Aura Mini finish">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-serif text-2xl text-charcoal">Customize your finish</h2>
                <p className="text-xs text-charcoal/60">Selected: <span className="font-medium text-charcoal">{selectedFinish}</span></p>
              </div>
              <p className="mt-2 text-sm text-charcoal/65">Choose a colour to preview it on the harmonium.</p>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {AURA_MINI_FINISHES.map((finish) => (
                  <button
                    key={finish.name}
                    type="button"
                    aria-pressed={selectedFinish === finish.name}
                    onClick={() => setSelectedFinish(finish.name)}
                    className={`flex min-h-11 items-center gap-2 border px-2.5 text-left text-xs transition-colors ${selectedFinish === finish.name ? "border-forest bg-forest/5 text-charcoal" : "border-charcoal/15 hover:border-charcoal/40"}`}
                  >
                    <span aria-hidden="true" className="h-5 w-5 shrink-0 rounded-full border border-charcoal/15" style={{ backgroundColor: finish.hex }} />
                    {finish.name}
                  </button>
                ))}
              </div>
            </section>
          )}

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
