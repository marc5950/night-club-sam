import { getBlogPosts } from "@/app/lib/api";
import BlogList from "./components/BlogList";
import HeroSmall from "@/app/components/general/HeroSmall";

export const metadata = {
  title: "Night Club - Blog",
  description: "Read our latest blog posts and news",
};

// Interface definerer hvilke props denne side kan modtage
// searchParams er en speciel Next.js prop der indeholder URL parametre (f.eks. ?page=2)
interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  // 1. HENT URL PARAMETRE
  // Vi skal bruge 'await' fordi searchParams er et Promise i nyeste Next.js
  const params = await searchParams;

  // Hvis der står ?page=2 i URL'en, bruger vi det tal. Ellers starter vi på side 1.
  const currentPage = parseInt(params.page || "1");

  // 2. KONFIGURATION
  // Her bestemmer vi hvor mange indlæg der skal vises pr. side
  const postsPerPage = 3;

  // 3. HENT DATA
  // Vi henter ALLE blogindlæg fra vores API (inklusiv kommentarer)
  const allPosts = await getBlogPosts();

  // SIKKERHEDSTJEK: Hvis API'et er nede eller der ingen posts er
  if (!allPosts || allPosts.length === 0) {
    return (
      <main>
        <HeroSmall title="Blog" />
        <div className="flex flex-col items-center justify-center min-h-[400px] text-primary">
          <h2 className="text-2xl font-bold mb-2">Ingen indlæg fundet</h2>
          <p className="text-primary">Der er ingen blogindlæg at vise lige nu, eller der er ingen forbindelse til serveren.</p>
        </div>
      </main>
    );
  }

  // 4. SORTERING (Nyeste først)
  // Vi sorterer listen så de nyeste indlæg kommer først i arrayet
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA; // Positivt tal bytter rækkefølgen -> Descending order
  });

  // 5. PAGINATION LOGIK (Matematikken bag siderne)

  // Beregn total antal sider (f.eks. 10 posts / 3 pr. side = 3.33 -> runder op til 4 sider)
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  // Find start- og slut-index for den aktuelle side
  // Side 1: (1-1)*3 = 0  -> Start ved index 0
  // Side 2: (2-1)*3 = 3  -> Start ved index 3
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  // 'slice' klipper arrayet til, så vi kun får de 3 posts vi skal vise lige nu
  const currentPosts = sortedPosts.slice(startIndex, endIndex);

  return (
    <main>
      <HeroSmall title="Blog" />
      {/* Vi sender de udregnede data videre til vores Client Component (BlogList) */}
      <BlogList posts={currentPosts} currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
};

export default BlogPage;
