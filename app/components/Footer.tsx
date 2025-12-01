import Image from "next/image";

fetch("http://localhost:4000/blogposts", {
	method: "GET",
})
	.then((response) => console.log(response))
	.catch((err) => console.error(err));

const Footer = () => {
	return (
		<footer className="flex justify-center">
			<div className="max-w-[1020px] flex justify-between">
				<div className="flex flex-col gap-8">
					<Image src="/logo.png" alt="Night Club Logo" width={150} height={150} />
					<div>
						<div>
							<h2 className="uppercase text-secondary">Location</h2>
							<p>
								Kompagnistræde 278 <br /> 1265 København K
							</p>
						</div>
						<div>
							<h2 className="uppercase text-secondary">Opening Hours</h2>
							<p>WED - THU 10:30 PMTO 3 AM</p>
							<p>SAT - SUN: 11 PM TO 5 AM</p>
						</div>
					</div>
				</div>
				<div>
					<h2 className="uppercase text-secondary">Recent Posts</h2>
					<div>
						<Image>
							src={blogpost.assets[0].url}
							alt="Blogpost Image" width={300}
							height={200}
						</Image>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
