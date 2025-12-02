"use client";
import { useForm } from "react-hook-form";

const FormComment = () => {
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
      <h3 className="text-white text-[32px] mb-4 font-bold">LEAVE A COMMENT</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mx-auto">
        <div className="mb-4">
          <input className="text-white  focus:bg-black bg-black border border-white placeholder-white p-4 w-full" id="name" placeholder="Your Name" {...register("name", { required: "Name is required" })} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <input
            className="text-white focus:bg-black bg-black border border-white placeholder-white p-4 w-full"
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
      </div>
      <div className="border border-white mb-4 h-70">
        <textarea className="placeholder-white focus:bg-black bg-black p-4 w-full h-70" id="comment" placeholder="Your Comment" {...register("comment", { required: "Comment is required" })}></textarea>
        {errors.comment && <p className="text-red-500 mt-1">{errors.comment.message}</p>}
      </div>
    </form>
  );
};

export default FormComment;
