import Image from "next/image";

const TableEl = ({ table, tableNumber }: { table: string; tableNumber: number }) => {
	return (
		<div className="grid place-items-center relative group cursor-pointer">
			{/* Vi bruger grid-stacking til at lægge tallet ovenpå billedet */}
			<Image
				className="col-start-1 row-start-1 transition-transform group-hover:scale-110"
				src={`/icon/${table}`}
				alt={`Table ${tableNumber}`}
				width={100}
				height={100}
			/>
			<p className="col-start-1 row-start-1 z-10 font-bold text-white text-xl pointer-events-none">{tableNumber}</p>
		</div>
	);
};

export default TableEl;
