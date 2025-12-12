import { getGalleryPhotos } from "@/app/lib/api";
import { GalleryPhoto } from "@/app/types/api";
import GalleryInteractive from "./GalleryInteractive";

const ClubGallery = async () => {
  // 1. Hent billeder fra API (Server Side)
  const photos: GalleryPhoto[] = await getGalleryPhotos();

  // 2. Tag kun de første 7 billeder, da det er det vores layout passer til
  const limitedPhotos = photos.slice(0, 7);

  // 3. Send data videre til Client Component som håndterer klik og lightbox
  return (
    <div className="w-full overflow-hidden object-cover">
      <GalleryInteractive photos={limitedPhotos} />
    </div>
  );
};

export default ClubGallery;
