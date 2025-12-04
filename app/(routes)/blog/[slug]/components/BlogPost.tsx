import Image from "next/image";
import { BlogPost as BlogPostType } from "@/app/types/api";

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost = ({ post }: BlogPostProps) => {
  // Hent det specifikke blog post baseret på slug/id

  const commentCount = post.comments?.length || 0;

  return (
    <div className='p-4  max-w-[1440px]'>
      <div className='relative h-[400px] w-full mb-4'>
        <Image src={post.asset.url} alt={post.asset.alt || post.title} fill className='object-cover' unoptimized />
      </div>
      <h4 className='text-2xl mb-2'>{post.title}</h4>
      <p className='text-[#FF2A70] font-bold mb-2'>
        {post.author} / {commentCount} Comments / 16 Nov 2018
      </p>
      <p className='text-lg'>{post.content}</p>
    </div>
  );
};

export default BlogPost;
