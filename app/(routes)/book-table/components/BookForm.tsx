"use client";
import Button from "@/app/components/general/Button";
import { createReservation, getReservations } from "@/app/lib/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface BookFormProps {
	selectedTable: number | null;
}

const BookForm = ({ selectedTable }: BookFormProps) => {
	const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setValue,
		setError,
		clearErrors,
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			table: 0,
			numberOfGuests: 0,
			date: "",
			contactNumber: "",
			comment: "",
		},
	});

	// Opdater table i formularen når selectedTable ændres (når man klikker på et bord)
	useEffect(() => {
		if (selectedTable) {
			setValue("table", selectedTable);
			clearErrors("table");
		}
	}, [selectedTable, setValue, clearErrors]);

	const onSubmit = async (data: {
		name: string;
		email: string;
		table: number;
		numberOfGuests: number;
		date: string;
		contactNumber: string;
		comment: string;
	}) => {
		setSubmitStatus(null);
		try {
			// 1. Tjek om bordet allerede er booket på den valgte dato
			const allReservations = await getReservations();

			const isTableTaken = allReservations.some((res) => res.date === data.date && Number(res.table) === Number(data.table));

			if (isTableTaken) {
				setError("table", {
					type: "manual",
					message: "Dette bord er desværre allerede booket denne aften. Vælg venligst et andet bord eller en anden dato.",
				});
				return; // Stop her, opret ikke reservation
			}

			// 2. Hvis bordet er ledigt, opret reservation
			await createReservation({
				name: data.name,
				email: data.email,
				phone: data.contactNumber,
				table: Number(data.table),
				guests: Number(data.numberOfGuests),
				date: data.date,
				comment: data.comment,
			});

			// 3. Vis succes besked og nulstil formular
			setSubmitStatus({ success: true, message: "Tak for din reservation! Vi glæder os til at se dig." });
			reset();
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitStatus({ success: false, message: "Der skete en fejl ved reservationen. Prøv venligst igen." });
		}
	};

	return (
		<form className="max-w-[1440px] p-6 mx-auto" onSubmit={handleSubmit(onSubmit)}>
			<h3 className="text-white text-[32px] mb-4 font-bold">BOOK A TABLE</h3>

			{/* Feedback besked (Succes eller generel fejl) */}
			{submitStatus && (
				<div className={`p-4 mb-6 rounded ${submitStatus.success ? "bg-green-800 text-white" : "bg-red-800 text-white"}`}>{submitStatus.message}</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mx-auto">
				<div className="mb-4">
					<input
						className="text-white focus:bg-black bg-black border border-white placeholder-white p-4 w-full focus:outline-none focus:border-[#FF2A70] focus:ring-0"
						id="name"
						placeholder="Your Name"
						{...register("name", { required: "Name is required" })}
					/>
					{errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
				</div>
				<div className="mb-4">
					<input
						className="text-white focus:bg-black bg-black border border-white placeholder-white p-4 w-full focus:outline-none focus:border-[#FF2A70] focus:ring-0"
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
					{errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
				</div>
				<div className="mb-4">
					<input
						className="placeholder-white focus:bg-black text-white bg-black border border-white p-4 w-full focus:outline-none focus:border-[#FF2A70] focus:ring-0"
						type="number"
						placeholder="Table Number"
						{...register("table", { required: "Table number is required" })}
					/>
					{errors.table && <p className="text-red-500 mt-1">{errors.table.message}</p>}
				</div>
				<div className="mb-4">
					<input
						className="placeholder-white focus:bg-black text-white bg-black border border-white p-4 w-full focus:outline-none focus:border-[#FF2A70] focus:ring-0"
						type="number"
						placeholder="Number of Guests"
						{...register("numberOfGuests", { required: "Number of guests is required" })}
					/>
					{errors.numberOfGuests && <p className="text-red-500 mt-1">{errors.numberOfGuests.message}</p>}
				</div>
				<div className="mb-4">
					<input
						className="placeholder-white focus:bg-black text-white bg-black border border-white p-4 w-full focus:outline-none focus:border-[#FF2A70] focus:ring-0"
						type="date"
						placeholder="Select Date"
						{...register("date", { required: "Date is required" })}
					/>
					{errors.date && <p className="text-red-500 mt-1">{errors.date.message}</p>}
				</div>
				<div className="mb-4">
					<input
						className="placeholder-white text-white bg-black border-white border p-4 w-full focus:bg-black focus:outline-none focus:border-[#FF2A70] focus:ring-0"
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
			<div className="mb-4">
				<textarea
					className="placeholder-white border border-white focus:outline-none focus:border-[#FF2A70] focus:ring-0 focus:bg-black bg-black p-4 w-full h-70"
					id="comment"
					placeholder="Your Comment"
					{...register("comment")}></textarea>
				{errors.comment && <p className="text-red-500 mt-1">{errors.comment.message}</p>}
			</div>
			<div className="flex justify-end">
				<Button text={isSubmitting ? "Reserving..." : "Reserve"} />
			</div>
		</form>
	);
};

export default BookForm;
