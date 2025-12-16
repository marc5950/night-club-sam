"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../general/Header";
import { motion } from "framer-motion";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loaderFadeOut, setLoaderFadeOut] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [showLogo, setShowLogo] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    // Vælg tilfældigt baggrundsbillede
    const bgImages = ["/bg/header_bg_1.jpg", "/bg/header_bg_2.jpg"];
    const randomBg = bgImages[Math.floor(Math.random() * bgImages.length)];
    setBackgroundImage(randomBg);

    // Preload baggrundsbilledet
    const img = new window.Image();
    img.src = randomBg;
    img.onload = () => {
      // Når billedet er loaded, start fade out af loader
      setTimeout(() => {
        setLoaderFadeOut(true);
        // Fjern loader efter fade out animation
        setTimeout(() => {
          setIsLoading(false);
          // Start logo animation
          setTimeout(() => setShowLogo(true), 200);
          // Start tagline animation efter logo
          //   setTimeout(() => setShowTagline(true), 900);
        }, 500);
      }, 500);
    };
  }, []);

  return (
    <>
      <section className='relative h-screen w-full overflow-hidden'>
        {/* Loader */}
        {isLoading && (
          <div
            className={`absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${loaderFadeOut ? "opacity-0" : "opacity-100"}`}
          >
            <Image src='/loader/madbars.gif' alt='Loading...' width={100} height={100} unoptimized />
          </div>
        )}

        {/* Baggrundsbillede */}
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url('${backgroundImage}')`,
          }}
        ></div>

        {/* Hero Content */}
        <div className='relative z-10 flex flex-col items-center justify-center h-[calc(100vh-120px)]' style={{ perspective: "900px" }}>
          {/* Logo med fold-in animation */}
          <motion.div
            initial={{ opacity: 0, rotateX: 90, transformOrigin: "50% 0%" }}
            animate={showLogo ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: 90 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            onAnimationComplete={() => {
              // Kun vis tagline hvis logoet er synligt (undgå at den vises på unmount)
              if (showLogo) setShowTagline(true);
            }}
          >
            <Image src='/icon/Logo.svg' alt='Night Club Logo' width={772} height={118} />
          </motion.div>

          {/* Tagline med drop-in animation */}
          <motion.div
            className='absolute left-1/2 top-[60%] -translate-x-1/2 flex flex-col items-center gap-4'
            initial={{ opacity: 0, y: -40 }}
            animate={showTagline ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className='text-white text-[13px] md:text-[32px] font-bold uppercase tracking-[13px] md:tracking-[32px] mt-8 text-center md:whitespace-nowrap'>
              Have a good time
            </h1>
            <Image src='/bottom_line.png' alt='Line' width={300} height={50} />
          </motion.div>
        </div>
      </section>
      {/* Sticky Header */}
      <div className={`sticky top-0 z-50 `}>
        <Header />
      </div>
    </>
  );
};

export default Hero;
