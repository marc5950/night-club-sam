import Title from "../general/Title";
import { BlogPost } from "@/app/types/api";
import BlogExample from "./BlogExample";

type Props = { posts: BlogPost[] };

const BlogRecent = ({ posts }: Props) => {
	// Begræns til de 3 seneste blogindlæg
	const recentPosts = posts.slice(0, 3);

	return (
		<section>
			<Title title="Recent Blog" />
			<div className="flex flex-col md:flex-row gap-10 justify-center max-w-6xl mx-auto p-8 mb-20">
				{recentPosts.map((post, index) => (
					<BlogExample key={post.id || index} post={post} />
				))}
			</div>
		</section>
	);
};

export default BlogRecent;
