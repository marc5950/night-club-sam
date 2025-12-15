"use client"; // Bruger fordi dene komponent køre i browseren
import { useRef, useState, useEffect } from "react";
// useRef til at referere til audio elementet (DOM-element)
// useState til at håndtere afspilningstilstand, nuværende track osv.
// useEffect til at håndtere sideeffekter som at loade og afspille lyd når track ændres

// Importer nødvendige komponenter
import AudioPlayer from "./AudioPlayer";
import TrackImage from "./TrackImage";
import ScrollLeft from "../ScrollLeft";
import ScrollRight from "../ScrollRight";
import Title from "../general/Title";

// Opretter et react komponent kaldet MusicTrack
const MusicTrack = () => {
  // State variabel til at referere til audio elementet i DOM'en
  // HTMLAudioElement fortæller typescript at det er et audio element og gør jeg kan bruge f.eks. play(), pause(), currentTime
  const audioRef = useRef<HTMLAudioElement>(null);

  // State variabel til at gemme om musikken spiller eller ej
  const [isPlaying, setIsPlaying] = useState(false);

  // State variabel til at gemme hvilket nummer der spiller (0 = første nummer, 1 = andet nummer, osv.)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // State variabel til at gemme fremdriften (progress) af den nuværende sang i procent, hvor 0 = start og 100 = slut
  const [progress, setProgress] = useState(0);

  // State variabel til at gemme den totale varighed af den nuværende sang i sekunder (f.eks. til at vise 2:31)
  const [duration, setDuration] = useState(0);

  // State variabel til at gemme hvilket billede der er synligt i mobil visning
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);

  useEffect(() => {
    // React-hook der kører når currentTrackIndex ændres, altså kun når der skiftes til ny sang
    if (!audioRef.current) return; // Hvis audioRef ikke er sat (audio elementet ikke er loadet endnu), så gør ikke noget og koden stopper med return

    // Load den nye sang
    audioRef.current.load(); // Load metoden sørger for at audio elementet henter den nye sang baseret på src attributten

    // Hvis musikken skulle spille, så start afspilningen af den nye sang
    if (isPlaying) {
      // Tjek om musikken var i afspilningstilstand
      audioRef.current.play(); // Start afspilningen af den nye sang
    }
  }, [currentTrackIndex]); // Afhængigheds array med currentTrackIndex betyder at denne effekt kun kører når currentTrackIndex ændres, altså når der skiftes til en ny sang

  // Liste over musiknumre med titel og sti til lydfilen
  const tracks = [
    { title: "BLACK BOX FUNKY", src: "/media/black-box-funky.mp3" },
    { title: "EUPHORIA", src: "/media/euphoria.mp3" },
    { title: "FASHION RED TAPE", src: "/media/fashion-red-tape.mp3" },
  ];

  // Liste over billeder til musiknumrene med sti til billedet og hvilket track de hører til
  const trackImages = [
    { src: "/content-img/track_thumb.jpg", trackIndex: 0 },
    { src: "/content-img/track1.jpg", trackIndex: 1 },
    { src: "/content-img/track2.jpg", trackIndex: 2 },
    { src: "/content-img/track4.jpg", trackIndex: 0 },
    { src: "/content-img/track5.jpg", trackIndex: 1 },
  ];

  // Funktioner til at håndtere afspilning, springe numre over, opdatere tid
  const togglePlay = () => {
    // Tjek om audioRef er sat
    // Hvis det ikke findes (f.eks. komponenten ikke er renderet endnu), stopper vi funktionen her
    if (!audioRef.current) return;

    // Hvis musikken allerede spiller (isPlaying er true), så pause den
    if (isPlaying) audioRef.current.pause();
    // Hvis musikken ikke spiller (isPlaying er false), så play den
    else audioRef.current.play();

    // Opdater isPlaying state til det modsatte af hvad den er nu
    setIsPlaying(!isPlaying);
  };

  // Funktion til at springe til næste sang
  const skipForward = () => {
    // Opdaterer currentTrackIndex til næste index
    // "prev" er den tidligere værdi af currentTrackIndex
    // (prev + 1) % tracks.length sikrer at vi går tilbage til 0 (altså første sang i listen) når vi når slutningen af listen
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    // Eksempel: hvis track.length er 3 (3 sange i listen)
    // Hvis prev er 0, bliver det (0 + 1) % 3 = 1 (andet nummer)
    // Hvis prev er 1, bliver det (1 + 1) % 3 = 2 (tredje nummer)
    // Hvis prev er 2, bliver det (2 + 1) % 3 = 0 (tilbage til første nummer)
  };

  // Funktion til at springe til forrige sang
  const skipBackward = () => {
    // Opdaterer currentTrackIndex til forrige index
    // (prev - 1 + tracks.length) % tracks.length sikrer at vi går til sidste sang i listen når vi er ved første sang i listen
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  // Funktion til at vælge et tilfældigt nummer der ikke er det nuværende
  const shuffleTrack = () => {
    // Vælg et tilfældigt index der ikke er det samme som currentTrackIndex
    let nextIndex = Math.floor(Math.random() * tracks.length);

    // Sørg for at det tilfældige index ikke er det samme som det nuværende
    // Hvis det er det samme, vælg et nyt indtil det er forskelligt
    while (nextIndex === currentTrackIndex) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    }
    // Opdater currentTrackIndex til det nye tilfældige index
    setCurrentTrackIndex(nextIndex);
  };

  // Funktion til at opdatere fremdriften (progress) når tiden opdateres
  const handleTimeUpdate = () => {
    // Først tjek om audioRef eksisterer
    if (!audioRef.current) return;

    // Opdater progress state til den nuværende tid divideret med den totale varighed gange 100 for at få procent
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  // Funktion til at opdatere varigheden når metadata er loadet
  const handleDurationChange = () => {
    // Tjek om audioRef eksisterer
    if (!audioRef.current) return;

    // setDuration kalder vi med audioRef.current.duration som giver os varigheden af den nuværende sang
    setDuration(audioRef.current.duration);
  };

  // Funktion til at formatere tid i sekunder til mm:ss format
  const formatTime = (time: number) => {
    // Først tjekker om time er et tal
    if (isNaN(time)) return "0:00"; // Hvis ikke et tal, returner NaN (not a number) "0:00"
    const minutes = Math.floor(time / 60); // Beregn minutter ved at dividere med 60 og runde ned
    const seconds = Math.floor(time % 60) // Beregner sekunder ved at tage resten af divisionen med 60 og runder ned til nærmeste heltal
      .toString() // Konverterer sekunder til en streng
      .padStart(2, "0"); // Sørger for at sekunder altid har to cifre ved at tilføje et foranstillet 0 hvis nødvendigt
    return `${minutes}:${seconds}`; // Returnerer formateret tid som "mm:ss"
  };

  // Funktion til at ændre fremdriften når brugeren interagerer med fremdriftslinjen
  const handleProgressChange = (value: number) => {
    // Først tjekker vi om audioRef eksisterer
    if (!audioRef.current) return; // Hvis ikke, stopper vi funktionen her

    // Beregn den nye tid baseret på den procentdel brugeren har valgt
    const newTime = (value / 100) * audioRef.current.duration; // Value er mellem 0 og 100, dividerer med 100 for at få en værdi mellem 0 og 1, ganger med den totale varighed for at få den nye tid i sekunder

    // Opdater audio elementets currentTime til den nye tid
    audioRef.current.currentTime = newTime;

    // Opdater progress state til den nye værdi, så slideren i UI følger med
    setProgress(value);
  };

  // Funktion til at håndtere valg af track når et billede klikkes
  const handleTrackSelect = (index: number) => {
    // Opdater currentTrackIndex til det valgte index
    setCurrentTrackIndex(index); // Skift til det valgte nummer
    setIsPlaying(true); // Sæt isPlaying til true for at starte afspilning
  };

  // Funktioner til at scrolle billeder i mobil visning
  const scrollLeft = () => {
    // Scroll til venstre ved at mindske visibleImageIndex med 1
    setVisibleImageIndex((prev) => (prev - 1 + trackImages.length) % trackImages.length); // Sørger for at gå til sidste billede hvis vi er ved det første
  };

  const scrollRight = () => {
    // Scroll til højre ved at øge visibleImageIndex med 1
    setVisibleImageIndex((prev) => (prev + 1) % trackImages.length); // Sørger for at gå til første billede hvis vi er ved det sidste
  };

  // Find det aktive billede baseret på currentTrackIndex, som hører til den sang der spiller for desktop visning
  const activeImage = trackImages.find((image) => image.trackIndex === currentTrackIndex) || trackImages[0];

  return (
    <div className="max-w-[1440px]">
      <Title title="Night Club Track" />

      {/* Mobile view */}
      <div className="md:hidden">
        <AudioPlayer audioRef={audioRef} isPlaying={isPlaying} currentTrack={tracks[currentTrackIndex]} progress={progress} duration={duration} togglePlay={togglePlay} skipForward={skipForward} skipBackward={skipBackward} shuffleTrack={shuffleTrack} handleTimeUpdate={handleTimeUpdate} handleDurationChange={handleDurationChange} formatTime={formatTime} onProgressChange={handleProgressChange} />

        {/* Kun ét billede synligt på mobil */}
        <div className="flex justify-center items-center pt-8">
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
        <div className="flex flex-col items-center">
          {/* Aktivt billede og AudioPlayer side om side */}
          <div className="grid grid-cols-4 gap-8 items-center">
            <div className="col-span-1 justify-end flex">
              <TrackImage src={activeImage.src} title={tracks[activeImage.trackIndex].title} onClick={() => handleTrackSelect(activeImage.trackIndex)} />
            </div>
            <div className="col-span-3">
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
