"use client";
import Image from "next/image";
import { BlogPost } from "@/app/types/api";

interface BlogCardProps {
  post: BlogPost;
}

const BlogExample = ({ post }: BlogCardProps) => {
  const commentCount = post.comments?.length || 0;

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("da-DK", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <article className='cursor-pointer'>
      <Image src={post.asset.url} alt={post.asset.alt || post.title || ""} fill className='object-cover' unoptimized />
      <h2 className='text-background text-title3 font-normal uppercase'>{post.title}</h2>
      <p className='text-secondary mt-2 mb-6 text-p-big font-normal'>
        By: {post.author} /{commentCount} {commentCount === 1 ? "kommentar" : "kommentarer"} / {formattedDate}
      </p>
      <p className='text-background'>{post.content.split(" ").slice(0, 20).join(" ")}...</p>
    </article>
  );
};

export default BlogExample;
