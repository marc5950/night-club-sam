import Hero from "./components/hero/Hero";
import WelcomeInNightclub from "./components/welcome-in-nightclub/WelcomeInNightclub";
import Newsletter from "./components/Newsletter";
import TestimonialList from "./components/testimonials/TestimonialList";
import BlogRecent from "./components/recent-blog/BlogRecent";
import VideoCard from "./components/VideoCard";
import ClubGallery from "./components/gallery/ClubGallery";
import MusicTrack from "./components/music-tracks/MusicTrack";
import EventSection from "./components/events/EventSection";
import { getEvents, getGalleryPhotos, getTestimonials, getBlogPosts } from "./lib/api";

export default async function Home() {
	// Hent data til de forskellige sektioner på forsiden (server-side)
	const [events, photos, testimonials, posts] = await Promise.all([getEvents(), getGalleryPhotos(), getTestimonials(), getBlogPosts()]);

	return (
		<div>
			<main>
				<Hero />
				<WelcomeInNightclub />
				<EventSection items={events} />
				<div className="w-full overflow-hidden object-cover">
					<ClubGallery photos={photos.slice(0, 7)} />
				</div>
				<MusicTrack />
				<VideoCard />
				<TestimonialList items={testimonials} />
				<BlogRecent posts={posts} />
				<Newsletter />
			</main>
		</div>
	);
}
