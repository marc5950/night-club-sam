"use client"; // Bruger fordi dene komponent køre i browseren

// Import af nødvendige ikoner fra react-icons biblioteket
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaFastForward } from "react-icons/fa";
import { FaBackwardFast } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";
import { FaVolumeUp } from "react-icons/fa";

// Definering af props typen for AudioPlayer komponenten
interface AudioPlayerProps {
  // Interface bruges til at beskrive hvilke props komponenten forventer at modtage
  audioRef: React.RefObject<HTMLAudioElement | null>; // Reference til audio elementet, bruges til at styre lydafspilleren direkte, play(), pause(), ændre volume
  isPlaying: boolean; // Boolean der angiver om musikken spiller eller er pauset
  currentTrack: { title: string; src: string }; // Objekt der indeholder information om det aktuelle track (titel og kilde)
  progress: number; // Nuværende fremdrift i tracket som en procentdel (0-100)
  duration: number; // Total varighed af det aktuelle track i sekunder
  togglePlay: () => void; // Funktion der toggler mellem play og pause
  skipForward: () => void; // Funktion der springer til næste track
  skipBackward: () => void; // Funktion der springer til forrige track
  shuffleTrack: () => void; // Funktion der shuffler til et tilfældigt track
  handleTimeUpdate: () => void; // Funktion der håndterer opdatering af tiden under afspilning
  handleDurationChange: () => void; // Funktion der håndterer ændring i trackets varighed (når metadata er loadet)
  formatTime: (time: number) => string; // Funktion der formaterer tid i sekunder til et læsbart format (eksempel: mm:ss)
  onProgressChange: (value: number) => void; // Funktion der håndterer ændring i fremdrift (når brugeren trækker i fremdriftslinjen)
}

// Selve AudioPlayer komponenten
const AudioPlayer = ({ audioRef, isPlaying, currentTrack, progress, duration, togglePlay, skipForward, skipBackward, shuffleTrack, handleTimeUpdate, handleDurationChange, formatTime, onProgressChange }: AudioPlayerProps) => {
  return (
    <div className="flex flex-col gap-4 px-6">
      <audio className="" ref={audioRef} src={currentTrack.src} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleDurationChange} onEnded={skipForward} />

      {/* Titel */}
      <div className="flex justify-center md:justify-start">
        <p className="font-medium text-primary">{currentTrack.title}</p>
      </div>

      {/* Fremdriftslinje */}
      <div className="flex items-center gap-2 w-full">
        <input type="range" className="flex-1 h-1 custom-range appearance-none" max={100} value={isNaN(progress) ? 0 : progress} onChange={(e) => onProgressChange(Number(e.target.value))} />
      </div>

      {/* Mobile: Alt under hinanden */}
      <div className="flex flex-col gap-8 md:hidden">
        {/* Tid */}
        <div className="flex justify-center">
          <span>{formatTime(audioRef.current?.currentTime || 0)}</span> / <span>{formatTime(duration)}</span>
        </div>

        {/* Knapper */}
        <div className="flex items-center justify-center gap-6">
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
        <div className="flex items-center justify-center gap-2 w-1/2 mx-auto">
          <FaVolumeUp className="text-primary text-2xl" />
          <input
            type="range"
            className="h-1 custom-range w-32"
            min={0} // Minimum volume
            max={1} // Maximum volume
            step={0.01} // Step for volume ændring
            value={audioRef.current?.volume || 0.5} // Nuværende volume, default til 0.5 hvis audioRef er null
            onChange={(e) => {
              // Håndterer ændring i volume
              if (!audioRef.current) return; // Tjekker om audioRef er null
              audioRef.current.volume = Number(e.target.value); // Sætter den nye volume på audio elementet
            }}
          />
        </div>
      </div>

      {/* Desktop: Alt på én linje */}
      <div className="hidden md:flex justify-between items-center">
        <div>
          <span>{formatTime(audioRef.current?.currentTime || 0)}</span> / <span>{formatTime(duration)}</span>
        </div>

        {/* Knapper */}
        <div className="flex items-center justify-center gap-4">
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
