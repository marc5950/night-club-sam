// ============================================================================
// EVENT TYPES
// ============================================================================
export interface Event {
	id: number;
	title: string;
	description: string;
	date: string;
	time: string;
	image?: string;
	createdAt: string;
	updatedAt: string;
}

// ============================================================================
// BLOG POST TYPES
// ============================================================================
export interface BlogPost {
	id: number;
	title: string;
	author: string;
	content: string;
	slug?: string;
	createdAt?: string;
	updatedAt?: string;
	asset: {
		url: string;
		alt?: string;
	};
	// Når man henter med ?embed=comments, kommer comments også med
	comments?: Comment[];
}

export interface Comment {
	id: number;
	blogpostId: number;
	author: string;
	content: string;
	createdAt: string;
}

// ============================================================================
// CONTACT TYPES
// ============================================================================
export interface ContactMessage {
	id: number;
	name: string;
	email: string;
	subject?: string;
	message: string;
	createdAt?: string;
}

// ============================================================================
// GALLERY TYPES
// ============================================================================
export interface GalleryPhoto {
	id: number;
	url: string;
	title?: string;
	alt?: string;
	createdAt: string;
}

// ============================================================================
// NEWSLETTER TYPES
// ============================================================================
export interface NewsletterSubscription {
	id: number;
	email: string;
	subscribedAt: string;
}

// ============================================================================
// RESERVATION TYPES (BORDBESTILLING)
// ============================================================================
export interface Reservation {
	id: number;
	name: string;
	email: string;
	phone: string;
	date: string; // Format: "YYYY-MM-DD"
	time: string; // Format: "HH:MM" (24-timers format)
	guests: number;
	createdAt?: string;
}

// ============================================================================
// TESTIMONIAL TYPES
// ============================================================================
export interface Testimonial {
	id: number;
	author: string;
	content: string;
	rating?: number;
	createdAt: string;
}
