"use client";
import { useRef, useState, useEffect } from "react"; // useRef til audio element
import Image from "next/image";

// Icon imports
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaFastForward } from "react-icons/fa";
import { FaBackwardFast } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";
import { FaVolumeUp } from "react-icons/fa";
import { getGalleryPhotos } from "@/app/lib/api";
import { GalleryPhoto } from "@/app/types/api";

const MusicTrack = () => {
  // Opretter en ref der peger på audio-elementet. Initialværdi er `null`.
  // Type angivet som HTMLAudioElement — i TypeScript er det normalt useRef<HTMLAudioElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // State til at styre om der spilles
  const [isPlaying, setIsPlaying] = useState(false);

  // Index for hvilket track der afspilles
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Progress i procent (0-100) til slideren
  const [progress, setProgress] = useState(0);

  // Varighed af current track i sekunder
  const [duration, setDuration] = useState(0);

  // Billeder hentet fra API (ikke i mål med det endnu)
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);

  // Volume som React-state (0-1)
  const [volume, setVolume] = useState(0.5);

  // Synkroniser audio-elementets volumen med volume-state
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  // Hent billeder fra API ved komponentens mount
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        console.log("Fetching photos...");
        const fetchedPhotos = await getGalleryPhotos();
        console.log("Fetched photos:", fetchedPhotos);
        setPhotos(fetchedPhotos.slice(0, 7));
        console.log("Photos set:", fetchedPhotos.slice(0, 14));
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };
    fetchPhotos();
  }, []); // Kig på dette igen!

  // Track liste
  const tracks = [
    { title: "BLACK BOX FUNKY", src: "/media/black-box-funky.mp3" },
    { title: "EUPHORIA", src: "/media/euphoria.mp3" },
    { title: "FASHION RED TAPE", src: "/media/fashion-red-tape.mp3" },
  ];

  // Play/pause-knap: brug audioRef til at kontrollere DOM-audio
  const togglePlay = () => {
    if (!audioRef.current) return; // Hvis audioRef ikke er sat endnu
    if (isPlaying)
      audioRef.current.pause(); // Stop afspilning
    else audioRef.current.play(); // Start afspilning
    setIsPlaying(!isPlaying); // Opdater state
  };

  // Skip til næste
  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };
  // Skip til forrige
  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  // Shuffle - Vælg et tilfældigt track
  const shuffleTrack = () => {
    let nextIndex = Math.floor(Math.random() * tracks.length);
    while (nextIndex === currentTrackIndex) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    }
    setCurrentTrackIndex(nextIndex);
  };

  // Fremdriftslinje
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  // Opdater progress state baseret på audioens currentTime / duration
  const handleDurationChange = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  // Formatér sekunder til mm:ss
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Hvis billeder endnu ikke er hentet, vis loading (forhindrer fejl ved photos[0])
  if (photos.length === 0) {
    return <div className="max-w-[1440px] p-6">Loading...</div>;
  }

  return (
    <div className="max-w-[1440px]">
      {/* Eksempel på flere Image-komponenter (kommenteret ud) */}
      {/* <div className="relative h-64">
        <Image src={photos[0].asset.url} alt="" fill className="object-cover" unoptimized />
      </div>
      <div className="relative h-64">
        <Image src={photos[1].asset.url} alt="" fill className="object-cover" unoptimized />
      </div>
      <div className="relative h-64">
        <Image src={photos[2].asset.url} alt="" fill className="object-cover" unoptimized />
      </div>
      <div className="relative h-64">
        <Image src={photos[0].asset.url} alt="" fill className="object-cover" unoptimized />
      </div>
      <div className="relative h-64">
        <Image src={photos[1].asset.url} alt="" fill className="object-cover" unoptimized />
      </div>
      <div className="relative h-64">
        <Image src={photos[2].asset.url} alt="" fill className="object-cover" unoptimized />
      </div> */}
      <div className="max-w-[500px] mx-auto p-4 flex flex-col items-center gap-4">
        <audio
          className=""
          ref={audioRef} // Bind audioRef til dette audio-element
          src={tracks[currentTrackIndex].src} // Skift src baseret på currentTrackIndex
          onTimeUpdate={handleTimeUpdate} // Opdater progress ved tidsændring
          onLoadedMetadata={handleDurationChange} // Sæt duration når metadata er loadet
          onEnded={skipForward} // Gå til næste track når det nuværende slutter
          onVolumeChange={() => {
            // Opdater volume state ved ændring
            const a = audioRef.current;
            if (!a) return;
            setVolume(a.volume); // Opdater volume state ved ændring
          }}
        />

        {/* Titel */}
        <div className="w-full flex justify-start">
          <p className="font-medium text-primary">{tracks[currentTrackIndex].title}</p>
        </div>

        {/* Fremdriftslinje */}
        <div className="flex items-center gap-2 w-full">
          <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
          <input
            type="range"
            className="flex-1 h-1 custom-range appearance-none"
            max={100} // Procent (0-100)
            value={isNaN(progress) ? 0 : progress} // Kontrolleret input
            onChange={(e) => { // Når brugeren ændrer slideren
              if (!audioRef.current) return; // Hvis audioRef ikke er sat endnu
              // Beregn ny tid baseret på sliderens procentværdi
              const newTime = (Number(e.target.value) / 100) * audioRef.current.duration; // Ny tid i sekunder
              audioRef.current.currentTime = newTime; // Opdater audioens currentTime
              setProgress(Number(e.target.value)); // Opdater progress state
            }}
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Knapper + volume */}
        <div className="flex items-center gap-4 mt-2 w-full">
          {/* Frem / Tilbage */}
          <button onClick={skipBackward} className="text-primary text-2xl cursor-pointer">
            <FaBackwardFast />
          </button>

          {/* Play / Pause */}
          <button onClick={togglePlay} className="text-primary text-4xl cursor-pointer">
            {isPlaying ? <FaRegCirclePause /> : <FaRegCirclePlay />}
          </button>

          {/* Frem / Fremad */}
          <button onClick={skipForward} className="text-primary text-2xl cursor-pointer">
            <FaFastForward />
          </button>

          {/* Shuffle */}
          <button onClick={shuffleTrack} className="text-primary text-2xl cursor-pointer">
            <FaShuffle />
          </button>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <FaVolumeUp className="text-primary text-2xl" />
            <input
              type="range"
              className="flex-1 h-1 custom-range w-18"
              min={0}
              max={1}
              step={0.01}
              value={audioRef.current?.volume || 0.5}
              onChange={(e) => {
                if (!audioRef.current) return;
                audioRef.current.volume = Number(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicTrack;
