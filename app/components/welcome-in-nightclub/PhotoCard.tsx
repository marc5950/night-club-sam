"use client";

import Image from "next/image";
import { useState } from "react";
import BorderHover from "../general/BorderHover";
import { motion } from "framer-motion";

interface PhotoCardProps {
  image: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const PhotoCard = ({ image, icon, title, desc }: PhotoCardProps) => {
  // Styre BorderHover, så den vises når der hover over kortet
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className='relative w-full sm:w-60 h-80 overflow-hidden cursor-pointer'
      // Håndtere hover og touch events
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      whileHover='hover' // Hover tilstand
      initial='rest' // Starttilstand
      animate='rest' // Normal tilstand
    >
      <Image src={image} alt={title} width={240} height={320} className='object-cover w-full h-full' />

      {/* SORT OVERLAY */}
      <motion.div
        className='absolute inset-0 bg-black'
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Border komponent */}
      <BorderHover isHovered={isHovered} />

      {/* Content - toner frem */}
      <motion.div
        className='absolute inset-0 flex flex-col items-center justify-center gap-4 text-white transition-opacity duration-1500 z-10'
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
      >
        <motion.div
          className='text-5xl text-secondary border border-secondary rounded p-2'
          variants={{
            rest: { scale: 0.8 },
            hover: { scale: 1 },
          }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
        <motion.h3
          className='text-2xl font-bold uppercase'
          variants={{
            rest: { scale: 0.8 },
            hover: { scale: 1 },
          }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className='text-sm text-center px-4'
          variants={{
            rest: { opacity: 0, x: 20 },
            hover: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.8 }}
        >
          {desc}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default PhotoCard;
