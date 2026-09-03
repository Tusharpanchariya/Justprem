import { HomeCollection } from "@/components/home/HomeCollection";
import { OnDemandProducts } from "@/components/home/OnDemandProducts";
import { AboutCollectionSection } from "@/components/home/AboutCollectionSection";
import { ReviewFeedback } from "@/components/home/ReviewFeedback";

export default function Home() {
  return (
    <>
      <HomeCollection />
      <OnDemandProducts />
      <ReviewFeedback />
      <AboutCollectionSection />
    </>
  );
}
