"use client";

import { useState } from "react";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { GalleryPhoto } from "@/app/types/api";
import ScrollLeft from "../ScrollLeft";
import ScrollRight from "../ScrollRight";
import Button from "../general/Button";
import BorderHover from "../general/BorderHover";

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

interface GalleryInteractiveProps {
  photos: GalleryPhoto[];
}

// Komponent til at vise et enkelt billede i galleriet
// Håndterer hover-tilstand for at vise Border-effekten
const GalleryItem = ({ photo, index, onClick, className }: { photo: GalleryPhoto; index: number; onClick: () => void; className: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Returner det enkelte galleri element som boilerplate
  return (
    <motion.div
      className={`relative cursor-pointer group overflow-hidden ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Animation: Flyver ind fra venstre
      initial={{ opacity: 0, x: -100 }} // Starter usynlig og 100px til venstre
      whileInView={{ opacity: 1, x: 0 }} // Animerer til synlig og original position
      transition={{ duration: 0.5, delay: index * 0.1 }} // 0.5s animation, forsinkelse baseret på index
      viewport={{ once: false }} // Animerer HVER gang når den kommer i view
    >
      {/* Billede med zoom-effekt ved hover */}
      <Image src={photo?.asset.url} alt={photo?.description} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
      {/* Border komponent der vises ved hover */}
      <BorderHover isHovered={isHovered} />
    </motion.div>
  );
};

// Hovedkomponent til det interaktive galleri med lightbox funktionalitet
const GalleryInteractive = ({ photos }: GalleryInteractiveProps) => {
  // State til at holde styr på hvilket billede der er valgt i lightboxen (null = ingen valgt)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Funktion til at vise næste billede (kører i ring)
  const showNext = (e: React.MouseEvent) => {
    // e.stopPropagation() sikrer, at klik på pilen IKKE også opfattes som et klik på baggrunden (som ville lukke modalen).
    e.stopPropagation();
    // Hvis et billede er valgt, opdaterers selectedIndex til næste billede
    // Hvis previous er null (bør ikke ske her), forbliver det null
    // Ellers bruges modulo operatoren (%) for at køre i ring
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % photos.length));
    }
  };

  // Funktion til at vise forrige billede (kører i ring)
  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + photos.length) % photos.length));
    }
  };

  return (
    <>
      {/* --- GALLERI GRID --- */}
      {/* Grid layout med forskellige størrelser baseret på designet */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 mt-6">
        {/* Billede 1 (Top, 1 col) */}
        <GalleryItem photo={photos[0]} index={0} onClick={() => setSelectedIndex(0)} className="md:col-span-3 h-64" />

        {/* Billede 2 (Top, 1 col) */}
        <GalleryItem photo={photos[1]} index={1} onClick={() => setSelectedIndex(1)} className="md:col-span-3 h-64" />

        {/* Billede 3 (Top, 2 cols) */}
        <GalleryItem photo={photos[2]} index={2} onClick={() => setSelectedIndex(2)} className="md:col-span-4 h-64" />

        {/* Billede 4 (Top, 1 col) */}
        <GalleryItem photo={photos[3]} index={3} onClick={() => setSelectedIndex(3)} className="md:col-span-2 h-64" />

        {/* Billede 5 (Bund, 1 col) */}
        <GalleryItem photo={photos[4]} index={4} onClick={() => setSelectedIndex(4)} className="md:col-span-3 h-64" />

        {/* Billede 6 (Bund, 2 cols) */}
        <GalleryItem photo={photos[5]} index={5} onClick={() => setSelectedIndex(5)} className="md:col-span-4 h-64" />

        {/* Billede 7 (Bund, 2 cols) */}
        <GalleryItem photo={photos[6]} index={6} onClick={() => setSelectedIndex(6)} className="md:col-span-5 h-64" />
      </div>

      {/* --- LIGHTBOX (MODAL) --- */}
      {/* Vises kun hvis et billede er valgt (selectedIndex !== null) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedIndex(null)}>
            {/* Luk knap */}
            <button className="absolute top-4 right-4 text-primary text-4xl hover:text-white z-50 cursor-pointer">
              <MdClose />
            </button>

            {/* Venstre Pil - Navigerer til forrige billede */}
            <div onClick={showPrev} className="absolute left-4 z-50 cursor-pointer select-none">
              <ScrollLeft />
            </div>

            {/* Billede Container - Klik her lukker ikke modalen (stopPropagation) */}
            <motion.div
              className="relative max-w-3xl w-full max-h-[80vh] flex flex-col items-center select-none"
              onClick={(e) => e.stopPropagation()}
              // Zoom animation: Start lille og usynlig, zoom ind til fuld størrelse
              initial={{ scale: 0.5, opacity: 0 }} // Starter lille og usynlig
              animate={{ scale: 1, opacity: 1 }} // Animerer til fuld størrelse og synlig
              exit={{ scale: 0.5, opacity: 0 }} // Animerer tilbage til lille og usynlig ved exit
              transition={{ duration: 0.2, ease: "easeOut" }} // Hastigheden og easing for animationen
            >
              <div className="relative w-full h-[20vh] md:h-[70vh]">
                <Image
                  src={photos[selectedIndex]?.asset.url}
                  alt={photos[selectedIndex]?.description || "Gallery image"}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Beskrivelse og Info */}
              <div className="mt-4 w-full flex flex-col items-center gap-4">
                {/* Tæller: Billede X af Y */}
                <p className="text-gray-400 text-sm">
                  {selectedIndex + 1} / {photos.length}
                </p>

                {/* Tekstboks med titel og beskrivelse */}
                <div className="bg-background w-full p-6">
                  {/* Viser titel hvis den findes, ellers fallback */}
                  <h3 className="text-primary text-lg font-bold">{photos[selectedIndex]?.title}</h3>
                  <p className="text-primary text-md mt-2">{photos[selectedIndex]?.description}</p>

                  <div className="place-self-end mt-6">
                    <Button text="read more" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Højre Pil - Navigerer til næste billede */}
            <div onClick={showNext} className="absolute right-4 z-50 cursor-pointer select-none">
              <ScrollRight />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryInteractive;
