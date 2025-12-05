import Hero from "./components/hero/Hero";
import WelcomeInNightclub from "./components/welcome-in-nightclub/WelcomeInNightclub";
import Newsletter from "./components/Newsletter";
import BlogRecent from "./components/BlogRecent";

export default function Home() {
  return (
    <div className='bg-black'>
      <main>
        <Hero />
        <WelcomeInNightclub />
        <BlogRecent />
        <Newsletter />
      </main>
    </div>
  );
}
