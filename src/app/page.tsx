import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeaturedHarmonium } from "@/components/home/FeaturedHarmonium";
import { HomeCollection } from "@/components/home/HomeCollection";
import { HomeRetreats } from "@/components/home/HomeRetreats";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedHarmonium />
      <HomeCollection />
      <HomeRetreats />
      {/* Additional sections will be added here:
          - Community
          - Story
          - Testimonials
          - Gallery
      */}
    </>
  );
}
