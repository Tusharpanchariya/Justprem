import { Hero } from "@/components/home/Hero";
import { HomeCollection } from "@/components/home/HomeCollection";
import { OnDemandProducts } from "@/components/home/OnDemandProducts";
import { AboutCollectionSection } from "@/components/home/AboutCollectionSection";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeCollection />
      <OnDemandProducts />
      <AboutCollectionSection />
    </>
  );
}
