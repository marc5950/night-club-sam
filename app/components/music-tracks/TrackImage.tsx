"use client";
import { useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";

interface TrackImageProps {
  src: string; // Sti til billedet
  alt?: string; // Alternativ tekst til billedet
  onClick?: () => void; // Funktion der kaldes når billedet klikkes
  title?: string; // Titel der vises ved hover
}

const TrackImage = ({ src, alt = "", onClick, title = "" }: TrackImageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onClick}>
      {/* Boolean der holder styr på om musen er over billedet */}
      { /* onMouseEnter / onMouseLeave events opdaterer isHovered state */}

      {/* Selve billedet */}
      <img src={src} alt={alt} />

      {/* Titel under billedet - z-10 så den ligger bag borders */}
      {title && (
        <div className={`absolute bottom-0 left-0 right-0 text-center transition-all duration-500 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} z-10`}>
          <p className="text-white font-bold text-lg bg-black px-4 py-2">{title}</p>
        </div>
      )}

      {/* Top border - z-20 så den ligger foran title */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-secondary transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"} z-20`}></div>

      {/* Bottom border - z-20 så den ligger foran title */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-secondary transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"} z-20`}></div>

      {/* Top-left corner - z-20 så den ligger foran title */}
      <div className={`absolute top-0 left-0 w-0 h-0 border-r-[30px] border-r-transparent border-t-[30px] border-t-secondary transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"} z-20`}></div>

      {/* Bottom-right corner - z-20 så den ligger foran title */}
      <div className={`absolute bottom-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-secondary transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"} z-20`}></div>

      {/* Play icon on hover - z-30 så den ligger øverst */}
      <FaRegCirclePlay
        className={`absolute inset-0 m-auto text-secondary text-6xl transition-all duration-500 
      ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"} z-30`}
      />
    </div>
  );
};

export default TrackImage;
