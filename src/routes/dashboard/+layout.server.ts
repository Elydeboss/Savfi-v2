import { redirect } from '@sveltejs/kit';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ cookies, url }: ServerLoadEvent) => {
	const token = cookies.get('auth_token');

	// Check if token exists in cookie
	if (!token) {
		// No token found, redirect to login with return URL
		throw redirect(
			302,
			`/login?redirect=${encodeURIComponent(url.pathname + url.search)}`
		);
	}

	// Verify token with backend API
	try {
		const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

		const response = await fetch(`${apiUrl}/auth/me`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			// Token is invalid, redirect to login
			throw redirect(
				302,
				`/login?redirect=${encodeURIComponent(url.pathname + url.search)}`
			);
		}

		const data = await response.json();

		return {
			user: data.user
		};
	} catch (error) {
		// If it's already a redirect, rethrow it
		if (error && typeof error === 'object' && 'status' in error) {
			throw error;
		}

		// Backend verification failed, redirect to login
		throw redirect(
			302,
			`/login?redirect=${encodeURIComponent(url.pathname + url.search)}`
		);
	}
};
