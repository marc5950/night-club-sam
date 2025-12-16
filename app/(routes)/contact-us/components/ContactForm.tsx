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
      setSubmitMessage("Your message has been sent! We will get back to you shortly.");
      reset(); // Nulstiller formularen
    } catch (error) {
      // Hvis der sker en fejl - vis fejl besked
      setSubmitMessage("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false); // Fjerner loading state uanset resultat
    }
  };

  return (
    <form className="max-w-[1440px] p-6 mx-auto mt-10 mb-10" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 mx-auto w-full md:w-3xl">
        {/* Succes eller fejl besked efter submit */}
        {submitMessage && <p className={`p-4 mb-6 rounded ${submitMessage.includes("sent") ? "bg-green-800 text-primary" : "bg-red-800 text-primary"}`}>{submitMessage}</p>}
        {/* Navn felt */}
        <div className="mb-4">
          <input
            className="text-primary focus:bg-background focus:outline-none focus:border-[#FF2A70] focus:ring-0 bg-background border border-primary placeholder-primary p-4 w-full"
            id="name"
            placeholder="Your Name"
            {...register("name", {
              required: "Please enter your name", // Validation: Name is required
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters long",
              },
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
              required: "Please enter your email", // Validation: Email is required
              pattern: {
                value: /^\S+@\S+$/i, // Ensures it is a valid email format (regex pattern)
                message: "Invalid email address", // Error message for invalid email
              },
            })}
          />
          {/* Viser fejlbesked hvis email ikke er udfyldt eller ugyldig */}
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Kommentar felt */}
        <div>
          <textarea
            className="placeholder-primary focus:bg-background focus:border-[#FF2A70] border border-primary bg-background p-4 w-full h-70 focus:outline-none focus:ring-0"
            id="comment"
            placeholder="Your Comment"
            {...register("comment", {
              required: "Please enter your comment", // Validation: Please enter your comment
            })}
          />
          {/* Viser fejlbesked hvis kommentar ikke er udfyldt */}
          {errors.comment && <p className="text-red-500 mt-1">{errors.comment.message}</p>}
        </div>

        {/* Submit knap */}
        <div className="flex justify-end mt-4">
          <Button text={isSubmitting ? "Sending..." : "Send"} />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
