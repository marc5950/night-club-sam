"use client";
import { useForm } from "react-hook-form";
import Button from "./general/Button";

const Newsletter = () => {
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
    <div className='justify-center items-center text-center py-8 px-4 max-w-[1440px] mx-auto '>
      <h4 className='text-white'>Want the latest night club news</h4>
      <p className='text-white mt-5 mb-10'>
        Subscribe to our newsletter <br /> and never miss an <span className='text-secondary'>Event</span>
      </p>
      <div className='flex flex-col md:flex-row items-center gap-4 justify-center mb-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='email'
            placeholder='Enter your email'
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className='border-b border-white text-white text-lg px-4 py-4 capitalize w-70'
          />
        </form>
        <Button text='Subscribe' />
      </div>
    </div>
  );
};

export default Newsletter;
