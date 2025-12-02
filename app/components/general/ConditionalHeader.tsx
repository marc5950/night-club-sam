"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const ConditionalHeader = () => {
	const pathname = usePathname();

	// Vis ikke header på forsiden (/)
	if (pathname === "/") {
		return null;
	}

	return <Header />;
};

export default ConditionalHeader;
