import Hero from "./components/hero/Hero";
import WelcomeInNightclub from "./components/welcome-in-nightclub/WelcomeInNightclub";
import Newsletter from "./components/Newsletter";
import BlogRecent from "./components/BlogRecent";
import VideoCard from "./components/VideoCard";

export default function Home() {
  return (
    <div className='bg-black'>
      <main>
        <Hero />
        <WelcomeInNightclub />
        <VideoCard />
        <BlogRecent />
        <Newsletter />
      </main>
    </div>
  );
}
