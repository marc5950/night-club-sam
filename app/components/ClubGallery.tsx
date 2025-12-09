import Image from "next/image";
import { getGalleryPhotos } from "@/app/lib/api";
import { GalleryPhoto } from "@/app/types/api";

const ClubGallery = async () => {
  const photos: GalleryPhoto[] = await getGalleryPhotos();
  const limitedPhotos = photos.slice(0, 7);

  return (
    <div className="max-w-[1440px]">
      {/* GRID: 4 billeder top + 3 billeder bund */}
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* --- ØVERSTE RÆKKE (4 billeder) --- */}
        <div className="md:col-span-1 relative h-48">
          <Image src={limitedPhotos[0].asset.url} alt="" fill className="object-cover" />
        </div>

        <div className="md:col-span-1 relative h-48">
          <Image src={limitedPhotos[1].asset.url} alt="" fill className="object-cover" />
        </div>

        <div className="md:col-span-2 relative h-48">
          <Image src={limitedPhotos[2].asset.url} alt="" fill className="object-cover" />
        </div>

        <div className="md:col-span-1 relative h-48">
          <Image src={limitedPhotos[3].asset.url} alt="" fill className="object-cover" />
        </div>

        {/* --- NEDERSTE RÆKKE (3 billeder) --- */}
        <div className="md:col-span-1 relative h-64">
          <Image src={limitedPhotos[4].asset.url} alt="" fill className="object-cover" />
        </div>

        <div className="md:col-span-2 relative h-64">
          <Image src={limitedPhotos[5].asset.url} alt="" fill className="object-cover" />
        </div>

        <div className="md:col-span-2 relative h-64">
          <Image src={limitedPhotos[6].asset.url} alt="" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default ClubGallery;
