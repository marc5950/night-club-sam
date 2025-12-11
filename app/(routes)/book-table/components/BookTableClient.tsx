"use client";
// "use client" er nødvendigt her, fordi vi bruger React Hooks (useState) til at styre tilstanden for det valgte bord.
// Server Components (som page.tsx) kan ikke bruge hooks eller håndtere brugerinteraktioner direkte.

import { useState } from "react";
import BookForm from "./BookForm";
import TablesList from "./TablesList";

const BookTableClient = () => {
	// State til at holde styr på hvilket bord der er valgt
	const [selectedTable, setSelectedTable] = useState<number | null>(null);

	return (
		<>
			{/* Vi sender setSelectedTable funktionen ned til TablesList, så vi kan opdatere state når man klikker på et bord */}
			<TablesList onSelectTable={setSelectedTable} />

			{/* Vi sender det valgte bordnummer ned til formularen, så den kan udfylde feltet automatisk */}
			<BookForm selectedTable={selectedTable} />
		</>
	);
};

export default BookTableClient;
