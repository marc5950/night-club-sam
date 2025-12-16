import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/app/types/api";
import Button from "@/app/components/general/Button";

interface BlogCardProps {
  // Vi genbruger 'BlogPost' typen fra vores API definitioner
  // Det betyder vi ikke behøver skrive alle felterne (title, content osv.) igen her
  post: BlogPost;
  imagePosition: "left" | "right";
}

const BlogCard = ({ post, imagePosition }: BlogCardProps) => {
  // 1. BEREGN ANTAL KOMMENTARER
  // Vi bruger ?. (optional chaining) for at undgå fejl hvis 'comments' ikke findes
  // || 0 betyder "hvis det er undefined, så brug tallet 0"
  const commentCount = post.comments?.length || 0;

  // 2. FORMATER DATO
  // Vi laver dato-strengen om til et pænt dansk format (f.eks. "2. december 2025")
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("da-DK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  // 3. LAV UDDRAG AF TEKST
  // Hvis teksten er meget lang (> 300 tegn), klipper vi den af og sætter "..." bagpå
  const udrag = post.content.length > 300 ? post.content.substring(0, 300) + "..." : post.content;

  return (
    <article
      className={`flex flex-col ${
        // Her bruger vi 'imagePosition' til at bestemme rækkefølgen
        // flex-row = billede først (venstre)
        // flex-row-reverse = billede sidst (højre)
        imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"
      } gap-4  overflow-hidden`}
    >
      {/* BILLEDE SEKTION */}
      <div className="md:w-1/2 relative h-[400px]">
        <Image src={post.asset.url} alt={post.title} width={960} height={530} className="object-cover" unoptimized />
      </div>

      {/* TEKST SEKTION */}
      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-primary mb-4">{post.title}</h2>

        {/* META INFO (Forfatter, kommentarer, dato) */}
        <div className="flex items-center gap-4 text-secondary text-sm mb-4">
          <span>By {post.author}</span>
          <span>/</span>
          <span>
            {commentCount} {commentCount === 1 ? "kommentar" : "kommentarer"}
          </span>
          <span>/</span>
          <span>{formattedDate}</span>
        </div>

        {/* TEKST UDDRAG */}
        <p className="text-gray-300 mb-6 line-clamp-6">{udrag}</p>

        {/* LÆS MERE KNAP */}
        {/* Linker til den enkelte blogpost side (f.eks. /blog/min-titel) */}
        <Link href={`/blog/${post.slug || post.id}`} className="flex justify-center md:justify-end">
          <Button text="Read More" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
