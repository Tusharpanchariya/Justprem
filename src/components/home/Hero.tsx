import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-charcoal md:min-h-screen" aria-label="JustPrem harmonium collection">
      <Image
        src="/harmonium-images/mainpage.JPG"
        alt="JustPrem harmonium"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[54%_center] md:object-center"
      />
    </section>
  );
}
