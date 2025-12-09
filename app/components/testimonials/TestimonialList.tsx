"use client";
import { useState, useEffect } from "react";
import { getTestimonials } from "@/app/lib/api";
import { Testimonial } from "@/app/types/api"; // typescript interface for testimonial
import TestimonialCard from "./TestimonialCard";
import ScrollBar from "../ScrollBar";

const TestimonialList = () => {
  // testimonialData: Array af testimonials
  // setTestimonialData: Funktion der opdaterer testimonialData
  // start med tom array og index 0
  const [testimonialData, setTestimonialData] = useState<Testimonial[]>([]);
  // activeIndex holder styr på hvilken testimonial der vises. Starter på 0 (den første testimonial)
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Kører API'et for at hente testimonials når komponenten er loadet
    const fetchData = async () => {
      const data = await getTestimonials();
      // Sætter den hentede data i state variablen testimonialData
      setTestimonialData(data);
    };
    // Kalder fetchData funktionen
    fetchData();
  }, []);

  return (
    <section className='max-w-6xl mx-auto p-8 mt-20 mb-20'>
      {/* Viser den aktive testimonial baseret på activeIndex */}
      {/* Hvis activeIndex = 0, så vis testimonialData[0] */}
      <TestimonialCard post={testimonialData[activeIndex]} />
      {/* ScrollBar komponent til at skifte mellem testimonials */}
      <ScrollBar active={activeIndex} onSelect={setActiveIndex} activeColor='bg-secondary' color='bg-white' />
    </section>
  );
};

export default TestimonialList;
