import { getBlogPosts, getBlogPostWithComments } from "@/app/lib/api";
import BlogList from "./components/BlogList";
import HeroSmall from "@/app/components/general/HeroSmall";

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  // Await searchParams for at få URL parametre (Next.js 15 requirement)
  const params = await searchParams;

  // Hent side nummer fra URL (default til side 1)
  // Eksempel: /blog?page=2 giver currentPage = 2
  const currentPage = parseInt(params.page || "1");

  // Hvor mange blogposts vi viser per side
  const postsPerPage = 3;

  // Hent alle blogposts fra API med kommentarer
  // Først henter vi grundlæggende post data
  const basicPosts = await getBlogPosts();

  // Derefter henter vi hver post med kommentarer inkluderet
  // Promise.all kører alle requests parallelt for bedre performance
  const allPosts = await Promise.all(
    basicPosts.map(async (post) => {
      // Hent post med kommentarer fra API
      const postWithComments = await getBlogPostWithComments(post.id);
      // Hvis API call fejler, brug original post uden kommentarer
      return postWithComments || post;
    })
  );

  // Sorter blogposts så nyeste kommer først
  const sortedPosts = allPosts.sort((a, b) => {
    // Konverter dato strings til millisekunder for at kunne sammenligne
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    // Returner negativ værdi for at sortere nyeste først (descending)
    return dateB - dateA;
  });

  // Beregn pagination værdier
  // Math.ceil runder op så vi får nok sider til alle posts
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  // Beregn hvilke posts der skal vises på denne side
  // Eksempel: Side 2 med 3 posts per side: startIndex = 3, endIndex = 6
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  // Slice array for at få kun de posts der hører til denne side
  const currentPosts = sortedPosts.slice(startIndex, endIndex);

  return (
    <main>
      <HeroSmall title='Blog' />
      <BlogList posts={currentPosts} currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
};

export default BlogPage;
