"use client";

import { BlogPost } from "@/app/types/api";
import BlogCard from "./BlogCard";
import { useRouter } from "next/navigation";

interface BlogListProps {
	posts: BlogPost[];
	currentPage: number;
	totalPages: number;
}

const BlogList = ({ posts, currentPage, totalPages }: BlogListProps) => {
	const router = useRouter();

	const handlePageChange = (page: number) => {
		router.push(`/blog?page=${page}`);
	};

	return (
		<section className="bg-black py-16">
			<div className="">
				{/* Blog posts */}
				<div className="max-w-6xl mx-auto">
					{posts.map((post, index) => (
						<BlogCard key={post.id} post={post} imagePosition={index % 2 === 0 ? "left" : "right"} />
					))}
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex justify-center items-center gap-4 mt-16">
						{/* Previous button */}
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="px-6 py-2  text-white lowercase font-bold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-secondary transition-colors">
							{"<"} Tilbage
						</button>

						{/* Page numbers */}
						<div className="flex gap-2">
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
								<button
									key={page}
									onClick={() => handlePageChange(page)}
									className={`w-10 h-10 flex cursor-pointer items-center justify-center font-bold ${
										page === currentPage ? "underline text-white" : "text-white"
									} transition-colors`}>
									{page}
								</button>
							))}
						</div>

						{/* Next button */}
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="px-6 py-2  text-white cursor-pointer lowercase font-bold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors">
							Næste {">"}
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default BlogList;
