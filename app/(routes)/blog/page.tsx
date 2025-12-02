import { getBlogPosts, getBlogPostWithComments } from "@/app/lib/api";
import BlogList from "./components/BlogList";

interface BlogPageProps {
	searchParams: Promise<{ page?: string }>;
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
	const params = await searchParams;
	const currentPage = parseInt(params.page || "1");
	const postsPerPage = 3;

	// Hent alle blogposts fra API med kommentarer
	const basicPosts = await getBlogPosts();
	const allPosts = await Promise.all(
		basicPosts.map(async (post) => {
			const postWithComments = await getBlogPostWithComments(post.id);
			return postWithComments || post;
		})
	);

	// Sorter nyeste først
	const sortedPosts = allPosts.sort((a, b) => {
		const dateA = new Date(a.createdAt || 0).getTime();
		const dateB = new Date(b.createdAt || 0).getTime();
		return dateB - dateA;
	});

	// Beregn pagination
	const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
	const startIndex = (currentPage - 1) * postsPerPage;
	const endIndex = startIndex + postsPerPage;
	const currentPosts = sortedPosts.slice(startIndex, endIndex);

	return (
		<main>
			<BlogList posts={currentPosts} currentPage={currentPage} totalPages={totalPages} />
		</main>
	);
};

export default BlogPage;
