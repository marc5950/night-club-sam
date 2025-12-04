"use client";

import { useState } from "react";
import HeroSmall from "../../components/general/HeroSmall";
import BookForm from "./components/BookForm";
import TablesList from "./components/TablesList";

const BookTable = () => {
	// State til at holde styr på hvilket bord der er valgt
	const [selectedTable, setSelectedTable] = useState<number | null>(null);

	return (
		<main>
			<HeroSmall title="Book Table" />
			{/* Vi sender setSelectedTable funktionen ned til TablesList, så vi kan opdatere state når man klikker på et bord */}
			<TablesList onSelectTable={setSelectedTable} />

			{/* Vi sender det valgte bordnummer ned til formularen, så den kan udfylde feltet automatisk */}
			<BookForm selectedTable={selectedTable} />
		</main>
	);
};

export default BookTable;
