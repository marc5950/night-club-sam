// ============================================================================
// IMPORT TYPES
// ============================================================================
import { Event, BlogPost, Comment, ContactMessage, GalleryPhoto, NewsletterSubscription, Reservation, Testimonial } from "@/app/types/api";

// API Base URL
const API_BASE_URL = "http://localhost:4000";

// ============================================================================
// EKSEMPLER PÅ BRUG (SÅDAN BRUGER I API'ET)
// ============================================================================
/*
  Her er eksempler på hvordan I bruger funktionerne i jeres komponenter (f.eks. i page.tsx eller components):

  1. HENT DATA (GET):
     Bruges når I skal vise data, f.eks. en liste af events.
     -------------------------------------------------------
     import { getEvents } from "@/app/lib/api";
     
     // I en async komponent:
     const events = await getEvents();

  2. SEND DATA (POST):
     Bruges når I skal oprette noget nyt, f.eks. en kommentar.
     -------------------------------------------------------
     import { createComment } from "@/app/lib/api";

     await createComment({
       blogpostId: 1,
       author: "Navn",
       content: "Min kommentar"
     });

  3. SLET DATA (DELETE):
     Bruges når I skal slette noget.
     -------------------------------------------------------
     import { deleteComment } from "@/app/lib/api";

     await deleteComment(123); // 123 er ID'et på det der skal slettes
*/

// ============================================================================
// API BOILERPLATE (HJÆLPEFUNKTIONER)
// ============================================================================

/**
 * GET HELPER (HENT DATA)
 * Denne funktion bruges til at hente data fra API'et.
 *
 * @param endpoint - URL'en vi skal hente fra (f.eks. "/events")
 * @returns Promise<T> - Returnerer data af typen T (Generic)
 *
 * Forklaring:
 * - <T>: En "pladsholder" for typen af data vi forventer (f.eks. Event[])
 * - fetch: Laver selve netværkskaldet
 * - cache: "no-store": Sikrer at vi altid får frisk data (ingen caching)
 */
async function apiGet<T>(endpoint: string): Promise<T> {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			method: "GET",
			cache: "no-store",
		});
		if (!response.ok) throw new Error(`GET ${endpoint} failed: ${response.status}`);
		return (await response.json()) as T;
	} catch (err) {
		console.error(`API GET Error (${endpoint}):`, err);
		throw err;
	}
}

/**
 * POST HELPER (SEND DATA)
 * Denne funktion bruges til at sende data til API'et (oprette nyt).
 *
 * @param endpoint - URL'en vi skal sende til (f.eks. "/comments")
 * @param data - Det data objekt vi vil sende
 *
 * Forklaring:
 * - method: "POST": Fortæller serveren at vi vil oprette noget
 * - headers: Fortæller serveren at vi sender JSON data
 * - body: JSON.stringify(data): Laver vores JavaScript objekt om til tekst
 */
async function apiPost<T>(endpoint: string, data: unknown): Promise<T> {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error(`POST ${endpoint} failed: ${response.status}`);
		return (await response.json()) as T;
	} catch (err) {
		console.error(`API POST Error (${endpoint}):`, err);
		throw err;
	}
}

/**
 * DELETE HELPER (SLET DATA)
 * Denne funktion bruges til at slette data fra API'et.
 *
 * @param endpoint - URL'en på det vi vil slette (f.eks. "/comments/123")
 *
 * Forklaring:
 * - method: "DELETE": Fortæller serveren at vi vil slette noget
 * - Returnerer true hvis det lykkedes, false hvis det fejlede
 */
async function apiDelete(endpoint: string): Promise<boolean> {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			method: "DELETE",
		});
		if (!response.ok) throw new Error(`DELETE ${endpoint} failed: ${response.status}`);
		return true;
	} catch (err) {
		console.error(`API DELETE Error (${endpoint}):`, err);
		return false;
	}
}

// ============================================================================
// EVENTS
// ============================================================================
export const getEvents = () => apiGet<Event[]>("/events");

// ============================================================================
// BLOG POSTS
// ============================================================================
// Vi henter kommentarer med (?embed=comments), så vi slipper for at gøre det manuelt i frontend
export const getBlogPosts = () => apiGet<BlogPost[]>("/blogposts?embed=comments");

export const getBlogPostById = (id: number) => apiGet<BlogPost>(`/blogposts/${id}`);

export const getBlogPostWithComments = (id: number) => apiGet<BlogPost>(`/blogposts/${id}?embed=comments`);

// ============================================================================
// COMMENTS
// ============================================================================
export const getComments = () => apiGet<Comment[]>("/comments");

export const getCommentsByBlogpostId = (blogpostId: number) => apiGet<Comment[]>(`/comments/${blogpostId}`);

export const createComment = (comment: Omit<Comment, "id" | "createdAt">) => apiPost<Comment>("/comments", comment);

export const deleteComment = (id: number) => apiDelete(`/comments/${id}`);

// ============================================================================
// CONTACT MESSAGES
// ============================================================================
export const getContactMessages = () => apiGet<ContactMessage[]>("/contact-messages");

export const sendContactMessage = (message: Omit<ContactMessage, "id" | "createdAt">) => apiPost<ContactMessage>("/contact-messages", message);

// ============================================================================
// GALLERY
// ============================================================================
export const getGalleryPhotos = () => apiGet<GalleryPhoto[]>("/gallery-photos");

// ============================================================================
// NEWSLETTER
// ============================================================================
export const getNewsletterSubscriptions = () => apiGet<NewsletterSubscription[]>("/newsletter-subscriptions");

export const createNewsletterSubscription = (sub: Omit<NewsletterSubscription, "id" | "subscribedAt">) =>
	apiPost<NewsletterSubscription>("/newsletter-subscriptions", sub);

// ============================================================================
// RESERVATIONS
// ============================================================================
export const createReservation = (res: Omit<Reservation, "id" | "createdAt">) => apiPost<Reservation>("/reservations", res);

export const deleteReservation = (id: number) => apiDelete(`/reservations/${id}`);

// ============================================================================
// TESTIMONIALS
// ============================================================================
export const getTestimonials = () => apiGet<Testimonial[]>("/testimonials");
