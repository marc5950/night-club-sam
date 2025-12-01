import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "4000",
				pathname: "/**",
			},
		],
		// Alternativt: Tillad alle eksterne billeder (ikke anbefalet til produktion)
		unoptimized: true,
	},
};

export default nextConfig;
