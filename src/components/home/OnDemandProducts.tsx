"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  { slug: "kirtan-mini-deluxe", image: "/harmonium-images/kirtan/kirtan1.webp", name: "Kirtan Mini Deluxe Harmonium (27 keys) ON DEMAND", price: "\u20AC950.00", originalPrice: "\u20AC1,350.00" },
  { slug: "eclipse", image: "/harmonium-images/eclipse/eclipse.webp", name: "Just Prem \"Eclipse\" (32 keys) ON DEMAND", price: "\u20AC850.00", originalPrice: "\u20AC1,200.00" },
  { slug: "saffron", image: "/harmonium-images/saffron/saffron.webp", name: "Just Prem \"Saffron\" (32 Keys) ON DEMAND", price: "\u20AC850.00", originalPrice: "\u20AC1,200.00" },
  { slug: "aura-mini", image: "/harmonium-images/aura-mini/auramini.webp", name: "Just Prem \"Aura\" Mini (27 keys) ON DEMAND", price: "\u20AC850.00", originalPrice: "\u20AC1,200.00" },
  { slug: "sage", image: "/harmonium-images/sage/sage.webp", name: "Just Prem \"Sage\" (32 Keys) ON DEMAND", price: "\u20AC850.00", originalPrice: "\u20AC1,200.00" },
  { slug: "essence", image: "/harmonium-images/essence/essence.webp", name: "Just Prem \"Essence\" (27 Keys) ON DEMAND", price: "\u20AC850.00", originalPrice: "\u20AC1,200.00" },
];

export function OnDemandProducts() {
  return (
    <section className="bg-ivory px-6 pb-20 pt-12 md:pb-32 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 flex max-w-md flex-col items-start lg:mb-16">
          <span className="mb-2 text-[10px] uppercase tracking-widest text-charcoal/60 md:text-xs">Pre-order</span>
          <h2 className="mb-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-charcoal">On Demand</h2>
          <p className="mb-6 max-w-md text-sm leading-relaxed text-charcoal/70">These harmoniums are handcrafted upon request. We will inform you by email when your order is on its way.</p>
          <Link href="/harmoniums" className="inline-flex min-h-12 items-center justify-center rounded-full border border-charcoal/80 px-8 py-3 text-xs font-medium uppercase tracking-widest text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-ivory">Shop the Collection</Link>
        </motion.div>

        <div className="grid grid-cols-2 items-start gap-4 md:gap-6 lg:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative col-span-2 aspect-[4/5] w-full overflow-hidden rounded-sm bg-sandstone/10 shadow-sm lg:aspect-square">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/harmonium-images/preview-section.webp')" }} />
          </motion.div>

          {products.map((product, index) => (
            <motion.div key={product.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: (index + 1) * 0.1 }} className="group flex flex-col">
              <Link href={`/harmoniums/${product.slug}`} className="flex flex-col">
                <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-sm bg-sandstone/20">
                  <div className="absolute right-3 top-3 z-10 bg-charcoal px-2.5 py-1 text-[9px] font-medium uppercase tracking-widest text-ivory">Sold Out</div>
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url('${product.image}')` }} />
                  <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <h3 className="mb-1 font-serif text-sm leading-snug text-charcoal md:text-base">{product.name}</h3>
                <div className="flex items-center gap-2 text-xs tracking-widest md:text-sm"><span className="text-charcoal/80">{product.price}</span><span className="text-charcoal/40 line-through">{product.originalPrice}</span></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
