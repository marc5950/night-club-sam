"use client";
import { useRef, useState, useEffect } from "react";

import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaFastForward } from "react-icons/fa";
import { FaBackwardFast } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";
import { FaVolumeUp } from "react-icons/fa";

const MusicTrack = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const tracks = [
    { title: "Black Box Funky", src: "/media/black-box-funky.mp3" },
    { title: "Euphoria", src: "/media/euphoria.mp3" },
    { title: "Fashion Red Tape", src: "/media/fashion-red-tape.mp3" },
  ];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleTrackChange = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    handleTrackChange();
  }, [currentTrackIndex]);

  return (
    <div className="max-w-[500px] mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Standard audio element */}
      <audio controls ref={audioRef} className="w-full" src={tracks[currentTrackIndex].src} onEnded={skipForward}>
        Your browser does not support the audio element.
      </audio>

      {/* Egen play/pause-knap placeret under audio */}
      <div className="flex justify-center mt-4">
        <button onClick={togglePlay} className="text-pink-500 text-4xl">
          {isPlaying ? <FaRegCirclePause /> : <FaRegCirclePlay />}
        </button>
      </div>

      {/* Ekstra knapper: frem/back og shuffle */}
      <div className="flex items-center justify-between mt-4">
        <FaShuffle className="text-pink-500 text-2xl cursor-pointer" />
        <div className="flex items-center gap-6">
          <button onClick={skipBackward} className="text-pink-500 text-2xl">
            <FaBackwardFast />
          </button>
          <button onClick={skipForward} className="text-pink-500 text-2xl">
            <FaFastForward />
          </button>
        </div>
      </div>

      {/* Titel */}
      <p className="mt-2 text-center font-medium">{tracks[currentTrackIndex].title}</p>
    </div>
  );
};

export default MusicTrack;
