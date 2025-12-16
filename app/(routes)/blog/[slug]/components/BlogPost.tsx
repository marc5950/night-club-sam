import Image from "next/image";
import { BlogPost as BlogPostType } from "@/app/types/api";

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost = ({ post }: BlogPostProps) => {
  // Hent det specifikke blog post baseret på slug/id

  const commentCount = post.comments?.length || 0;
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("da-DK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <article className="mt-14 max-w-[1440px] md:ml-42 md:mr-42">
      <div className="relative h-[400px] w-full mb-8">
        <Image src={post.asset.url} alt={post.asset.alt || post.title} fill className="object-cover" unoptimized />
      </div>
      <div className="p-4 md:p-0">
        <h2 className="text-3xl font-bold text-primary mb-4 uppercase">{post.title}</h2>
        <div className="flex items-center gap-4 text-secondary text-sm mb-4">
          <span>By {post.author}</span>
          <span>/</span>
          <span>
            {commentCount} {commentCount === 1 ? "kommentar" : "kommentarer"}
          </span>
          <span>/</span>
          <span>{formattedDate}</span>
        </div>
        <p className="text-gray-300 text-lg">{post.content}</p>
      </div>
    </article>
  );
};

export default BlogPost;
