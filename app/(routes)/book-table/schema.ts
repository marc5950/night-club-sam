import { z } from "zod";
import { tables } from "./data/tables";

// 1. Definer Zod schema (Regler for formularen)
export const schema = z
  // Laver et object med tilhørende valideringsregler i forhold til booking af bord formen
  .object({
    // Navn skal være en tekststreng på mindst 2 tegn
    name: z.string().min(2, { message: "The name must be at least 2 characters long" }),

    // Email skal være en gyldig email-adresse
    email: z.string().min(7, { message: "Please enter your email" }).email({ message: "Invalid email address" }),

    // Bordnummer skal være et tal (z.number) og mindst 1
    table: z.number({ error: "Please select a table" }).min(1, { message: "Please select a table" }),

    // Antal gæster skal være et tal og mindst 1
    // (Bemærk: Vi tjekker om der er plads ved bordet i bunden af dette schema, da det afhænger af 'table' feltet)
    numberOfGuests: z.number({ error: "Please enter the number of guests" }).min(1, { message: "There must be at least 1 guest" }),
    // Dato skal være en tekststreng og må ikke være i fortiden
    date: z
      .string()
      .min(1, { message: "Please select a date" })
      // refine er en funktion der kommer med Zod, og som lader os lave vores egne regler
      .refine((dato) => new Date(dato) > new Date(), {
        message: "The date must be in the future",
      }),

    // Telefonnummer skal være en tekststreng med kun tal
    contactNumber: z
      .string()
      .min(1, { message: "Please enter your contact number" })
      .regex(/^[0-9]+$/, { message: "Please enter only numbers" }),

    // Kommentar er valgfri (optional)
    comment: z.string().optional(),
  })
  // Tjek om antal gæster passer til bordets kapacitet
  .refine(
    (data) => {
      const table = tables.find((t) => t.id === data.table);
      // Hvis bordet findes, og antal gæster er højere end pladser, returner false (fejl)
      if (table && data.numberOfGuests > table.seats) {
        return false;
      }
      return true;
    },
    {
      message: "Too many guests for this table",
      path: ["numberOfGuests"], // Sæt fejlen på numberOfGuests feltet
    }
  );

// 2. Udled typen fra schemaet
// Type = et TypeScript interface der matcher schemaet ovenfor
// z.infer<typeof schema> laver automatisk typen baseret på Zod schemaet
export type BookFormData = z.infer<typeof schema>;
