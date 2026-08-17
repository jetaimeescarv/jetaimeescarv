"use client";

import { useEffect, useRef, useState } from "react";

const products = [
  {
    number: "01",
    name: "LEANOR SCARV",
    description:
      "A graceful expression of feminine elegance, created to become part of your everyday story.",
    images: [
      "/image/product/leanor-scarv/FTO09783.jpg",
      "/image/product/leanor-scarv/FTO09784.jpg",
      "/image/product/leanor-scarv/FTO09791.jpg",
      "/image/product/leanor-scarv/FTO09794.jpg",
      "/image/product/leanor-scarv/FTO09795.jpg",
      "/image/product/leanor-scarv/FTO09799.jpg",
    ],
  },
  {
    number: "02",
    name: "AMORA SCARV",
    description:
      "Soft, refined and effortlessly feminine — a timeless piece for every beautiful moment.",
    images: [
      "/image/product/amora-scarv/FTO09745.jpg",
      "/image/product/amora-scarv/FTO09748.jpg",
      "/image/product/amora-scarv/FTO09753.jpg",
      "/image/product/amora-scarv/FTO09757.jpg",
      "/image/product/amora-scarv/FTO09767.jpg",
      "/image/product/amora-scarv/FTO09771.jpg",
    ],
  },
];

const videos = [
  "/videos/IMG_7501.MOV",
  "/videos/IMG_7502.MOV",
];

const WHATSAPP = "https://wa.me/628135153368";

function ProductSlider({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [current, setCurrent] = useState(0);

  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const previous = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStart.current === null || touchEnd.current === null) return;

    const distance = touchStart.current - touchEnd.current;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        next();
      } else {
        previous();
      }
    }

    touchStart.current = null;
    touchEnd.current = null;
  };

  return (
    <div
      className="group relative h-[580px] overflow-hidden bg-[#d4c0a8] md:h-[680px]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* IMAGES */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`${name} ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${
              index === current
                ? "scale-100 opacity-100"
                : "scale-[1.04] opacity-0"
            }`}
            draggable={false}
          />
        ))}
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />

      {/* FRAME */}
      <div className="pointer-events-none absolute inset-5 z-10 border border-white/50 md:inset-7" />

      {/* LAUNCHING */}
      <div className="absolute left-8 top-8 z-20 bg-[#722b2d] px-4 py-2">
        <span className="text-[8px] uppercase tracking-[0.3em] text-white">
          Launching
        </span>
      </div>

      {/* COUNTER */}
      <div className="absolute right-8 top-8 z-20">
        <p className="text-[9px] uppercase tracking-[0.25em] text-white/80">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </p>
      </div>

      {/* PREVIOUS */}
      <button
        onClick={previous}
        aria-label={`Previous ${name} image`}
        className="absolute left-7 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/10 text-white backdrop-blur-sm transition hover:bg-white hover:text-[#352823]"
      >
        ←
      </button>

      {/* NEXT */}
      <button
        onClick={next}
        aria-label={`Next ${name} image`}
        className="absolute right-7 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/10 text-white backdrop-blur-sm transition hover:bg-white hover:text-[#352823]"
      >
        →
      </button>

      {/* BOTTOM INFO */}
      <div className="absolute bottom-8 left-8 right-8 z-20 flex items-end justify-between">
        <div>
          <p className="text-[8px] uppercase tracking-[0.4em] text-white/80">
            JETAIMESCARV
          </p>

          <p className="mt-2 font-serif text-xl italic text-white">
            The Beginning
          </p>
        </div>

        <span className="text-xl text-[#d9bc86]">✦</span>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-9 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to image ${index + 1}`}
            className={`h-px transition-all duration-500 ${
              index === current
                ? "w-8 bg-white"
                : "w-3 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleHeroVideoTap = () => {
    const video = heroVideoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const storyRef = useRef<HTMLElement | null>(null);
  const [storyVisible, setStoryVisible] = useState(false);

  useEffect(() => {
    const element = storyRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStoryVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5efe6] text-[#352823]">

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header className="fixed left-0 right-0 top-0 z-50 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />

        <div className="relative mx-auto flex h-[88px] max-w-[1800px] items-center justify-between px-7 md:px-12 lg:px-16">

          {/* DESKTOP LEFT */}
          <nav className="hidden items-center gap-10 md:flex">
            <a
              href="#home"
              className="text-[9px] uppercase tracking-[0.4em] transition hover:opacity-60"
            >
              Home
            </a>

            <a
              href="#story"
              className="text-[9px] uppercase tracking-[0.4em] transition hover:opacity-60"
            >
              Story
            </a>

            <a
              href="#shop"
              className="text-[9px] uppercase tracking-[0.4em] transition hover:opacity-60"
            >
              Shop
            </a>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Open menu"
          >
            <span className="h-px w-6 bg-white" />
            <span className="h-px w-4 bg-white" />
          </button>

          {/* LOGO */}
          <a
            href="#home"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <div className="font-serif text-[21px] tracking-[0.2em]">
              JETAIMESCARV
            </div>

            <div className="mt-1 text-[7px] uppercase tracking-[0.5em] text-white/70">
              The beauty of who you are
            </div>
          </a>

          {/* ORDER */}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="text-[9px] uppercase tracking-[0.4em] transition hover:opacity-60"
          >
            Order
          </a>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="absolute left-0 right-0 top-[88px] bg-[#30221f]/95 px-8 py-10 backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-7 text-center">
              <a
                href="#home"
                onClick={() => setMenuOpen(false)}
                className="text-[10px] uppercase tracking-[0.45em]"
              >
                Home
              </a>

              <a
                href="#story"
                onClick={() => setMenuOpen(false)}
                className="text-[10px] uppercase tracking-[0.45em]"
              >
                Story
              </a>

              <a
                href="#shop"
                onClick={() => setMenuOpen(false)}
                className="text-[10px] uppercase tracking-[0.45em]"
              >
                Shop
              </a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="text-[10px] uppercase tracking-[0.45em] text-[#d0b47b]"
              >
                Order
              </a>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================
          HERO VIDEO
      ========================================================= */}

      <section
        id="home"
        className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-[#2d211e]"
      >
        <video
  ref={heroVideoRef}
  src="/videos/IMG_7498.MOV"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  onClick={handleHeroVideoTap}
  className="absolute inset-0 h-full w-full object-cover"
/>

       <div className="pointer-events-none absolute inset-0 bg-black/20" />

<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" />

        <div className="pointer-events-none absolute inset-5 border border-white/30 md:inset-8" />

        <div className="absolute right-8 top-[105px] hidden md:block">
          <p className="text-[8px] uppercase tracking-[0.45em] text-white/70">
            JETAIMESCARV · 2026
          </p>
        </div>

        <div className="absolute bottom-12 left-7 right-7 md:bottom-16 md:left-16 lg:left-24">
          <p className="mb-5 text-[9px] uppercase tracking-[0.55em] text-white/75">
            The Beginning · Collection 01
          </p>

          <h1 className="max-w-[900px] font-serif text-[60px] leading-[0.85] tracking-[-0.03em] text-white sm:text-[80px] md:text-[110px] lg:text-[135px]">
            Elegance,
            <br />
            <span className="italic text-[#ead7b2]">
              reimagined.
            </span>
          </h1>

          <div className="mt-8 flex items-center gap-6">
            <a
              href="#shop"
              className="border border-white/70 px-7 py-4 text-[9px] uppercase tracking-[0.35em] text-white transition hover:bg-white hover:text-[#352823]"
            >
              Shop Collection
            </a>

            <span className="hidden text-[9px] uppercase tracking-[0.35em] text-white/60 sm:block">
              The beauty of who you are
            </span>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden flex-col items-center gap-3 md:flex">
          <span className="text-[7px] uppercase tracking-[0.4em] text-white/60">
            Scroll
          </span>

          <span className="h-14 w-px bg-white/40" />
        </div>
      </section>

      {/* =========================================================
          MANIFESTO
      ========================================================= */}

      <section className="bg-[#f5efe6] px-7 py-28 md:px-14 md:py-40">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-[0.35fr_1fr] md:gap-24">

          <div className="hidden md:block">
            <p className="text-[8px] uppercase tracking-[0.45em] text-[#987546]">
              01
            </p>

            <div className="mt-5 h-px w-16 bg-[#b79a69]" />
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#987546]">
              A New Perspective
            </p>

            <h2 className="mt-8 max-w-[1000px] font-serif text-5xl leading-[0.95] md:text-7xl lg:text-[100px]">
              For the woman who
              <br />
              <span className="italic text-[#722b2d]">
                knows who she is.
              </span>
            </h2>

            <div className="mt-12 grid max-w-[900px] gap-8 md:grid-cols-2">
              <p className="text-[12px] leading-7 text-[#75645b]">
                JETAIMESCARV was born from a simple belief — elegance should
                never ask you to become someone else.
              </p>

              <p className="text-[12px] leading-7 text-[#75645b]">
                It should simply reveal what has always been there. Softness,
                confidence, femininity and you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          OUR STORY
      ========================================================= */}

      <section
        ref={storyRef}
        id="story"
        className="bg-[#30221f] text-[#eee2d5]"
      >
        <div className="grid min-h-[850px] md:grid-cols-2">

          {/* IMAGE */}
          <div className="relative min-h-[650px] overflow-hidden md:min-h-0">
            <img
              src="/image/product/amora-scarv/FTO09745.jpg"
              alt="JETAIMESCARV Our Story"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1800ms] ${
                storyVisible
                  ? "scale-100 opacity-100"
                  : "scale-110 opacity-0"
              }`}
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-8 left-8">
              <p className="text-[8px] uppercase tracking-[0.45em] text-white/70">
                JETAIMESCARV · The Maison
              </p>
            </div>
          </div>

          {/* STORY CONTENT */}
          <div className="flex items-center px-8 py-24 md:px-14 lg:px-24">
            <div className="max-w-[650px]">

              <p className="text-[9px] uppercase tracking-[0.5em] text-[#c5a66d]">
                Our Story
              </p>

              <h2 className="mt-7 font-serif text-6xl leading-[0.85] md:text-8xl">
                A story
                <br />
                <span className="italic text-[#d0b47b]">
                  begins here.
                </span>
              </h2>

              <p className="mt-10 max-w-lg text-[13px] leading-8 text-[#b9aaa1]">
                Every beautiful story begins with a dream. Ours began with the
                desire to create pieces that feel intimate, feminine and
                timeless.
              </p>

              <p className="mt-6 max-w-lg text-[13px] leading-8 text-[#b9aaa1]">
                Leanor and Amora became the first expressions of that dream —
                two scarves, two personalities, one beginning.
              </p>

              <div className="mt-14 flex items-center gap-5">
                <span className="h-px w-14 bg-[#b79a69]" />

                <span className="text-[8px] uppercase tracking-[0.4em] text-[#c5a66d]">
                  Chapter I · 2026
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SHOP
      ========================================================= */}

      <section
        id="shop"
        className="bg-[#e9dece] px-6 py-28 md:px-12 lg:py-40"
      >
        <div className="mx-auto max-w-[1500px]">

          {/* SHOP HEADER */}
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

            <div>
              <p className="text-[9px] uppercase tracking-[0.5em] text-[#967143]">
                Shop · Collection 01
              </p>

              <h2 className="mt-6 font-serif text-6xl leading-[0.82] sm:text-7xl md:text-[105px]">
                The
                <br />
                <span className="italic text-[#722b2d]">
                  Beginning.
                </span>
              </h2>
            </div>

            <p className="max-w-xs text-[11px] leading-7 text-[#75645b]">
              Two scarves.
              <br />
              Two expressions.
              <br />
              One beginning.
            </p>

          </div>

          {/* =====================================================
              LEANOR
          ===================================================== */}

          <div className="mt-20 grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-end">

            <ProductSlider
              images={products[0].images}
              name={products[0].name}
            />

            <div className="pb-6 md:pb-14">

              <p className="text-[8px] uppercase tracking-[0.45em] text-[#967143]">
                Chapter I · 01
              </p>

              <h3 className="mt-5 font-serif text-5xl leading-[0.9] md:text-6xl">
                Leanor
                <br />
                <span className="italic text-[#722b2d]">
                  Scarv.
                </span>
              </h3>

              <p className="mt-7 max-w-sm text-[12px] leading-7 text-[#75645b]">
                A graceful expression of feminine elegance, created to become
                part of your everyday story.
              </p>

              {/* PRICE */}
              <div className="mt-8">
                <p className="text-sm text-[#9a8a7e] line-through">
                  Rp138.900
                </p>

                <p className="mt-1 font-serif text-3xl text-[#722b2d]">
                  Rp119.000
                </p>

                <p className="mt-2 text-[8px] uppercase tracking-[0.35em] text-[#967143]">
                  Launching Price
                </p>
              </div>

              <a
  href="https://wa.me/628135153368?text=Halo%20JETAIMESCARV%2C%20saya%20tertarik%20untuk%20membeli%20Leanor%20Scarv%20dengan%20harga%20launching%20Rp119.000.%20Apakah%20produknya%20masih%20tersedia%3F"
  target="_blank"
  rel="noreferrer"
  className="mt-7 inline-flex border border-[#80644f] px-7 py-4 text-[9px] uppercase tracking-[0.3em] transition hover:bg-[#392824] hover:text-white"
>
  Shop Leanor →
</a>

            </div>
          </div>

          {/* =====================================================
              AMORA
          ===================================================== */}

          <div className="mt-28 grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:items-end">

            <div className="pb-6 md:pb-14 md:pl-8">

              <p className="text-[8px] uppercase tracking-[0.45em] text-[#967143]">
                Chapter II · 02
              </p>

              <h3 className="mt-5 font-serif text-5xl leading-[0.9] md:text-6xl">
                Amora
                <br />
                <span className="italic text-[#722b2d]">
                  Scarv.
                </span>
              </h3>

              <p className="mt-7 max-w-sm text-[12px] leading-7 text-[#75645b]">
                Soft, refined and effortlessly feminine — a timeless piece for
                every beautiful moment.
              </p>

              {/* PRICE */}
              <div className="mt-8">
                <p className="text-sm text-[#9a8a7e] line-through">
                  Rp138.900
                </p>

                <p className="mt-1 font-serif text-3xl text-[#722b2d]">
                  Rp119.000
                </p>

                <p className="mt-2 text-[8px] uppercase tracking-[0.35em] text-[#967143]">
                  Launching Price
                </p>
              </div>

              <a
  href="https://wa.me/628135153368?text=Halo%20JETAIMESCARV%2C%20saya%20tertarik%20untuk%20membeli%20Amora%20Scarv%20dengan%20harga%20launching%20Rp119.000.%20Apakah%20produknya%20masih%20tersedia%3F"
  target="_blank"
  rel="noreferrer"
  className="mt-7 inline-flex border border-[#80644f] px-7 py-4 text-[9px] uppercase tracking-[0.3em] transition hover:bg-[#392824] hover:text-white"
>
  Shop Amora →
</a>
            </div>

            <ProductSlider
              images={products[1].images}
              name={products[1].name}
            />

          </div>

        </div>
      </section>

      {/* =========================================================
          VIDEO JOURNAL
      ========================================================= */}

      <section className="bg-[#30221f] px-6 py-28 text-[#eee2d5] md:px-12 lg:py-36">
        <div className="mx-auto max-w-[1500px]">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>
              <p className="text-[9px] uppercase tracking-[0.5em] text-[#c5a66d]">
                JETAIMESCARV · Journal
              </p>

              <h2 className="mt-5 font-serif text-5xl leading-none sm:text-6xl md:text-8xl">
                In
                <br />
                <span className="italic text-[#d0b47b]">
                  Motion.
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-[12px] leading-7 text-[#aa9b91]">
              A glimpse into the world behind the beginning. Quiet moments,
              soft details and the beauty of becoming.
            </p>

          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">

            {videos.map((video, index) => (
              <div
                key={video}
                className="group relative overflow-hidden bg-[#201714]"
              >

                <video
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-[560px] w-full object-cover transition duration-1000 group-hover:scale-[1.03] md:h-[700px]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5" />

                <div className="absolute left-5 top-5 border border-white/30 px-3 py-2">
                  <span className="text-[8px] uppercase tracking-[0.3em] text-white">
                    0{index + 1}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[8px] uppercase tracking-[0.4em] text-white/70">
                    JETAIMESCARV
                  </p>

                  <p className="mt-2 font-serif text-xl italic text-white">
                    The Beginning
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL STATEMENT
      ========================================================= */}

      <section className="relative overflow-hidden px-7 py-32 text-center md:px-12">

        <div className="mx-auto max-w-4xl">

          <p className="text-[9px] uppercase tracking-[0.5em] text-[#967143]">
            JETAIMESCARV
          </p>

          <h2 className="mt-7 font-serif text-5xl leading-tight sm:text-6xl md:text-7xl">
            The beauty of who you are
            <br />
            <span className="italic text-[#722b2d]">
              is enough.
            </span>
          </h2>

          <a
            href="#shop"
            className="mt-10 inline-block border-b border-[#a17b46] pb-2 text-[9px] uppercase tracking-[0.35em] text-[#705548]"
          >
            Explore The Beginning
          </a>

        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-[#30221f] px-7 py-16 text-[#eee2d5] md:px-12">

        <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-3">

          {/* BRAND */}
          <div>
            <p className="font-serif text-3xl tracking-[0.12em]">
              JETAIMESCARV
            </p>

            <p className="mt-5 max-w-sm text-[11px] leading-6 text-[#aa9b91]">
              The beauty of who you are.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <p className="text-[8px] uppercase tracking-[0.4em] text-[#c5a66d]">
              Explore
            </p>

            <div className="mt-5 flex flex-col gap-3 text-[11px] text-[#aa9b91]">

              <a
                href="#home"
                className="transition hover:text-white"
              >
                Home
              </a>

              <a
                href="#story"
                className="transition hover:text-white"
              >
                Our Story
              </a>

              <a
                href="#shop"
                className="transition hover:text-white"
              >
                Shop
              </a>

            </div>
          </div>

          {/* CONTACT */}
          <div>
            <p className="text-[8px] uppercase tracking-[0.4em] text-[#c5a66d]">
              Contact
            </p>

            <div className="mt-5 flex flex-col gap-3 text-[11px] text-[#aa9b91]">

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                WhatsApp
              </a>

              <a
                href="#"
                className="transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href="#"
                className="transition hover:text-white"
              >
                TikTok
              </a>

            </div>
          </div>

        </div>

        <div className="mx-auto mt-14 border-t border-white/10 pt-7 text-center text-[8px] uppercase tracking-[0.3em] text-[#786c64]">
          © 2026 JETAIMESCARV — All Rights Reserved
        </div>

      </footer>

    </main>
  );
}