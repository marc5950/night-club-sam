"use client";
import { useRef, useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import TrackImage from "./TrackImage";
import ScrollLeft from "../ScrollLeft";
import ScrollRight from "../ScrollRight";
import Title from "../general/Title";

const MusicTrack = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

  const tracks = [
    { title: "BLACK BOX FUNKY", src: "/media/black-box-funky.mp3" },
    { title: "EUPHORIA", src: "/media/euphoria.mp3" },
    { title: "FASHION RED TAPE", src: "/media/fashion-red-tape.mp3" },
  ];

  const trackImages = [
    { src: "/content-img/track_thumb.jpg", trackIndex: 0 },
    { src: "/content-img/track1.jpg", trackIndex: 1 },
    { src: "/content-img/track2.jpg", trackIndex: 2 },
    { src: "/content-img/track4.jpg", trackIndex: 0 },
    { src: "/content-img/track5.jpg", trackIndex: 1 },
  ];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const shuffleTrack = () => {
    let nextIndex = Math.floor(Math.random() * tracks.length);
    while (nextIndex === currentTrackIndex) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    }
    setCurrentTrackIndex(nextIndex);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const handleDurationChange = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleProgressChange = (value: number) => {
    if (!audioRef.current) return;
    const newTime = (value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(value);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const scrollLeft = () => {
    setVisibleImageIndex((prev) => (prev - 1 + trackImages.length) % trackImages.length);
  };

  const scrollRight = () => {
    setVisibleImageIndex((prev) => (prev + 1) % trackImages.length);
  };

  // Find det aktive billede baseret på currentTrackIndex
  const activeImage = trackImages.find((image) => image.trackIndex === currentTrackIndex) || trackImages[0];

  return (
    <div className="max-w-[1440px]">
      <Title title="Night Club Track" />
      {/* Mobile view */}
      <div className="md:hidden">
        <AudioPlayer audioRef={audioRef} isPlaying={isPlaying} currentTrack={tracks[currentTrackIndex]} progress={progress} duration={duration} togglePlay={togglePlay} skipForward={skipForward} skipBackward={skipBackward} shuffleTrack={shuffleTrack} handleTimeUpdate={handleTimeUpdate} handleDurationChange={handleDurationChange} formatTime={formatTime} onProgressChange={handleProgressChange} />

        {/* Kun ét billede synligt på mobil */}
        <div className="flex justify-center items-center">
          <TrackImage src={trackImages[visibleImageIndex].src} title={tracks[trackImages[visibleImageIndex].trackIndex].title} onClick={() => handleTrackSelect(trackImages[visibleImageIndex].trackIndex)} />
        </div>

        {/* Navigation pile */}
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
        {/* Container for hele desktop sectionen */}
        <div className="mx-auto ">
          {/* Aktivt billede og AudioPlayer side om side */}
          <div className="grid grid-cols-3 gap-8 items-center mb-8">
            <div className="col-span-1 justify-end flex">
              <TrackImage src={activeImage.src} title={tracks[activeImage.trackIndex].title} onClick={() => handleTrackSelect(activeImage.trackIndex)} />
            </div>
            <div className="col-span-2">
              <AudioPlayer audioRef={audioRef} isPlaying={isPlaying} currentTrack={tracks[currentTrackIndex]} progress={progress} duration={duration} togglePlay={togglePlay} skipForward={skipForward} skipBackward={skipBackward} shuffleTrack={shuffleTrack} handleTimeUpdate={handleTimeUpdate} handleDurationChange={handleDurationChange} formatTime={formatTime} onProgressChange={handleProgressChange} />
            </div>
          </div>

          {/* Alle billeder nedenunder */}
          <div className="flex items-center justify-center gap-8">
            <button onClick={scrollLeft}>
              <ScrollLeft />
            </button>
            <div className="flex flex-wrap justify-center ">
              {trackImages.map((image, index) => (
                <TrackImage key={index} src={image.src} title={tracks[image.trackIndex].title} onClick={() => handleTrackSelect(image.trackIndex)} />
              ))}
            </div>
            <button onClick={scrollRight}>
              <ScrollRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicTrack;
