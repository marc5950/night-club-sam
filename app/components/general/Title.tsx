import Image from "next/image";

const Title = ({ title }: { title: string }) => {
	return (
		<div className="flex flex-col items-center text-center gap-4 m-8">
			<h2 className="uppercase text-4xl text-white">{title}</h2>
			<Image src="/bottom_line.png" alt="Underline" width={240} height={2} />
		</div>
	);
};

export default Title;
