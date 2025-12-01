// Importer TypeScript typer fra vores types fil
import { Event, BlogPost, Comment, ContactMessage, GalleryPhoto, NewsletterSubscription, Reservation, Testimonial } from "@/app/types/api";

// API Base URL
const API_BASE_URL = "http://localhost:4000";

// ============================================================================
// EVENT API FUNKTIONER
// ============================================================================

/**
 * Henter alle events fra API'et
 * @returns Promise med array af Event objekter, eller tomt array hvis der opstår fejl
 */
export async function getEvents(): Promise<Event[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/events`, {
			method: "GET",
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch events: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching events:", error);
		return [];
	}
}

// ============================================================================
// BLOG API FUNKTIONER
// ============================================================================

/**
 * Henter alle blogposts fra API'et
 * @returns Promise med array af BlogPost objekter, eller tomt array hvis der opstår fejl
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
	try {
		// Lav HTTP GET request til /blogposts endpoint
		const response = await fetch(`${API_BASE_URL}/blogposts`, {
			method: "GET",
			cache: "no-store", // Slår Next.js cache fra, så vi altid får friske data
		});

		// Tjek om serveren returnerede en success status (200-299)
		if (!response.ok) {
			throw new Error(`Failed to fetch blog posts: ${response.status}`);
		}

		// Konverter JSON response til JavaScript objekt og returner det
		return await response.json();
	} catch (error) {
		// Hvis der opstår en fejl, log den i konsollen
		console.error("Error fetching blog posts:", error);
		// Returner tomt array så applikationen ikke crasher
		return [];
	}
}

/**
 * Henter en specifik blogpost baseret på ID
 * @param id - Blog post ID
 * @returns Promise med BlogPost objekt eller null hvis den ikke findes/fejl opstår
 */
export async function getBlogPostById(id: number): Promise<BlogPost | null> {
	try {
		const response = await fetch(`${API_BASE_URL}/blogposts/${id}`, {
			method: "GET",
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch blog post: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`Error fetching blog post with id ${id}:`, error);
		return null;
	}
}

/**
 * Henter en specifik blogpost MED kommentarer baseret på ID
 * @param id - Blog post ID
 * @returns Promise med BlogPost objekt (inkl. kommentarer) eller null hvis den ikke findes
 *
 * API endpoint: GET /blogposts/:id?embed=comments
 */
export async function getBlogPostWithComments(id: number): Promise<BlogPost | null> {
	try {
		const response = await fetch(`${API_BASE_URL}/blogposts/${id}?embed=comments`, {
			method: "GET",
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch blog post with comments: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`Error fetching blog post with comments (id: ${id}):`, error);
		return null;
	}
}

// ============================================================================
// COMMENT API FUNKTIONER
// ============================================================================

/**
 * Henter alle kommentarer
 * @returns Promise med array af Comment objekter, eller tomt array hvis der opstår fejl
 */
export async function getComments(): Promise<Comment[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/comments`, {
			method: "GET",
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch comments: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching comments:", error);
		return [];
	}
}

/**
 * Henter kommentarer til en specifik blogpost
 * @param blogpostId - ID på blogposten
 * @returns Promise med array af Comment objekter
 *
 * API endpoint: GET /comments/:blogpostId
 */
export async function getCommentsByBlogpostId(blogpostId: number): Promise<Comment[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/comments/${blogpostId}`, {
			method: "GET",
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch comments: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`Error fetching comments for blogpost ${blogpostId}:`, error);
		return [];
	}
}

/**
 * Opretter en ny kommentar på en blogpost
 * @param comment - Comment objekt UDEN id (serveren genererer id'et)
 * @returns Promise med det oprettede Comment objekt eller null hvis fejl opstår
 */
export async function createComment(comment: Omit<Comment, "id" | "createdAt">): Promise<Comment | null> {
	try {
		const response = await fetch(`${API_BASE_URL}/comments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(comment),
		});

		if (!response.ok) {
			throw new Error(`Failed to create comment: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error creating comment:", error);
		return null;
	}
}

/**
 * Sletter en kommentar baseret på ID
 * @param id - Kommentar ID
 * @returns Promise med boolean - true hvis sletning lykkedes
 */
export async function deleteComment(id: number): Promise<boolean> {
	try {
		const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error(`Failed to delete comment: ${response.status}`);
		}

		return true;
	} catch (error) {
		console.error(`Error deleting comment ${id}:`, error);
		return false;
	}
}

// ============================================================================
// CONTACT MESSAGE API FUNKTIONER
// ============================================================================

/**
 * Henter alle kontaktbeskeder (normalt kun til admin)
 * @returns Promise med array af ContactMessage objekter
 */
export async function getContactMessages(): Promise<ContactMessage[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/contact-messages`, {
			method: "GET",
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch contact messages: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching contact messages:", error);
		return [];
	}
}

/**
 * Sender en kontaktbesked til serveren
 * @param message - Besked objekt UDEN id (serveren genererer id'et)
 *                  Skal indeholde: name, email, message (subject er optional)
 * @returns Promise med det oprettede ContactMessage objekt eller null hvis fejl opstår
 *
 * Eksempel:
 * const result = await sendContactMessage({
 *   name: "Marcus Hansen",
 *   email: "marcus@example.com",
 *   subject: "Spørgsmål om åbningstider",
 *   message: "Hvornår har I åbent på fredage?"
 * });
 */
export async function sendContactMessage(message: Omit<ContactMessage, "id" | "createdAt">): Promise<ContactMessage | null> {
	try {
		// Lav HTTP POST request til /contact-messages endpoint
		const response = await fetch(`${API_BASE_URL}/contact-messages`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});

		if (!response.ok) {
			throw new Error(`Failed to send message: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error sending contact message:", error);
		return null;
	}
}

// ============================================================================
// GALLERY API FUNKTIONER
// ============================================================================

/**
 * Henter alle galleri billeder
 * @returns Promise med array af GalleryPhoto objekter
 */
export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/gallery-photos`, {
			method: "GET",
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch gallery photos: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching gallery photos:", error);
		return [];
	}
}

// ============================================================================
// NEWSLETTER API FUNKTIONER
// ============================================================================

/**
 * Henter alle nyhedsbrev subscriptions (normalt kun til admin)
 * @returns Promise med array af NewsletterSubscription objekter
 */
export async function getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/newsletter-subscriptions`, {
			method: "GET",
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch newsletter subscriptions: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching newsletter subscriptions:", error);
		return [];
	}
}

/**
 * Opretter en ny nyhedsbrev subscription
 * @param subscription - Subscription objekt med email
 * @returns Promise med det oprettede NewsletterSubscription objekt eller null hvis fejl opstår
 *
 * Eksempel:
 * const result = await createNewsletterSubscription({
 *   email: "marcus@example.com"
 * });
 */
export async function createNewsletterSubscription(
	subscription: Omit<NewsletterSubscription, "id" | "subscribedAt">
): Promise<NewsletterSubscription | null> {
	try {
		const response = await fetch(`${API_BASE_URL}/newsletter-subscriptions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(subscription),
		});

		if (!response.ok) {
			throw new Error(`Failed to create newsletter subscription: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error creating newsletter subscription:", error);
		return null;
	}
}

// ============================================================================
// RESERVATION API FUNKTIONER (BORDBESTILLING)
// ============================================================================

/**
 * Opretter en ny bordreservation
 * @param reservation - Reservation objekt UDEN id (serveren genererer id'et automatisk)
 *                      Skal indeholde: name, email, phone, date, time, guests
 * @returns Promise med det oprettede Reservation objekt (inkl. id) eller null hvis fejl opstår
 *
 * Eksempel:
 * const result = await createReservation({
 *   name: "Marcus Hansen",
 *   email: "marcus@example.com",
 *   phone: "12345678",
 *   date: "2025-12-25",
 *   time: "20:00",
 *   guests: 4
 * });
 */
export async function createReservation(reservation: Omit<Reservation, "id" | "createdAt">): Promise<Reservation | null> {
	try {
		// Lav HTTP POST request til /reservations endpoint
		const response = await fetch(`${API_BASE_URL}/reservations`, {
			method: "POST",
			headers: {
				// Fortæl serveren at vi sender JSON data
				"Content-Type": "application/json",
			},
			// Konverter JavaScript objekt til JSON string
			body: JSON.stringify(reservation),
		});

		if (!response.ok) {
			throw new Error(`Failed to create reservation: ${response.status}`);
		}

		// Returner det oprettede reservation objekt (nu med id fra serveren)
		return await response.json();
	} catch (error) {
		console.error("Error creating reservation:", error);
		return null;
	}
}

/**
 * Sletter en reservation baseret på ID
 * @param id - Reservation ID
 * @returns Promise med boolean - true hvis sletning lykkedes
 */
export async function deleteReservation(id: number): Promise<boolean> {
	try {
		const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error(`Failed to delete reservation: ${response.status}`);
		}

		return true;
	} catch (error) {
		console.error(`Error deleting reservation ${id}:`, error);
		return false;
	}
}

// ============================================================================
// TESTIMONIALS API FUNKTIONER
// ============================================================================

/**
 * Henter alle testimonials (anmeldelser)
 * @returns Promise med array af Testimonial objekter
 */
export async function getTestimonials(): Promise<Testimonial[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/testimonials`, {
			method: "GET",
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch testimonials: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching testimonials:", error);
		return [];
	}
}
