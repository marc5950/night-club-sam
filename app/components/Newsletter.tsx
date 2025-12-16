"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "./general/Button";
import { createNewsletterSubscription } from "../lib/api";

export interface NewsletterSubscription {
  id: number;
  email: string;
  subscribedAt: string;
}

const Newsletter = () => {
  // State til at håndtere om formularen er ved at blive sendt
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State til at vise succes eller fejl besked til brugeren
  const [submitMessage, setSubmitMessage] = useState("");

  // React Hook Form setup - hånsdterer formularvalidering og data
  const {
    register, // Registrerer input felter til validering
    handleSubmit, // Wrapper submit funktionen og validerer først
    formState: { errors }, // Indeholder valideringsfejl
    reset, // Nulstiller formularen efter succesfuld indsendelse
  } = useForm({ defaultValues: { email: "" } });

  // Funktion der køres når formularen submittes OG valideringen er succesfuld
  const onSubmit = async (data: { email: string }) => {
    setIsSubmitting(true); // Sætter loading state
    setSubmitMessage(""); // Nulstiller tidligere beskeder
    console.log("Email:", data);

    try {
      // Brug API funktionen fra api.ts
      await createNewsletterSubscription({ email: data.email });

      // Hvis succesfuld - vis succes besked
      setSubmitMessage("Tak for din tilmelding! Du vil modtage vores nyhedsbrev.");
      reset();
    } catch (error) {
      // Hvis der sker en fejl - vis fejl besked
      setSubmitMessage("Der opstod en fejl under tilmelding. Prøv venligst igen.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="justify-center items-center text-center py-8 px-4 max-w-[1440px] mx-auto ">
      <h4 className="text-primary text-title3 uppercase font-normal">Want the latest night club news</h4>
      <p className="text-primary mt-4 mb-10 text-p-big font-normal">
        Subscribe to our newsletter and never miss an <span className="text-secondary">Event</span>
      </p>

      {/* Form wrapper omkring både input OG button */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col md:flex-row items-center gap-4 justify-center mb-5">
        {/* Email felt */}
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Angiv venligst din email", // Validering: Email er påkrævet
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex til email validering
                message: "Ugyldig email adresse", // Fejlbesked ved ugyldig email
              },
            })}
            className="focus:bg-background focus:border-[#FF2A70] focus:outline-none focus:ring-0 bg-background border-primary placeholder-primary border-b text-primary text-lg px-4 py-4 capitalize w-70 md:w-130"
          />
          {/* Viser fejlbesked hvis email ikke er udfyldt eller ugyldig */}
          {errors.email && <p className="text-red-500 mt-1 text-sm text-left">{errors.email.message}</p>}
        </div>

        {/* Submit knap */}
        <Button text={isSubmitting ? "Subscribing..." : "Subscribe"} />
      </form>

      {/* Succes eller fejl besked efter submit */}
      {submitMessage && <p className={`text-center ${submitMessage.includes("Tak") ? "text-green-500" : "text-red-500"}`}>{submitMessage}</p>}
    </div>
  );
};

export default Newsletter;
