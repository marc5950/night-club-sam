"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../general/Header";

const Hero = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [loaderFadeOut, setLoaderFadeOut] = useState(false);
	const [backgroundImage, setBackgroundImage] = useState("");
	const [showLogo, setShowLogo] = useState(false);
	const [showTagline, setShowTagline] = useState(false);
	const [isHeaderSticky, setIsHeaderSticky] = useState(false);

	useEffect(() => {
		// Vælg tilfældigt baggrundsbillede
		const bgImages = ["/bg/header_bg_1.jpg", "/bg/header_bg_2.jpg"];
		const randomBg = bgImages[Math.floor(Math.random() * bgImages.length)];
		setBackgroundImage(randomBg);

		// Preload baggrundsbilledet
		const img = new window.Image();
		img.src = randomBg;
		img.onload = () => {
			// Når billedet er loaded, start fade out af loader
			setTimeout(() => {
				setLoaderFadeOut(true);
				// Fjern loader efter fade out animation
				setTimeout(() => {
					setIsLoading(false);
					// Start logo animation
					setTimeout(() => setShowLogo(true), 200);
					// Start tagline animation efter logo
					setTimeout(() => setShowTagline(true), 800);
				}, 500);
			}, 500);
		};

		// Scroll event for sticky header
		const handleScroll = () => {
			const heroHeight = window.innerHeight;
			const scrollPosition = window.scrollY;

			// Når vi scroller forbi hero, gør header sticky
			if (scrollPosition > heroHeight - 100) {
				setIsHeaderSticky(true);
			} else {
				setIsHeaderSticky(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			<section className="relative h-screen w-full overflow-hidden">
				{/* Loader */}
				{isLoading && (
					<div
						className={`absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${loaderFadeOut ? "opacity-0" : "opacity-100"}`}>
						<Image src="/loader/madbars.gif" alt="Loading..." width={100} height={100} unoptimized />
					</div>
				)}

				{/* Baggrundsbillede */}
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url('${backgroundImage}')`,
					}}></div>

				{/* Hero Content */}
				<div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-120px)]">
					{/* Logo med fold-in animation */}
					<div className={`transition-all duration-1000 ${showLogo ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
						<Image src="/icon/Logo.svg" alt="Night Club Logo" width={772} height={118} />
					</div>

					{/* Tagline med drop-in animation */}
					<div
						className={`transition-all flex flex-col items-center gap-4 duration-1000 ${showTagline ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
						<h1 className="text-white text-[13px] md:text-[32px] font-bold uppercase tracking-[13px] md:tracking-[32px] mt-8 text-center">
							Have a good time
						</h1>
						<Image src="/bottom_line.png" alt="Line" width={300} height={50} />
					</div>
				</div>

				{/* Header i bunden af Hero */}
				<div className="absolute bottom-0 left-0 right-0 z-20">
					<Header />
				</div>
			</section>

			{/* Sticky Header */}
			<div className={`fixed top-0 left-0 right-0 z-50 ${isHeaderSticky ? "translate-y-0" : "-translate-y-full"}`}>
				<Header />
			</div>
		</>
	);
};

export default Hero;
