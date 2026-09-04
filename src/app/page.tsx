import { HomeCollection } from "@/components/home/HomeCollection";
import { OnDemandProducts } from "@/components/home/OnDemandProducts";
import { AboutCollectionSection } from "@/components/home/AboutCollectionSection";
import { ReviewFeedback } from "@/components/home/ReviewFeedback";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeCollection />
      <OnDemandProducts />
      <ReviewFeedback />
      <AboutCollectionSection />
    </>
  );
}
