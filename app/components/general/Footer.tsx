import Image from "next/image";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
	// Statisk data for recent posts
	const recentPosts = [
		{
			id: 1,
			title: "Amazing Night at the Club",
			image: "/content-img/recent_post1.jpg",
			date: "Nov 25, 2025",
		},
		{
			id: 2,
			title: "Special Guest DJ Performance",
			image: "/content-img/recent_post2.jpg",
			date: "Nov 20, 2025",
		},
	];

	// Statisk data for recent tweets
	const recentTweets = [
		{
			id: 1,
			text: "Join us tonight for an unforgettable experience! 🎉 #NightClub",
			time: "2 hours ago",
		},
		{
			id: 2,
			text: "Special drinks promotion this weekend! Don't miss out 🍹",
			time: "5 hours ago",
		},
	];

	return (
		<footer
			className="flex md:justify-center py-12 px-4"
			style={{
				background:
					"linear-gradient(0deg, rgba(0, 0, 0, 0.90) 0%, rgba(0, 0, 0, 0.90) 100%), url('/bg/footerbg.jpg') lightgray 50% / cover no-repeat",
			}}>
			<div className="max-w-[1440px] flex flex-col gap-12 ">
				<div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Location & Opening Hours */}
					<div className="flex flex-col gap-6">
						<Image src="/icon/Logo_main.svg" alt="Night Club Logo" width={150} height={150} />
						<div>
							<h2 className="uppercase text-secondary font-bold mb-2 text-2xl">Location</h2>
							<p className="text-gray-300 text-lg">
								Kompagnistræde 278 <br /> 1265 København K
							</p>
						</div>
						<div>
							<h2 className="uppercase text-secondary font-bold mb-2 text-2xl">Opening Hours</h2>
							<p className="text-gray-300 text-lg">WED - THU: 10:30 PM TO 3 AM</p>
							<p className="text-gray-300 text-lg">SAT - SUN: 11 PM TO 5 AM</p>
						</div>
					</div>

					{/* Recent Posts */}
					<div className="flex flex-col">
						<h2 className="uppercase text-secondary font-bold mb-4 text-2xl">Recent Posts</h2>
						<div className="flex flex-1 flex-col gap-6">
							{recentPosts.map((post) => (
								<div key={post.id} className="flex gap-3">
									<Image src={post.image} alt={post.title} width={80} height={80} className="object-cover" />
									<div className="flex flex-col gap-2">
										<h3 className="text-white text-lg font-medium">{post.title}</h3>
										<p className="text-secondary text-base">{post.date}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Recent Tweets */}
					<div>
						<h2 className="uppercase text-secondary font-bold mb-4 text-2xl">Recent Tweets</h2>
						<div className="flex flex-col gap-6">
							{recentTweets.map((tweet) => (
								<div key={tweet.id} className="flex gap-3">
									<FaTwitter className="text-secondary text-xl shrink-0 mt-1" />
									<div>
										<p className="text-gray-300 text-lg">{tweet.text}</p>
										<p className="text-secondary text-base mt-1">{tweet.time}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
					<p className="text-lg max-w-[250px]">Night Club PSD Template - All rights reserved.</p>
					<div className="flex flex-col items-center">
						<h3 className="text-lg">Stay Connected With Us</h3>
						<div className="flex gap-4 mt-2">
							<FaFacebookF className="border cursor-pointer border-white p-2 h-12 w-12" />
							<FaSnapchatGhost className="border cursor-pointer border-white p-2 h-12 w-12" />
							<FaInstagram className="border cursor-pointer border-white p-2 h-12 w-12" />
						</div>
					</div>
					<p className="text-lg max-w-[250px] text-end">Copyright &copy; {new Date().getFullYear()} NightClub</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
