"use client";
import Button from "@/app/components/general/Button";
import { useForm } from "react-hook-form";
import { createComment } from "@/app/lib/api";
import { useState } from "react";

interface FormCommentProps {
	blogpostId: number;
}

const FormComment = ({ blogpostId }: FormCommentProps) => {
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

		try {
			await createComment({
				blogpostId: blogpostId,
				name: data.name,
				email: data.email,
				content: data.comment,
				date: new Date().toISOString(),
			});
			setSubmitMessage("Comment posted successfully!");
			reset();
		} catch (error) {
			setSubmitMessage("Failed to post comment. Please try again.");
			console.error("Error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form className="max-w-[1440px] p-6 mx-auto md:ml-42 md:mr-42" onSubmit={handleSubmit(onSubmit)}>
			<h3 className="text-primary text-[32px] mb-4 font-bold">LEAVE A COMMENT</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mx-auto">
				<div className="mb-4">
					<input
						className="text-primary focus:outline-none focus:border-[#FF2A70] focus:ring-0  focus:bg-black bg-black border border-primary placeholder-primary p-4 w-full"
						id="name"
						placeholder="Your Name"
						{...register("name", { required: "Name is required" })}
					/>
					{errors.name && <p>{errors.name.message}</p>}
				</div>
				<div className="mb-4">
					<input
						className="text-primary focus:outline-none focus:border-[#FF2A70] focus:ring-0 focus:bg-black bg-black border border-primary placeholder-primary p-4 w-full"
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
			<div className=" mb-4">
				<textarea
					className="placeholder-primary border border-primary focus:outline-none focus:border-[#FF2A70] focus:ring-0 focus:bg-black bg-black p-4 w-full h-70"
					id="comment"
					placeholder="Your Comment"
					{...register("comment", { required: "Comment is required" })}></textarea>
				{errors.comment && <p className="text-red-500 mt-1">{errors.comment.message}</p>}
			</div>
			{submitMessage && (
				<p className={`mb-4 text-center ${submitMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}>{submitMessage}</p>
			)}
			<div className="flex justify-end">
				<Button text={isSubmitting ? "Submitting..." : "Submit"} />
			</div>
		</form>
	);
};

export default FormComment;
