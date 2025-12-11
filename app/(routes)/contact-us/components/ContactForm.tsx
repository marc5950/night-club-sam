"use client";
import Button from "@/app/components/general/Button";
import { useForm } from "react-hook-form";
import { sendContactMessage } from "@/app/lib/api";
import { useState } from "react";

const ContactForm = () => {
  // State til at håndtere om formularen er ved at blive sendt
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State til at vise succes eller fejl besked til brugeren
  const [submitMessage, setSubmitMessage] = useState("");

  // React Hook Form setup - håndterer formularvalidering og data
  const {
    register, // Registrerer input felter til validering
    handleSubmit, // Wrapper submit funktionen og validerer først
    formState: { errors }, // Indeholder valideringsfejl
    reset, // Nulstiller formularen efter succesfuld indsendelse
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });

  // Funktion der køres når formularen submittes OG valideringen er succesfuld
  const onSubmit = async (data: { name: string; email: string; comment: string }) => {
    setIsSubmitting(true); // Sætter loading state
    setSubmitMessage(""); // Nulstiller tidligere beskeder
    console.log("Form data:", data);

    try {
      // Sender data til API'et
      await sendContactMessage({
        name: data.name,
        email: data.email,
        message: data.comment,
      });

      // Hvis succesfuld - vis succes besked
      setSubmitMessage("Din besked er sendt! Vi vender tilbage til dig snarest.");
      reset(); // Nulstiller formularen
    } catch (error) {
      // Hvis der sker en fejl - vis fejl besked
      setSubmitMessage("Der opstod en fejl under afsendelse af din besked. Prøv venligst igen.");
    } finally {
      setIsSubmitting(false); // Fjerner loading state uanset resultat
    }
  };

  return (
    <form className="max-w-[1440px] p-6 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 mx-auto w-full md:w-3xl">
        {/* Navn felt */}
        <div className="mb-4">
          <input
            className="text-primary focus:bg-background focus:outline-none focus:border-[#FF2A70] focus:ring-0 bg-background border border-primary placeholder-primary p-4 w-full"
            id="name"
            placeholder="Your Name"
            {...register("name", {
              required: "Angiv venligst dit navn", // Validering: Navn er påkrævet
            })}
          />
          {/* Viser fejlbesked hvis navn ikke er udfyldt */}
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Email felt */}
        <div className="mb-4">
          <input
            className="text-primary focus:bg-background focus:border-[#FF2A70] focus:outline-none focus:ring-0 bg-background border border-primary placeholder-primary p-4 w-full"
            id="email"
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: "Angiv venligst din email", // Validering: Email er påkrævet
              pattern: {
                value: /^\S+@\S+$/i, // Sørger for at det er en gyldig email format (regex-mønster)
                message: "Ugyldig email adresse", // Fejlbesked ved ugyldig email
              },
            })}
          />
          {/* Viser fejlbesked hvis email ikke er udfyldt eller ugyldig */}
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Kommentar felt */}
        <div className="mb-4">
          <textarea
            className="placeholder-primary focus:bg-background focus:border-[#FF2A70] border border-primary bg-background p-4 w-full h-70 focus:outline-none focus:ring-0"
            id="comment"
            placeholder="Your Comment"
            {...register("comment", {
              required: "Angiv venligst hvad du har brug for hjælp til", // Validering: Angiv venligst hvad du har brug for hjælp til
            })}
          />
          {/* Viser fejlbesked hvis kommentar ikke er udfyldt */}
          {errors.comment && <p className="text-red-500 mt-1">{errors.comment.message}</p>}
        </div>

        {/* Succes eller fejl besked efter submit */}
        {submitMessage && <p className={`mb-4 text-center ${submitMessage.includes("sendt") ? "text-green-500" : "text-red-500"}`}>{submitMessage}</p>}

        {/* Submit knap */}
        <div className="flex justify-end">
          <Button text={isSubmitting ? "Sending..." : "Send"} />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
