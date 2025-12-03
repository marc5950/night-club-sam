"use client";
import { useForm } from "react-hook-form";

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
    <div className='justify-center items-center text-center py-8 px-4'>
      <h4 className='text-white'>Want the latest night club news</h4>
      <p className='text-white'>
        Subscribe to our newsletter <br /> and never miss an <span className='text-secondary'>Event</span>
      </p>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='email'
            placeholder='Enter Your Email'
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className='border-b border-white text-white'
          />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          {isSubmitSuccessful && <p className='text-green-500'>Tak for din tilmelding!</p>}
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
