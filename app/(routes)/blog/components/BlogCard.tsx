import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/app/types/api";
import Button from "@/app/components/general/Button";

interface BlogCardProps {
	post: BlogPost;
	imagePosition: "left" | "right";
}

const BlogCard = ({ post, imagePosition }: BlogCardProps) => {
	console.log("BlogCard post:", post);

	// Beregn antal kommentarer fra post.comments array
	// ?. er optional chaining - tjekker om comments eksisterer før .length
	// || 0 giver default værdi 0 hvis comments er undefined
	const commentCount = post.comments?.length || 0;

	// Formater dato til dansk format
	// Eksempel output: "2. december 2025"
	const formattedDate = post.createdAt
		? new Date(post.createdAt).toLocaleDateString("da-DK", {
				day: "numeric", // Dag uden foranstillet 0
				month: "long", // Fuld måned navn
				year: "numeric", // Fuldt årstal
			})
		: "";

	// Lav et uddrag af content til preview (max 6 linjer ~ 300 tegn)
	// substring(0, 300) tager de første 300 karakterer
	// Ternary operator: hvis længere end 300, tilføj "...", ellers vis alt
	const udrag = post.content.length > 300 ? post.content.substring(0, 300) + "..." : post.content;
	return (
		<article
			className={`flex flex-col ${
				// Dynamisk styling: Skift mellem billede til venstre og højre
				// Template literal med ternary operator for conditional classes
				imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"
			} gap-4  overflow-hidden`}>
			{/* Billede */}
			<div className="md:w-1/2 relative h-[400px]">
				<Image src={post.asset.url} alt={post.asset.alt || post.title} fill className="object-cover" unoptimized />
			</div>

			{/* Tekst indhold */}
			<div className="md:w-1/2 p-8 flex flex-col justify-center">
				<h2 className="text-3xl font-bold text-white mb-4">{post.title}</h2>

				{/* Byline/dato/kommentarer */}
				<div className="flex items-center gap-4 text-secondary text-sm mb-4">
					<span>By {post.author}</span>
					<span>/</span>
					<span>
						{commentCount} {commentCount === 1 ? "kommentar" : "kommentarer"}
					</span>
					<span>/</span>
					<span>{formattedDate}</span>
				</div>

				{/* Uddrag af tekst */}
				<p className="text-gray-300 mb-6 line-clamp-6">{udrag}</p>

				{/* Read More knap */}
				<Link href={`/blog/${post.slug || post.id}`} className="flex justify-center md:justify-end">
					<Button text="Read More" />
				</Link>
			</div>
		</article>
	);
};

export default BlogCard;
