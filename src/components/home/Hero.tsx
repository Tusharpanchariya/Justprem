import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest pt-20 md:min-h-screen md:bg-charcoal md:pt-0" aria-label="JustPrem harmonium collection">
      <Image
        src="/harmonium-images/mainpage.JPG"
        alt="JustPrem harmonium"
        priority
        width={6528}
        height={4352}
        sizes="(max-width: 767px) 100vw, 100vw"
        className="block h-auto w-full object-contain md:absolute md:inset-0 md:h-full md:object-cover md:object-center"
      />
    </section>
  );
}
