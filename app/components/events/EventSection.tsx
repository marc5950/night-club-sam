"use client";
import { useState, useEffect, useRef } from "react";
import Title from "../general/Title";
import EventCard from "./EventCard";
import ScrollBar from "../ScrollBar";
import { Event } from "@/app/types/api";
type Props = { items: Event[] };

// Definerer EventSection komponenten
const EventSection = ({ items }: Props) => {
  // Events kommer som props fra page.tsx altså fra server-side fetch
  const events = items;
  // activeIndex holder styr på hvilken slide der vises. Starter på 0
  // setActiveIndex er funktionen til at opdatere activeIndex
  const [activeIndex, setActiveIndex] = useState(0);
  // manual bruges til at tjekke om brugeren manuelt har skiftet slide
  // Hvis manual = false → slideshow skifter slides automatisk hvert 2 sekund.
  // Hvis manual = true → brugeren har klikket, og autoslideshow stopper.
  const [manual, setManual] = useState(false);
  const [eventsPerSlide, setEventsPerSlide] = useState(2);
  // intervalRef bruges til at gemme interval-ID'et for at kunne rydde det senere.
  // useRef gør at intervalRef bevarer sin værdi mellem renders, uden at skabe en rerendering.
  // I TS kan setInterval returnere enten `number` (browser) eller `NodeJS.Timeout` (Node).
  // Derfor bruger vi ReturnType<typeof setInterval>, som passer til projektets typings.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Ingen client-side fetch; data er fetched i Server Component

  // Beregner antal slides (2 events pr. slide)
  // Math.ceil runder op til nærmeste hele tal
  // events.length / 2 giver antal slides. Altså 2 events pr. slide

  // Skift eventsPerSlide afhængigt af skærmstørrelse
  useEffect(() => {
    // Funktion der opdaterer eventsPerSlide baseret på vinduesbredde
    const handleResize = () => {
      setEventsPerSlide(window.innerWidth < 768 ? 1 : 2);
    };
    // Her kaldes funktionen første gang for at sætte korrekt værdi ved load
    handleResize();
    // Tilføjer event listener til vinduets resize event
    window.addEventListener("resize", handleResize);
    // Her fjernes event listener når komponenten unmountes
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Opdaterer antal slides når events eller eventsPerSlide ændres
  const slides = Math.ceil(events.length / eventsPerSlide);

  // Effekt til automatisk at skifte slides hvert 2. sekund
  useEffect(() => {
    // Hvis brugeren har klikket manuelt, så er manual sat til true og slideshow stopper
    if (manual) return;
    // Ryd evt. tidligere interval før vi opretter et nyt
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Interval der skifter slide hvert 2. sekund. Hver gang activeIndex ændres, så skiftes der slide
    intervalRef.current = setInterval(() => {
      // prev er det gamle slidenummer
      // prev + 1 skifter til næste slide
      // % slides sikrer at når vi når sidste slide, så går vi tilbage til slide 0
      setActiveIndex((prev) => (prev + 1) % slides);
    }, 2000);
    // Rydder intervallet når man går til en ny side eller når man trykker manuelt
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // Funktionen kører igen hvis manual eller slides ændres
  }, [manual, slides]);

  // Udregner hvilke events der skal vises på den aktuelle slide og hvor mange events der er pr. slide
  const visibleEvents = events.slice(activeIndex * eventsPerSlide, activeIndex * eventsPerSlide + eventsPerSlide);

  // Funktion der køre når der klikkes på ScrollBar prikkerne
  const handleSelect = (idx: number) => {
    // Skifter til den valgte priks slide
    setActiveIndex(idx);
    // Stop automatisk slideshow ved klik
    setManual(true);
  };

  return (
    <section className='max-w-6xl mx-auto p-8 mt-20'>
      <Title title='Upcoming Events' />
      <div className='flex flex-col md:flex-row gap-4 justify-center'>
        {visibleEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <ScrollBar count={slides} active={activeIndex} onSelect={handleSelect} activeColor='bg-secondary' color='bg-primary' />
    </section>
  );
};

export default EventSection;
