import Hero from "./components/hero/Hero";
import WelcomeInNightclub from "./components/welcome-in-nightclub/WelcomeInNightclub";
import Newsletter from "./components/Newsletter";

export default function Home() {
	return (
		<div className="bg-black">
			<main>
				<Hero />
				<WelcomeInNightclub />
				<Newsletter />
			</main>
		</div>
	);
}
