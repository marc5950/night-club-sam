"use client";
import Button from "@/app/components/general/Button";
import { useForm } from "react-hook-form";
import { sendContactMessage } from "@/app/lib/api";
import { useState } from "react";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { name: "", email: "", comment: "" } });

  const onSubmit = async (data: { name: string; email: string; comment: string }) => {
    setIsSubmitting(true);
    setSubmitMessage("");
    console.log("Form data:", data);

    try {
      await sendContactMessage({
        name: data.name,
        email: data.email,
        message: data.comment,
      });
      setSubmitMessage("Your message has been sent successfully!");
      reset();
    } catch (error) {
      setSubmitMessage("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="max-w-[1440px] p-6 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 mx-auto w-full md:w-3xl">
        <div className="mb-4">
          <input className="text-primary  focus:bg-background focus:outline-none focus:border-[#FF2A70]  focus:ring-0 bg-background border border-primary placeholder-primary p-4 w-full" id="name" placeholder="Your Name" {...register("name", { required: "Name is required" })} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <input
            className="text-primary focus:bg-background focus:border-[#FF2A70] focus:outline-none focus:ring-0 bg-background border border-primary placeholder-primary p-4 w-full"
            id="email"
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <textarea className="placeholder-primary focus:bg-background focus:border-[#FF2A70] border border-primary bg-background p-4 w-full h-70 focus:outline-none focus:ring-0" id="comment" placeholder="Your Comment" {...register("comment", { required: "Comment is required" })}></textarea>
          {errors.comment && <p>{errors.comment.message}</p>}
        </div>
        {submitMessage && <p className={`mb-4 text-center ${submitMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}>{submitMessage}</p>}
        <div className="flex justify-end">
          <Button text={isSubmitting ? "Sending..." : "Send"} />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
