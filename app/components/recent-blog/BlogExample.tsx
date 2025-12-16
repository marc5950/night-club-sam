"use client";
import Image from "next/image";
import { BlogPost } from "@/app/types/api";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
}

const BlogExample = ({ post }: BlogCardProps) => {
  // Antal kommentarer (fallback til 0 hvis ingen)
  const commentCount = post.comments?.length || 0;

  // Formater dato til dansk visning
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("da-DK", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    // Link til det fulde blogindlæg
    <Link href={`/blog/${post.slug || post.id}`}>
      <article className="cursor-pointer">
        {/* Blog billede */}
        <Image src={post.asset.url} alt={post.title} width={460} height={240} className="object-cover" unoptimized />
        <h2 className="text-title3 font-normal uppercase text-primary mt-5">{post.title}</h2>
        {/* Meta information: forfatter, antal kommentarer, dato */}
        <p className="text-secondary mt-2 mb-6 text-p-big font-normal">
          By: {post.author} / {commentCount} {commentCount === 1 ? "kommentar" : "kommentarer"} / {formattedDate}
        </p>
        {/* Kort preview af indholdet (første 20 ord). Tilføjer ... til sidst */}
        <p className="text-primary">{post.content.split(" ").slice(0, 20).join(" ")}...</p>
      </article>
    </Link>
  );
};

export default BlogExample;
