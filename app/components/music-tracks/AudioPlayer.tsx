"use client";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaFastForward } from "react-icons/fa";
import { FaBackwardFast } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";
import { FaVolumeUp } from "react-icons/fa";

interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  currentTrack: { title: string; src: string };
  progress: number;
  duration: number;
  togglePlay: () => void;
  skipForward: () => void;
  skipBackward: () => void;
  shuffleTrack: () => void;
  handleTimeUpdate: () => void;
  handleDurationChange: () => void;
  formatTime: (time: number) => string;
  onProgressChange: (value: number) => void;
}

const AudioPlayer = ({ audioRef, isPlaying, currentTrack, progress, duration, togglePlay, skipForward, skipBackward, shuffleTrack, handleTimeUpdate, handleDurationChange, formatTime, onProgressChange }: AudioPlayerProps) => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <audio className="" ref={audioRef} src={currentTrack.src} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleDurationChange} onEnded={skipForward} />

      {/* Titel */}
      <div className="flex justify-center md:justify-start">
        <p className="font-medium text-primary">{currentTrack.title}</p>
      </div>

      {/* Fremdriftslinje */}
      <div className="flex items-center gap-2 w-full">
        <input type="range" className="flex-1 h-1 custom-range appearance-none" max={100} value={isNaN(progress) ? 0 : progress} onChange={(e) => onProgressChange(Number(e.target.value))} />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <span>{formatTime(audioRef.current?.currentTime || 0)}</span> / <span>{formatTime(duration)}</span>
        </div>
        {/* Knapper */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <button onClick={skipBackward} className="text-primary text-2xl cursor-pointer">
            <FaBackwardFast />
          </button>
          <button onClick={togglePlay} className="text-primary text-4xl cursor-pointer">
            {isPlaying ? <FaRegCirclePause /> : <FaRegCirclePlay />}
          </button>
          <button onClick={skipForward} className="text-primary text-2xl cursor-pointer">
            <FaFastForward />
          </button>
          <button onClick={shuffleTrack} className="text-primary text-2xl cursor-pointer">
            <FaShuffle />
          </button>
        </div>

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
  );
};

export default AudioPlayer;
