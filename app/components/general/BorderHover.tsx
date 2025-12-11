interface BorderHoverProps {
	isHovered: boolean;
}

const BorderHover = ({ isHovered }: BorderHoverProps) => {
	return (
		<>
			{/* Top border */}
			<div className={`absolute top-0 left-0 right-0 h-1 bg-secondary transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}></div>

			{/* Bottom border */}
			<div
				className={`absolute bottom-0 left-0 right-0 h-1 bg-secondary transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}></div>

			{/* Top-left corner */}
			<div
				className={`absolute top-0 left-0 w-0 h-0 border-r-30 border-r-transparent border-t-30 border-t-secondary transition-all duration-500 ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}></div>

			{/* Bottom-right corner */}
			<div
				className={`absolute bottom-0 right-0 w-0 h-0 border-l-30 border-l-transparent border-b-30 border-b-secondary transition-all duration-500 ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}></div>
		</>
	);
};

export default BorderHover;
