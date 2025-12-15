import { z } from "zod";
import { tables } from "./data/tables";

// 1. Definer Zod schema (Regler for formularen)
export const schema = z
	// Laver et object med tilhørende valideringsregler i forhold til booking af bord formen
	.object({
		// Navn skal være en tekststreng på mindst 2 tegn
		name: z.string().min(2, { message: "Navnet skal være mindst 2 bogstaver" }),

		// Email skal være en gyldig email-adresse
		email: z.string().min(7, { message: "Angiv venligst din email" }).email({ message: "Ugyldig email adresse" }),

		// Bordnummer skal være et tal (z.number) og mindst 1
		table: z.number({ error: "Vælg venligst et bord" }).min(1, { message: "Vælg venligst et bord" }),

		// Antal gæster skal være et tal og mindst 1
		// (Bemærk: Vi tjekker om der er plads ved bordet i bunden af dette schema, da det afhænger af 'table' feltet)
		numberOfGuests: z.number({ error: "Angiv antal gæster" }).min(1, { message: "Der skal være mindst 1 gæst" }),

		// Dato skal være en tekststreng og må ikke være i fortiden
		date: z
			.string()
			.min(1, { message: "Vælg venligst en dato" })
			// refine er en funktion der kommer med Zod, og som lader os lave vores egne regler
			.refine((dato) => new Date(dato) > new Date(), {
				message: "Datoen skal være i fremtiden",
			}),

		// Telefonnummer skal være en tekststreng med kun tal
		contactNumber: z
			.string()
			.min(1, { message: "Angiv venligst dit telefonnummer" })
			.regex(/^[0-9]+$/, { message: "Skriv kun tal" }),

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
			message: "For mange gæster til dette bord",
			path: ["numberOfGuests"], // Sæt fejlen på numberOfGuests feltet
		}
	);

// 2. Udled typen fra schemaet
// Type = et TypeScript interface der matcher schemaet ovenfor
// z.infer<typeof schema> laver automatisk typen baseret på Zod schemaet
export type BookFormData = z.infer<typeof schema>;
