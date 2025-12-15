"use client"; // Client-side komponent der kører i browseren

// Imports
import Button from "@/app/components/general/Button";
import { useForm } from "react-hook-form"; // Håndterer formular validering
import { createComment } from "@/app/lib/api"; // API funktion til at gemme kommentar
import { useState } from "react";

// Props interface - komponenten modtager blogpost ID
interface FormCommentProps {
  blogpostId: number;
}

// Komponent til at skrive kommentarer på blogindlæg
const FormComment = ({ blogpostId }: FormCommentProps) => {
  // State til loading og beskeder
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // React Hook Form setup med validering
  const {
    register, // Registrerer input felter
    handleSubmit, // Håndterer submit og validering
    formState: { errors }, // Valideringsfejl
    reset, // Nulstiller formularen
  } = useForm({ defaultValues: { name: "", email: "", comment: "" } });

  // Submit funktion - køres kun hvis validering er OK
  const onSubmit = async (data: { name: string; email: string; comment: string }) => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Sender kommentar til API
      await createComment({
        blogpostId: blogpostId,
        name: data.name,
        email: data.email,
        content: data.comment,
        date: new Date().toISOString(),
      });
      setSubmitMessage("Your comment has been added! Thank you for your feedback.");
      reset(); // Nulstiller formularen ved success
    } catch (error) {
      setSubmitMessage("There was an error submitting your comment. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="max-w-[1440px] p-4 mx-auto mt-10 mb-10 md:ml-42 md:mr-42 md:p-0" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-primary text-[32px] mb-4 font-bold">LEAVE A COMMENT</h3>

      {/* Navn og Email felter - side om side på desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mx-auto">
        {/* Navn felt med required validering */}

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
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Email felt med required og format validering */}
        <div className="mb-4">
          <input
            className="text-primary focus:outline-none focus:border-[#FF2A70] focus:ring-0 focus:bg-black bg-black border border-primary placeholder-primary p-4 w-full"
            id="email"
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^\S+@\S+$/i, // Regex til email validering
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Kommentar felt med required validering */}
      <div className=" mb-4">
        <textarea className="placeholder-primary border border-primary focus:outline-none focus:border-[#FF2A70] focus:ring-0 focus:bg-black bg-black p-4 w-full h-70" id="comment" placeholder="Your Comment" {...register("comment", { required: "Please enter your comment" })}></textarea>
        {errors.comment && <p className="text-red-500 mt-1">{errors.comment.message}</p>}
      </div>

      {/* Succes eller fejl besked */}
      {submitMessage && <p className={`mb-4 text-center ${submitMessage.includes("added") ? "text-green-500" : "text-red-500"}`}>{submitMessage}</p>}

      {/* Submit knap - disabled mens der sendes */}
      <div className="flex justify-end">
        <Button text={isSubmitting ? "Submitting..." : "Submit"} />
      </div>
    </form>
  );
};

export default FormComment;
