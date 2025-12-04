import TableEl from "./TableEl";

interface TablesListProps {
	onSelectTable: (table: number) => void;
}

const TablesList = ({ onSelectTable }: TablesListProps) => {
	return (
		// Vi bruger grid layout til at vise bordene
		// Mobile: grid-cols-3 (3 borde pr række) for at undgå for meget scroll
		// Desktop (md): grid-cols-5 (5 borde pr række) som ønsket
		<section className="grid grid-cols-3 md:grid-cols-5 gap-8 max-w-4xl mx-auto p-8 justify-items-center">
			<TableEl tableType={"table1.svg"} table={1} onSelect={() => onSelectTable(1)} />
			<TableEl tableType={"table1.svg"} table={2} onSelect={() => onSelectTable(2)} />
			<TableEl tableType={"table2.svg"} table={3} onSelect={() => onSelectTable(3)} />
			<TableEl tableType={"table1.svg"} table={4} onSelect={() => onSelectTable(4)} />
			<TableEl tableType={"table3.svg"} table={5} onSelect={() => onSelectTable(5)} />
			<TableEl tableType={"table1.svg"} table={6} onSelect={() => onSelectTable(6)} />
			<TableEl tableType={"table1.svg"} table={7} onSelect={() => onSelectTable(7)} />
			<TableEl tableType={"table2.svg"} table={8} onSelect={() => onSelectTable(8)} />
			<TableEl tableType={"table1.svg"} table={9} onSelect={() => onSelectTable(9)} />
			<TableEl tableType={"table3.svg"} table={10} onSelect={() => onSelectTable(10)} />
			<TableEl tableType={"table1.svg"} table={11} onSelect={() => onSelectTable(11)} />
			<TableEl tableType={"table1.svg"} table={12} onSelect={() => onSelectTable(12)} />
			<TableEl tableType={"table2.svg"} table={13} onSelect={() => onSelectTable(13)} />
			<TableEl tableType={"table1.svg"} table={14} onSelect={() => onSelectTable(14)} />
			<TableEl tableType={"table3.svg"} table={15} onSelect={() => onSelectTable(15)} />
		</section>
	);
};

export default TablesList;
