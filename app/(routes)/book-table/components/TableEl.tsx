import Image from "next/image";

interface TableElProps {
	tableType: string;
	table: number;
	onSelect: () => void;
}

const TableEl = ({ tableType, table, onSelect }: TableElProps) => {
	return (
		<div onClick={onSelect} className="grid place-items-center relative group cursor-pointer">
			{/* Vi bruger grid-stacking til at lægge tallet ovenpå billedet */}
			<Image
				className="col-start-1 row-start-1 transition-transform group-hover:scale-110"
				src={`/icon/${tableType}`}
				alt={`Table ${table}`}
				width={100}
				height={100}
			/>
			<p className="col-start-1 row-start-1 z-10 font-bold text-primary text-xl pointer-events-none">{table}</p>
		</div>
	);
};

export default TableEl;
