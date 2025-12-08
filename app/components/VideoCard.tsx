"use client";
// Brug useState til at holde styr på hvilken video der vises
import { useState } from "react";
import ScrollLeft from "./ScrollLeft";
import ScrollRight from "./ScrollRight";
import Title from "./general/Title";

// Array af de valgte videoer
const videos = ["/media/video-dj-crowd-2.mp4", "/media/video-dj-crowd1.mp4", "/media/video-crowd.mp4"];

const VideoCard = () => {
  // State til at holde styr på den aktuelle video
  // current er den video der vises. Starter på index 0, altså den første video i arrayet
  // setCurrent er funktionen vi bruger til at opdatere current
  // useState(0) betyder at vi starter med at vise den første video
  const [current, setCurrent] = useState(0);

  // Funktioner til at skifte video
  // Begge funktioner opdaterer 'current' state variablen
  // handleValue går til den forrige video eller til den sidste hvis vi er på den første
  // Hvis current er 0, så hopper den til den sidste video (videos.length - 1)
  // Ellers mindsker den current med 1
  const handleValue = () => setCurrent((value) => (value === 0 ? videos.length - 1 : value - 1));
  // handleNext  går til den næste video eller til den første hvis vi er på den sidste
  // Hvis current er den sidste index (videos.length - 1), så hopper den til 0
  // Ellers øger den current med 1
  const handleNext = () => setCurrent((value) => (value === videos.length - 1 ? 0 : value + 1));

  return (
    <section>
      <Title title='Latest Video' />
      <div className='relative w-full max-w-6xl mx-auto'>
        <video controls width='640' height='360' className='w-full' src={videos[current]} />
        <div className='flex justify-center gap-8 mt-4'>
          <button onClick={handleValue}>
            <ScrollLeft />
          </button>
          <button onClick={handleNext}>
            <ScrollRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoCard;
