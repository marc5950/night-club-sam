import Hero from "./components/hero/Hero";
import WelcomeInNightclub from "./components/welcome-in-nightclub/WelcomeInNightclub";
import Newsletter from "./components/Newsletter";
import TestimonialList from "./components/testimonials/TestimonialList";
import BlogRecent from "./components/recent-blog/BlogRecent";
import VideoCard from "./components/VideoCard";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <WelcomeInNightclub />
        <VideoCard />
        <TestimonialList />
        <BlogRecent />
        <Newsletter />
      </main>
    </div>
  );
}
