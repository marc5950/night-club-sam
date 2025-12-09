import Hero from "./components/hero/Hero";
import WelcomeInNightclub from "./components/welcome-in-nightclub/WelcomeInNightclub";
import Newsletter from "./components/Newsletter";
import BlogRecent from "./components/recent-blog/BlogRecent";
import VideoCard from "./components/VideoCard";
import ClubGallery from "./components/ClubGallery";
import MusicTrack from "./components/MusicTrack";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <WelcomeInNightclub />
        <ClubGallery />
        <MusicTrack />
        <VideoCard />
        <BlogRecent />
        <Newsletter />
      </main>
    </div>
  );
}
