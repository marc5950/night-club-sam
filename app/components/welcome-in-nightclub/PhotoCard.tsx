"use client";

import Image from "next/image";
import { useState } from "react";
import BorderHover from "../general/BorderHover";

interface PhotoCardProps {
	image: string;
	icon: React.ReactNode;
	title: string;
	desc: string;
}

const PhotoCard = ({ image, icon, title, desc }: PhotoCardProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className="relative w-60 h-80 overflow-hidden cursor-pointer group"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onTouchStart={() => setIsHovered(true)}
			onTouchEnd={() => setIsHovered(false)}>
			{/* Billede */}
			<Image src={image} alt={title} width={240} height={320} className="object-cover w-full h-full" />

			{/* Sort overlay med animation */}
			<div className={`absolute inset-0 bg-black transition-opacity duration-1500 ${isHovered ? "opacity-full" : "opacity-0"}`}></div>

			{/* Border komponent */}
			<BorderHover isHovered={isHovered} />

			{/* Content - toner frem */}
			<div
				className={`absolute inset-0 flex flex-col items-center justify-center gap-4 text-white transition-opacity duration-1500 ${
					isHovered ? "opacity-100" : "opacity-0"
				}`}>
				<div className="text-5xl text-secondary border border-secondary rounded p-2">{icon}</div>
				<h3 className="text-2xl font-bold uppercase">{title}</h3>
				<p className="text-sm text-center px-4">{desc}</p>
			</div>
		</div>
	);
};

export default PhotoCard;
