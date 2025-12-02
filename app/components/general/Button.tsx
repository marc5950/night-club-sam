const Button = ({ text }: { text: string }) => {
	return (
		<button className="text-white text-lg px-4 py-4 uppercase border-t border-b border-white hover:text-secondary hover:border-secondary cursor-pointer transition-all duration-300">
			{text}
		</button>
	);
};

export default Button;
