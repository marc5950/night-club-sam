"use client";
import { getGalleryPhotos } from "@/app/lib/api";
import { GalleryPhoto } from "@/app/types/api";
import GalleryInteractive from "./GalleryInteractive";
import { motion } from "framer-motion";

const ClubGallery = async () => {
  // 1. Hent billeder fra API (Server Side)
  const photos: GalleryPhoto[] = await getGalleryPhotos();

  // 2. Tag kun de første 7 billeder, da det er det vores layout passer til
  const limitedPhotos = photos.slice(0, 7);

  // 3. Send data videre til Client Component som håndterer klik og lightbox
  return (
    <motion.div
      className='w-full overflow-hidden'
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }} // kun animér én gang
    >
      <GalleryInteractive photos={limitedPhotos} />
    </motion.div>
  );
};

export default ClubGallery;
