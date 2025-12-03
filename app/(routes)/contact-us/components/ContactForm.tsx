"use client";
import Button from "@/app/components/general/Button";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { name: "", email: "", comment: "" } });

  const onSubmit = (data: { name: string; email: string; comment: string }) => {
    console.log("Form data:", data);
    reset();
  };

  return (
    <form className="max-w-[1440px] p-6 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 mx-auto w-full md:w-3xl">
        <div className="mb-4">
          <input className="text-white  focus:bg-black focus:outline-none focus:border-[#FF2A70]  focus:ring-0 bg-black border border-white placeholder-white p-4 w-full" id="name" placeholder="Your Name" {...register("name", { required: "Name is required" })} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <input
            className="text-white focus:bg-black focus:border-[#FF2A70] focus:outline-none focus:ring-0 bg-black border border-white placeholder-white p-4 w-full"
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
          <textarea className="placeholder-white focus:bg-black focus:border-[#FF2A70] border border-white bg-black p-4 w-full h-70 focus:outline-none focus:ring-0" id="comment" placeholder="Your Comment" {...register("comment", { required: "Comment is required" })}></textarea>
          {errors.comment && <p className="text-red-500 mt-1">{errors.comment.message}</p>}
        </div>
        <div className="flex justify-end">
          <Button text="Send" />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
