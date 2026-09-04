import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-charcoal" aria-label="JustPrem harmonium collection">
      <Image
        src="/harmonium-images/mainpage.JPG"
        alt="JustPrem harmonium"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </section>
  );
}
