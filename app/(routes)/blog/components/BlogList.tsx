"use client";

import { BlogPost } from "@/app/types/api";
import BlogCard from "./BlogCard";
import { useRouter } from "next/navigation";

interface BlogListProps {
	// Her modtager vi en LISTE af blogindlæg (derfor [] brackets)
	posts: BlogPost[];
	currentPage: number;
	totalPages: number;
}

const BlogList = ({ posts, currentPage, totalPages }: BlogListProps) => {
	// useRouter er en "Hook" der lader os styre browserens URL uden at genindlæse siden
	const router = useRouter();

	// Denne funktion køres når brugeren klikker på en side-knap
	const handlePageChange = (page: number) => {
		// router.push opdaterer URL'en til f.eks. "/blog?page=2"
		// Dette får Next.js til at genindlæse siden med den nye parameter
		router.push(`/blog?page=${page}`);
	};

	return (
		<section className="bg-black py-16">
			<div className="">
				{/* LISTE AF BLOG INDLÆG */}
				<div className="max-w-6xl mx-auto">
					{/* .map() løber igennem listen af posts og laver et <BlogCard> for hver enkelt */}
					{posts.map((post, index) => (
						// Vi sender 'imagePosition' med for at skifte side på billedet
						// index % 2 === 0 betyder "hvis tallet er lige" (0, 2, 4...) -> billede til venstre
						// Ellers -> billede til højre
						<BlogCard key={post.id} post={post} imagePosition={index % 2 === 0 ? "left" : "right"} />
					))}
				</div>

				{/* PAGINATION KNAPPER (Kun vis hvis der er mere end 1 side) */}
				{totalPages > 1 && (
					<div className="flex justify-center items-center gap-4 mt-16">
						{/* TILBAGE KNAP */}
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1} // Deaktiver knappen hvis vi er på side 1
							className="px-6 py-2 text-white lowercase font-bold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-secondary transition-colors">
							{"<"} Tilbage
						</button>

						{/* SIDE NUMRE */}
						<div className="flex gap-2">
							{/* Vi laver et "falsk" array med længden 'totalPages' for at kunne lave en knap pr. side */}
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
								<button
									key={page}
									onClick={() => handlePageChange(page)}
									// Hvis knappen er den side vi er på nu, giv den en understregning
									className={`w-10 h-10 flex cursor-pointer items-center justify-center font-bold ${
										page === currentPage ? "underline text-white" : "text-white"
									} transition-colors`}>
									{page}
								</button>
							))}
						</div>

						{/* NÆSTE KNAP */}
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages} // Deaktiver hvis vi er på sidste side
							className="px-6 py-2 text-white cursor-pointer lowercase font-bold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors">
							Næste {">"}
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default BlogList;
