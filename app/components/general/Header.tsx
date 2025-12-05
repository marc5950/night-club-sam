"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const isActive = (path: string) => {
		return pathname === path;
	};

	return (
		<header className="bg-background relative">
			{/* Top-left corner */}
			<div className="absolute top-0 left-0 w-0 h-0 border-r-30 border-r-transparent border-t-30 border-t-secondary"></div>

			{/* Bottom-right corner */}
			<div className="absolute bottom-0 right-0 w-0 h-0 border-l-30 border-l-transparent border-b-30 border-b-secondary"></div>
			{/* Desktop Header */}
			<div className="hidden md:block border border-secondary px-6 py-6">
				<nav className="max-w-[1440px] mx-auto flex justify-between items-center ">
					<Link href="/">
						<Image src="/icon/Logo_main.svg" alt="Night Club Logo" width={228} height={54} />
					</Link>
					<ol className="flex gap-6 uppercase">
						<li className="min-w-12">
							<Link
								href="/"
								className={`transition-colors flex flex-col items-center ${isActive("/") ? "text-secondary" : "text-primary hover:text-secondary"}`}>
								Home
								<Image src="/bottom_line2.png" alt="Underline" width={48} height={2} className={`mt-1 ${isActive("/") ? "block" : "hidden"}`} />
							</Link>
						</li>
						<li className="min-w-12">
							<Link
								href="/blog"
								className={`transition-colors flex flex-col items-center ${isActive("/blog") ? "text-secondary" : "text-primary hover:text-secondary"}`}>
								Blog
								<Image src="/bottom_line2.png" alt="Underline" width={48} height={2} className={`mt-1 ${isActive("/blog") ? "block" : "hidden"}`} />
							</Link>
						</li>
						<li className="min-w-12">
							<Link
								href="/book-table"
								className={`transition-colors flex flex-col items-center ${isActive("/book-table") ? "text-secondary" : "text-primary hover:text-secondary"}`}>
								Book table
								<Image
									src="/bottom_line2.png"
									alt="Underline"
									width={48}
									height={2}
									className={`mt-1 ${isActive("/book-table") ? "block" : "hidden"}`}
								/>
							</Link>
						</li>
						<li className="min-w-12">
							<Link
								href="/contact-us"
								className={`transition-colors flex flex-col items-center ${isActive("/contact-us") ? "text-secondary" : "text-primary hover:text-secondary"}`}>
								Contact us
								<Image
									src="/bottom_line2.png"
									alt="Underline"
									width={48}
									height={2}
									className={`mt-1 ${isActive("/contact-us") ? "block" : "hidden"}`}
								/>
							</Link>
						</li>
					</ol>
				</nav>
			</div>

			{/* Mobile Header */}
			<div className="md:hidden flex justify-between items-center p-6 border border-secondary">
				<Link href="/">
					<Image src="/icon/Logo_main.svg" alt="Night Club Logo" width={189} height={46} />
				</Link>
				<button onClick={toggleMenu} className="text-primary text-3xl cursor-pointer">
					<RiMenu3Line />
				</button>
			</div>

			{/* Mobile Sidebar Menu */}
			<aside
				className={`fixed top-0 left-0 h-full w-full bg-black/60 backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out ${
					isMenuOpen ? "translate-x-0" : "-translate-x-full"
				} md:hidden`}>
				<div className="flex flex-col items-center justify-center h-full relative">
					{/* Close button */}
					<button onClick={toggleMenu} className="cursor-pointer absolute top-4 right-4 text-primary text-4xl">
						<RiCloseLine />
					</button>

					{/* Menu Items */}
					<nav className="relative z-10">
						<ol className="flex flex-col gap-8 text-center uppercase text-primary text-xl">
							<li>
								<Link
									href="/"
									onClick={toggleMenu}
									className={`transition-colors text-2xl ${isActive("/") ? "text-secondary font-bold" : "hover:text-secondary"}`}>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/blog"
									onClick={toggleMenu}
									className={`transition-colors text-2xl ${isActive("/blog") ? "text-secondary font-bold" : "hover:text-secondary"}`}>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="/book-table"
									onClick={toggleMenu}
									className={`transition-colors text-2xl ${isActive("/book-table") ? "text-secondary font-bold" : "hover:text-secondary"}`}>
									Book Table
								</Link>
							</li>
							<li>
								<Link
									href="/contact-us"
									onClick={toggleMenu}
									className={`transition-colors text-2xl ${isActive("/contact-us") ? "text-secondary font-bold" : "hover:text-secondary"}`}>
									Contact Us
								</Link>
							</li>
						</ol>
					</nav>
				</div>
			</aside>
		</header>
	);
};

export default Header;
