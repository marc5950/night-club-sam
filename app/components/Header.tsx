import Image from "next/image";
import Link from "next/link";

const Header = () => {
	return (
		<header className="relative">
			{/* Top-left corner */}
			<div className="absolute top-0 left-0 w-0 h-0 border-r-30 border-r-transparent border-t-30 border-t-secondary"></div>

			{/* Bottom-right corner */}
			<div className="absolute bottom-0 right-0 w-0 h-0 border-l-30 border-l-transparent border-b-30 border-b-secondary"></div>
			<nav className="flex justify-around items-center p-4 border border-secondary ">
				<Image src="/logo.png" alt="Night Club Logo" width={150} height={150} />
				<ol className="flex gap-4 uppercase">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/blog">Blog</Link>
					</li>
					<li>
						<Link href="/book-table">Book table</Link>
					</li>
					<li>
						<Link href="/contact-us">Contact us</Link>
					</li>
				</ol>
			</nav>
		</header>
	);
};

export default Header;
