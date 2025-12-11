import { Metadata } from "next";
import HeroSmall from "../../components/general/HeroSmall";
import BookTableClient from "./components/BookTableClient";

export const metadata: Metadata = {
	title: "Night Club - Book Table",
	description: "Book a table at Night Club",
};

const BookTable = () => {
	return (
		<main>
			<HeroSmall title="Book Table" />
			<BookTableClient />
		</main>
	);
};

export default BookTable;
