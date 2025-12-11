"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "./general/Button";

const Newsletter = () => {
  // State til at håndtere loading
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({ defaultValues: { email: "" } });

  const onSubmit = (data: { email: string }) => {
    console.log("Email:", data);
    reset();
  };

  return (
    <div className="justify-center items-center text-center py-8 px-4 max-w-[1440px] mx-auto ">
      <h4 className="text-primary text-title3 uppercase font-normal">Want the latest night club news</h4>
      <p className="text-primary mt-4 mb-10 text-p-big font-normal">
        Subscribe to our newsletter and never miss an <span className="text-secondary">Event</span>
      </p>

      {/* Form wrapper omkring både input OG button */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-center gap-4 justify-center mb-5">
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Angiv venligst din email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Ugyldig email adresse",
              },
            })}
            className="focus:bg-background focus:border-[#FF2A70] focus:outline-none focus:ring-0 bg-background border-primary placeholder-primary border-b text-primary text-lg px-4 py-4 capitalize w-70 md:w-130"
          />
          {/* Fejlbesked vises under input feltet */}
          {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
        </div>

        {/* Knap */}
        <Button text={isSubmitting ? "Submitting..." : "Submit"} />
      </form>
    </div>
  );
};

export default Newsletter;
