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
        <h4 className="text-2xl mb-2 uppercase text-primary">{post.title}</h4>
        <p className="text-secondary mb-2">
          {post.author} / {commentCount} Comments / {formattedDate}
        </p>
        <p className="text-lg text-primary">{post.content}</p>
      </div>
    </article>
  );
};

export default BlogPost;
