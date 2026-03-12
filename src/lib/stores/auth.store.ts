import { writable, derived } from 'svelte/store';
import { authService, type User } from '../services/auth.service';

interface AuthState {
	user: User | null;
	token: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	token: null,
	refreshToken: null,
	isAuthenticated: false,
	isLoading: false,
	error: null
};

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(initialState);

	// Initialize from localStorage
	const initializeFromStorage = () => {
		if (typeof window === 'undefined') return;

		const token = authService.getToken();
		const userData = authService.getUserData();

		if (token && userData) {
			update(state => ({
				...state,
				user: userData,
				token,
				isAuthenticated: true
			}));
		}
	};

	return {
		subscribe,
		set,
		update,
		initializeFromStorage,

		setUser: (user: User | null) => update(state => ({ ...state, user })),

		setToken: (token: string | null) => {
			update(state => ({ ...state, token }));
		},

		setRefreshToken: (refreshToken: string | null) => {
			update(state => ({ ...state, refreshToken }));
		},

		login: async (email: string, password: string) => {
			update(state => ({ ...state, isLoading: true, error: null }));

			try {
				const response = await authService.login({ email, password });

				update(state => ({
					...state,
					user: response.user as any,
					token: response.token,
					isAuthenticated: true,
					isLoading: false,
					error: null
				}));

				return { success: true, user: response.user };
			} catch (error: any) {
				const errorMessage = error.response?.data?.error || error.message || 'Login failed';
				update(state => ({
					...state,
					isLoading: false,
					error: errorMessage
				}));
				return { success: false, error: errorMessage };
			}
		},

		register: async (email: string, username: string, password: string, referralCode?: string) => {
			update(state => ({ ...state, isLoading: true, error: null }));

			try {
				const response = await authService.register({
					email,
					username,
					password,
					referralCode
				});

				update(state => ({
					...state,
					user: response.user as any,
					token: response.token,
					isAuthenticated: true,
					isLoading: false,
					error: null
				}));

				return { success: true, user: response.user };
			} catch (error: any) {
				const errorMessage = error.response?.data?.error || error.message || 'Registration failed';
				update(state => ({
					...state,
					isLoading: false,
					error: errorMessage
				}));
				return { success: false, error: errorMessage };
			}
		},

		logout: () => {
			authService.logout();
			update(state => ({
				...state,
				user: null,
				token: null,
				refreshToken: null,
				isAuthenticated: false,
				error: null
			}));
		},

		setLoading: (isLoading: boolean) => update(state => ({ ...state, isLoading })),

		setError: (error: string | null) => update(state => ({ ...state, error })),

		refreshUser: async () => {
			const token = authService.getToken();
			if (!token) return;

			update(state => ({ ...state, isLoading: true }));

			try {
				const { user } = await authService.getCurrentUser();
				update(state => ({
					...state,
					user,
					isLoading: false
				}));
			} catch (error) {
				// If refresh fails, logout
				authService.logout();
				update(state => ({
					...state,
					user: null,
					token: null,
					isAuthenticated: false,
					isLoading: false
				}));
			}
		}
	};
}

export const authStore = createAuthStore();

export const isAuthenticated = derived(authStore, $auth => $auth.isAuthenticated);
export const currentUser = derived(authStore, $auth => $auth.user);
export const isAdmin = derived(currentUser, $user => $user?.role === 'admin');
