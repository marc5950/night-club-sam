import FormComment from "./components/FormComment";
import BlogPost from "./components/BlogPost";
import HeroSmall from "@/app/components/general/HeroSmall";

import { getBlogPosts, getBlogPostWithComments } from "@/app/lib/api";
import CommentList from "./components/CommentList";
import CommentEl from "./components/CommentEl";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const blogPostSingleView = async ({ params }: PageProps) => {
  const { slug } = await params;
  const allPosts = await getBlogPosts();
  const post = allPosts.find((p) => p.id.toString() === slug);
  if (!post) {
    return <div>Post not found</div>;
  }

  const postWithComments = await getBlogPostWithComments(post.id);
  if (!postWithComments) {
    return <div>Post with comments not found</div>;
  }

  return (
    <main>
      <HeroSmall title="Blog Post" />
      {/* <h1>Blog Post</h1> */}
      <BlogPost post={postWithComments} />
      <CommentList comments={postWithComments.comments || []} />
      {postWithComments.comments && postWithComments.comments.map((comment) => <CommentEl key={comment.id} comments={[comment]} />)}
      <FormComment blogpostId={post.id} />
    </main>
  );
};

export default blogPostSingleView;
