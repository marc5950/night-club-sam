"use client";
import Button from "@/app/components/general/Button";
import { createReservation, getReservations } from "@/app/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BookFormData, schema } from "../schema";

interface BookFormProps {
  selectedTable: number | null;
}

const BookForm = ({ selectedTable }: BookFormProps) => {
  // State til at håndtere feedback beskeder (succes eller fejl) efter indsendelse
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  // useForm hook fra react-hook-form styrer hele formularens tilstand
  const {
    register, // Bruges til at registrere input felter i formularen
    handleSubmit, // Håndterer indsendelse og validering
    formState: { errors, isSubmitting }, // Indeholder fejl og status (f.eks. om den loader)
    reset, // Funktion til at nulstille formularen
    setValue, // Funktion til manuelt at sætte en værdi i et felt
    setError, // Funktion til manuelt at sætte en fejl på et felt
    clearErrors, // Funktion til at fjerne fejl fra et felt
    // Laver react-hook-form med Zod schemaet for validering
  } = useForm<BookFormData>({
    // Tilføj resolver: Forbinder Zod schemaet med React Hook Form
    // resolver er et property der kommer fra zodResolver pakken og som forbinder Zod validering med react-hook-form
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      // Vi bruger undefined for tal, så input feltet er tomt (viser placeholder)
      table: undefined,
      numberOfGuests: undefined,
      date: "",
      contactNumber: "",
      comment: "",
    },
  });

  // Effekt: Opdater table i formularen når selectedTable ændres (når man klikker på et bord på kortet)
  useEffect(() => {
    if (selectedTable) {
      // Sæt værdien i formularen
      setValue("table", selectedTable);
      // Fjern eventuelle fejlbeskeder på feltet, da brugeren lige har valgt et gyldigt bord
      clearErrors("table");
    }
  }, [selectedTable, setValue, clearErrors]);

  // Denne funktion køres KUN hvis Zod valideringen er godkendt
  // async fordi vi laver API kald inde i den
  // async betyder at funktionen returnerer et Promise
  // data er af typen BookFormData (defineret i schema.ts)
  const onSubmit = async (data: BookFormData) => {
    setSubmitStatus(null); // Nulstil tidligere status beskeder

    try {
      // 1. Tjek om bordet allerede er booket på den valgte dato
      // Vi gør dette tjek her i onSubmit (og ikke i Zod), fordi det kræver et API-kald.
      // Hvis vi lagde det i Zod, ville den hente alle reservationer hver gang brugeren ændrer datoen, hvilket ville gøre formularen langsom.
      const allReservations = await getReservations();

      // Tjek om der findes en reservation med samme dato og bordnummer
      const isTableTaken = allReservations.some((res) => res.date === data.date && Number(res.table) === Number(data.table));

      if (isTableTaken) {
        // Hvis bordet er optaget, sæt en manuel fejl på 'table' feltet
        setError("table", {
          type: "manual",
          message: "This table is already booked on this date. Please choose another table or date.",
        });
        return; // Stop her, opret ikke reservation
      }

      // 2. Hvis bordet er ledigt, opret reservation via API'et
      const result = await createReservation({
        name: data.name,
        email: data.email,
        phone: data.contactNumber,
        table: Number(data.table),
        guests: Number(data.numberOfGuests),
        date: data.date,
        comment: data.comment || "",
      });

      if (!result) {
        throw new Error("Failed to create reservation");
      }

      // 3. Vis succes besked og nulstil formular
      setSubmitStatus({ success: true, message: "Thank you for your reservation! We look forward to seeing you." });
      reset(); // Tøm felterne
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({ success: false, message: "There was an error with your reservation. Please try again." });
    }
  };

  return (
    <form className="max-w-[1440px] p-6 mx-auto" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/* --- 1. Formular Overskrift --- */}
      <h3 className="text-primary text-[32px] mb-4 font-bold">BOOK A TABLE</h3>

      {/* --- 2. Feedback Besked (Succes eller Fejl) --- */}
      {/* Vises kun hvis der er en status besked fra onSubmit */}
      {submitStatus && <div className={`p-4 mb-6 rounded ${submitStatus.success ? "bg-green-800 text-primary" : "bg-red-800 text-primary"}`}>{submitStatus.message}</div>}

      {/* --- 3. Input Felter (Grid Layout) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mx-auto">
        {/* Navn Felt */}
        <div className="mb-4">
          <input
            className="text-primary focus:bg-background bg-background border border-primary placeholder-primary p-4 w-full focus:outline-none focus:border-[#FF2A70] focus:ring-0"
            id="name"
            placeholder="Your Name"
            {...register("name")} // Forbinder inputtet med Zod schemaet 'name'
          />
          {/* Vis fejlbesked hvis validering fejler */}
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Email Felt */}
        <div className="mb-4">
          <input className="text-primary focus:bg-background bg-background border border-primary placeholder-primary p-4 w-full focus:outline-none focus:border-[#FF2A70] focus:ring-0" id="email" type="email" placeholder="Your Email" {...register("email")} />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Bordnummer Felt */}
        <div className="mb-4">
          {/* Vi bruger valueAsNumber: true for at sikre at inputtet bliver sendt som et tal til Zod. */}
          <input className="placeholder-primary focus:bg-background text-primary bg-background border border-primary p-4 w-full focus:outline-none focus:border-[#FF2A70] focus:ring-0" type="number" placeholder="Table Number" {...register("table", { valueAsNumber: true })} />
          {errors.table && <p className="text-red-500 mt-1">{errors.table.message}</p>}
        </div>

        {/* Antal Gæster Felt */}
        <div className="mb-4">
          <input className="placeholder-primary focus:bg-background text-primary bg-background border border-primary p-4 w-full focus:outline-none focus:border-[#FF2A70] focus:ring-0" type="number" placeholder="Number of Guests" {...register("numberOfGuests", { valueAsNumber: true })} />
          {errors.numberOfGuests && <p className="text-red-500 mt-1">{errors.numberOfGuests.message}</p>}
        </div>

        {/* Dato Vælger */}
        <div className="mb-4">
          <input className="placeholder-primary focus:bg-background text-primary bg-background border border-primary p-4 w-full focus:outline-none focus:border-[#FF2A70] focus:ring-0" type="date" placeholder="Select Date" {...register("date")} />
          {errors.date && <p className="text-red-500 mt-1">{errors.date.message}</p>}
        </div>

        {/* Telefonnummer Felt */}
        <div className="mb-4">
          <input className="placeholder-primary text-primary bg-background border-primary border p-4 w-full focus:bg-background focus:outline-none focus:border-[#FF2A70] focus:ring-0" type="text" placeholder="Your Contact Number" {...register("contactNumber")} />
          {errors.contactNumber && <p className="text-red-500 mt-1">{errors.contactNumber.message}</p>}
        </div>
      </div>

      {/* --- 4. Kommentar Felt (Textarea) --- */}
      <div className="mb-4">
        <textarea className="placeholder-primary border border-primary focus:outline-none focus:border-[#FF2A70] focus:ring-0 focus:bg-background bg-background p-4 w-full h-70" id="comment" placeholder="Your Comment" {...register("comment")}></textarea>
        {errors.comment && <p className="text-red-500 mt-1">{errors.comment.message}</p>}
      </div>

      {/* --- 5. Indsend Knap --- */}
      <div className="flex justify-end">
        {/* Knappen viser "Reserving..." mens formularen indsendes (isSubmitting er true) */}
        <Button text={isSubmitting ? "Reserving..." : "Reserve"} />
      </div>
    </form>
  );
};

export default BookForm;
