"use client";
import { useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";

interface TrackImageProps {
  src: string;
  alt?: string;
  onClick?: () => void; // En funktion der ikke tager parametre og ikke returnerer noget
}

const TrackImage = ({ src, alt = "", onClick }: TrackImageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onClick}>
      {/* Top border */}
      <div className={`absolute top-0 left-0 right-0 bg-secondary transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}></div>

      {/* Bottom border */}
      <div className={`absolute bottom-0 left-0 right-0 bg-secondary transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}></div>

      {/* Top-left corner */}
      <div className={`absolute top-0 left-0 w-0 h-0 border-r-[30px] border-r-transparent border-t-[30px] border-t-secondary transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}></div>

      {/* Bottom-right corner */}
      <div className={`absolute bottom-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-b-[30px] border-b-secondary transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}></div>

      {/* Billedet */}
      <img src={src} alt={alt} />

      {/* Play icon on hover */}
      <FaRegCirclePlay
        className={`absolute inset-0 m-auto text-secondary text-6xl transition-all duration-500 
      ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"} z-30`}
      />
    </div>
  );
};

export default TrackImage;
