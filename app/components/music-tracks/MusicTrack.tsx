"use client"; // Bruger fordi denne komponent kører i browseren
import { useRef, useState, useEffect } from "react";

// Importer nødvendige komponenter
import AudioPlayer from "./AudioPlayer";
import TrackImage from "./TrackImage";
import ScrollLeft from "../ScrollLeft";
import ScrollRight from "../ScrollRight";
import Title from "../general/Title";

// Opretter et react komponent kaldet MusicTrack
const MusicTrack = () => {
  // Reference til audio elementet i DOM'en
  const audioRef = useRef<HTMLAudioElement>(null);

  // State til afspilning, aktivt track og audio-data
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);

  // Liste over musiknumre
  const tracks = [
    { title: "BLACK BOX FUNKY", src: "/media/black-box-funky.mp3" },
    { title: "EUPHORIA", src: "/media/euphoria.mp3" },
    { title: "FASHION RED TAPE", src: "/media/fashion-red-tape.mp3" },
  ];

  // Liste over billeder til tracks
  const trackImages = [
    { src: "/content-img/track_thumb.jpg", trackIndex: 0 },
    { src: "/content-img/track1.jpg", trackIndex: 1 },
    { src: "/content-img/track2.jpg", trackIndex: 2 },
    { src: "/content-img/track4.jpg", trackIndex: 0 },
    { src: "/content-img/track5.jpg", trackIndex: 1 },
  ];

  useEffect(() => {
    // Kører når der skiftes track
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlaying) audioRef.current.play();
  }, [currentTrackIndex]);

  // Starter eller pauser musikken
  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  // Skift track frem / tilbage
  const skipForward = () => setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);

  const skipBackward = () => setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);

  // Vælg et tilfældigt track (ikke det nuværende)
  const shuffleTrack = () => {
    let next = currentTrackIndex; // Start med at sætte next til det nuværende track index
    while (next === currentTrackIndex) { // Bliv ved med at vælge et nyt index indtil det er forskelligt
      next = Math.floor(Math.random() * tracks.length); // Vælg et tilfældigt index
    }
    setCurrentTrackIndex(next); // Opdater state med det nye track index
  };

  // Opdater progress når tiden ændres
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100); // Beregn procentdelen af afspillet tid
  };

  // Gem trackets varighed
  const handleDurationChange = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  // Formatter tid i mm:ss
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60); // Beregn minutter
    const seconds = Math.floor(time % 60) // Beregn sekunder
      .toString() // Konverter til string
      .padStart(2, "0"); // Sørg for to cifre
    return `${minutes}:${seconds}`; // Returner formateret tid
  };

  // Ændrer sangens position via progress bar
  const handleProgressChange = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = (value / 100) * audioRef.current.duration; // Opdater audioens currentTime baseret på slider værdi
    setProgress(value);
  };

  // Vælg track via billede
  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index); // Skift til det valgte track
    setIsPlaying(true); // Sæt afspilning til true
  };

  // Scroll billeder i mobil
  const scrollLeft = () => setVisibleImageIndex((prev) => (prev - 1 + trackImages.length) % trackImages.length); // Scroll til venstre i billedlisten

  const scrollRight = () => setVisibleImageIndex((prev) => (prev + 1) % trackImages.length); // Scroll til højre i billedlisten

  // Desktop scroll skifter også track
  const handleValue = () => setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1)); // Skift til forrige track på desktop scroll

  const handleNext = () => setCurrentTrackIndex((prev) => (prev + 1) % tracks.length); // Skift til næste track på desktop scroll

  // Aktivt billede til desktop
  const activeImage = trackImages.find((img) => img.trackIndex === currentTrackIndex) || trackImages[0];

  return (
    <div className="max-w-[1440px] px-6 mx-auto my-40">
      <Title title="Night Club Track" />

      {/* Mobile view */}
      <div className="md:hidden">
        <AudioPlayer audioRef={audioRef} isPlaying={isPlaying} currentTrack={tracks[currentTrackIndex]} progress={progress} duration={duration} togglePlay={togglePlay} skipForward={skipForward} skipBackward={skipBackward} shuffleTrack={shuffleTrack} handleTimeUpdate={handleTimeUpdate} handleDurationChange={handleDurationChange} formatTime={formatTime} onProgressChange={handleProgressChange} />

        <div className="flex justify-center items-center pt-8">
          <TrackImage src={trackImages[visibleImageIndex].src} title={tracks[trackImages[visibleImageIndex].trackIndex].title} onClick={() => handleTrackSelect(trackImages[visibleImageIndex].trackIndex)} />
        </div>

        <div className="flex justify-center gap-8 mt-10">
          <button onClick={scrollLeft}>
            <ScrollLeft />
          </button>
          <button onClick={scrollRight}>
            <ScrollRight />
          </button>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block px-6">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-4 gap-8 items-center">
            <div className="col-span-1 justify-end flex">
              <TrackImage src={activeImage.src} title={tracks[activeImage.trackIndex].title} onClick={() => handleTrackSelect(activeImage.trackIndex)} />
            </div>
            <div className="col-span-3">
              <AudioPlayer audioRef={audioRef} isPlaying={isPlaying} currentTrack={tracks[currentTrackIndex]} progress={progress} duration={duration} togglePlay={togglePlay} skipForward={skipForward} skipBackward={skipBackward} shuffleTrack={shuffleTrack} handleTimeUpdate={handleTimeUpdate} handleDurationChange={handleDurationChange} formatTime={formatTime} onProgressChange={handleProgressChange} />
            </div>
          </div>

          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => {
                scrollLeft();
                handleValue();
              }}
            >
              <ScrollLeft />
            </button>

            <div className="flex flex-wrap justify-center">
              {trackImages.map((image, index) => (
                <TrackImage key={index} src={image.src} title={tracks[image.trackIndex].title} onClick={() => handleTrackSelect(image.trackIndex)} />
              ))}
            </div>

            <button
              onClick={() => {
                scrollRight();
                handleNext();
              }}
            >
              <ScrollRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicTrack;
