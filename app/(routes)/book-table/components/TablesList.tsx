import TableEl from "./TableEl";

const TablesList = () => {
	return (
		// Vi bruger grid layout til at vise bordene
		// Mobile: grid-cols-3 (3 borde pr række) for at undgå for meget scroll
		// Desktop (md): grid-cols-5 (5 borde pr række) som ønsket
		<section className="grid grid-cols-3 md:grid-cols-5 gap-8 max-w-4xl mx-auto p-8 justify-items-center">
			<TableEl table={"table1.svg"} tableNumber={1} />
			<TableEl table={"table1.svg"} tableNumber={2} />
			<TableEl table={"table2.svg"} tableNumber={3} />
			<TableEl table={"table1.svg"} tableNumber={4} />
			<TableEl table={"table3.svg"} tableNumber={5} />
			<TableEl table={"table1.svg"} tableNumber={6} />
			<TableEl table={"table1.svg"} tableNumber={7} />
			<TableEl table={"table2.svg"} tableNumber={8} />
			<TableEl table={"table1.svg"} tableNumber={9} />
			<TableEl table={"table3.svg"} tableNumber={10} />
			<TableEl table={"table1.svg"} tableNumber={11} />
			<TableEl table={"table1.svg"} tableNumber={12} />
			<TableEl table={"table2.svg"} tableNumber={13} />
			<TableEl table={"table1.svg"} tableNumber={14} />
			<TableEl table={"table3.svg"} tableNumber={15} />
		</section>
	);
};

export default TablesList;
