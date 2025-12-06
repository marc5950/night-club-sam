import TableEl from "./TableEl";
import { tables } from "../data/tables";

interface TablesListProps {
	onSelectTable: (table: number) => void;
}

const TablesList = ({ onSelectTable }: TablesListProps) => {
	return (
		// Vi bruger grid layout til at vise bordene
		// Mobile: grid-cols-3 (3 borde pr række) for at undgå for meget scroll
		// Desktop (md): grid-cols-5 (5 borde pr række) som ønsket
		<section className="grid grid-cols-3 md:grid-cols-5 gap-8 max-w-4xl mx-auto p-8 justify-items-center">
			{tables.map((table) => (
				// Vi skal bruge både 'key' og 'table' her:
				// 'key' er til React (så den kan holde styr på listen)
				// 'table' er en prop vi sender til vores komponent (så vi kan vise tallet)
				<TableEl key={table.id} tableType={table.type} seats={table.seats} table={table.id} onSelect={() => onSelectTable(table.id)} />
			))}
		</section>
	);
};

export default TablesList;
