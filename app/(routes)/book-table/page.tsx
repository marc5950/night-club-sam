import HeroSmall from "../../components/general/HeroSmall";
import BookForm from "./components/BookForm";
import TablesList from "./components/TablesList";

const bookTable = () => {
	return (
		<main>
			<HeroSmall title="Book Table" />
			<TablesList />
			<BookForm />
		</main>
	);
};

export default bookTable;
