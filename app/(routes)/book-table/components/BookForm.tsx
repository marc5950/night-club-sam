"use client";
import Button from "@/app/components/general/Button";
import { useForm } from "react-hook-form";

const BookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { name: "", email: "", tableNumber: 0, numberOfGuests: 0, date: "", contactNumber: "", comment: "" } });

  const onSubmit = (data: { name: string; email: string; tableNumber: number; numberOfGuests: number; date: string; contactNumber: string; comment: string }) => {
    console.log("Form data:", data);
    reset();
  };

  return (
    <form className="max-w-[1440px] p-6 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-white text-[32px] mb-4 font-bold">BOOK A TABLE</h3>
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
        <div className="text-white bg-black border border-white p-4 w-full mb-4">
          <input className="placeholder-white focus:bg-black bg-black p-4" type="number" placeholder="Table Number" {...register("tableNumber", { required: "Table number is required" })} />
          {errors.tableNumber && <p>{errors.tableNumber.message}</p>}
        </div>
        <div className="text-white bg-black border border-white p-4 w-full mb-4">
          <input className="placeholder-white focus:bg-black bg-black p-4" type="number" placeholder="Number of Guests" {...register("numberOfGuests", { required: "Number of guests is required" })} />
          {errors.numberOfGuests && <p>{errors.numberOfGuests.message}</p>}
        </div>
        <div className="text-white bg-black border border-white p-4 w-full mb-4">
          <input className="placeholder-white focus:bg-black bg-black p-4" type="date" placeholder="Select Date" {...register("date", { required: "Date is required" })} />
          {errors.date && <p>{errors.date.message}</p>}
        </div>
        <div className="text-white bg-black border border-white p-4 w-full mb-4">
          <input
            className="placeholder-white focus:bg-black bg-black p-4"
            type="text"
            placeholder="Your Contact Number"
            {...register("contactNumber", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numbers are allowed",
              },
            })}
          />
          {errors.contactNumber && <p className="text-red-500 mt-1">{errors.contactNumber.message}</p>}
        </div>
      </div>
      <div className="border border-white mb-4">
        <textarea className="placeholder-white focus:bg-black bg-black p-4 w-full h-70" id="comment" placeholder="Your Comment" {...register("comment", { required: "Comment is required" })}></textarea>
        {errors.comment && <p className="text-red-500 mt-1">{errors.comment.message}</p>}
      </div>
      <div className="flex justify-end">
        <Button text="Submit" />
      </div>
    </form>
  );
};

export default BookForm;
