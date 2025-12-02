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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>Form Component</div>
    </form>
  );
};

export default FormComment;
