"use client";
import { useRef, useState } from "react";
import Image from "next/image";

import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaFastForward } from "react-icons/fa";
import { FaBackwardFast } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";
import { FaVolumeUp } from "react-icons/fa";
import { getGalleryPhotos } from "@/app/lib/api";
import { GalleryPhoto } from "@/app/types/api";

const MusicTrack = async () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const photos: GalleryPhoto[] = await getGalleryPhotos();

  const tracks = [
    { title: "BLACK BOX FUNKY", src: "/media/black-box-funky.mp3" },
    { title: "EUPHORIA", src: "/media/euphoria.mp3" },
    { title: "FASHION RED TAPE", src: "/media/fashion-red-tape.mp3" },
  ];

  // Play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  // Frem/tilbage
  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };
  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  // Shuffle
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

  const handleDurationChange = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  // Format tid som mm:ss
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="max-w-[1440px]">
        
      <div className="max-w-[500px] mx-auto p-4 flex flex-col items-center gap-4">
        <audio className="" ref={audioRef} src={tracks[currentTrackIndex].src} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleDurationChange} onEnded={skipForward} />

        {/* Titel */}
        <div className="w-full flex justify-start">
          <p className="font-medium text-primary">{tracks[currentTrackIndex].title}</p>
        </div>

        {/* Fremdriftslinje */}
        <div className="flex items-center gap-2 w-full">
          <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
          <input
            type="range"
            className="flex-1 h-1 custom-range"
            max={100}
            value={isNaN(progress) ? 0 : progress}
            onChange={(e) => {
              if (!audioRef.current) return;
              const newTime = (Number(e.target.value) / 100) * audioRef.current.duration;
              audioRef.current.currentTime = newTime;
              setProgress(Number(e.target.value));
            }}
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Knapper + volume */}
        <div className="flex items-center gap-4 mt-2 w-full">
          {/* Frem / Tilbage */}
          <button onClick={skipBackward} className="text-primary text-2xl">
            <FaBackwardFast />
          </button>

          {/* Play / Pause */}
          <button onClick={togglePlay} className="text-primary text-4xl">
            {isPlaying ? <FaRegCirclePause /> : <FaRegCirclePlay />}
          </button>

          {/* Frem / Fremad */}
          <button onClick={skipForward} className="text-primary text-2xl">
            <FaFastForward />
          </button>

          {/* Shuffle */}
          <button onClick={shuffleTrack} className="text-primary text-2xl">
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
