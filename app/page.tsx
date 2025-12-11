import Hero from "./components/hero/Hero";
import WelcomeInNightclub from "./components/welcome-in-nightclub/WelcomeInNightclub";
import Newsletter from "./components/Newsletter";
import TestimonialList from "./components/testimonials/TestimonialList";
import BlogRecent from "./components/recent-blog/BlogRecent";
import VideoCard from "./components/VideoCard";
import ClubGallery from "./components/ClubGallery";
import MusicTrack from "./components/music-tracks/MusicTrack";
import Title from "./components/general/Title";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <WelcomeInNightclub />
        <ClubGallery />
        <MusicTrack />
        <VideoCard />
        <TestimonialList />
        <BlogRecent />
        <Newsletter />
      </main>
    </div>
  );
}
