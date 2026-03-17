import { apiService } from './api';

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	email: string;
	username: string;
	password: string;
	referralCode?: string;
}

export interface AuthResponse {
	message: string;
	token: string;
	user: {
		id: string;
		email: string;
		username: string;
		role: string;
		kycVerified?: boolean;
	};
}

export interface User {
	_id: string;
	email: string;
	username: string;
	phoneNumber?: string;
	country?: string;
	dateOfBirth?: string;
	profilePicture?: string;
	phantomWallet?: string;
	ninVerified: boolean;
	kycVerified: boolean;
	referralCode: string;
	referredBy?: string;
	referralEarnings: number;
	role: 'user' | 'admin';
	isActive: boolean;
	isBanned: boolean;
	createdAt: string;
	updatedAt: string;
}

class AuthService {
	private readonly TOKEN_KEY = 'auth_token';
	private readonly USER_KEY = 'user_data';

	async login(data: LoginRequest): Promise<AuthResponse> {
		const response = await apiService.post<AuthResponse>('/auth/login', data);
		if (response.data) {
			this.setToken(response.data.token);
			this.setUserData(response.data.user);
			return response.data;
		}
		throw new Error(response.error || 'Login failed');
	}

	async register(data: RegisterRequest): Promise<AuthResponse> {
		try {
			const response = await apiService.post<AuthResponse>('/auth/register', data);
			if (response.data) {
				this.setToken(response.data.token);
				this.setUserData(response.data.user);
				return response.data;
			}
			throw new Error(response.error || 'Registration failed');
		} catch (err: any) {
			// Pass through the axios error with response.data for proper error handling
			throw err;
		}
	}

	async getCurrentUser(): Promise<{ user: User }> {
		const response = await apiService.get<{ user: User }>('/auth/me');
		if (response.data) {
			this.setUserData(response.data.user);
			return response.data;
		}
		throw new Error(response.error || 'Failed to get user');
	}

	async updateProfile(data: {
		phoneNumber?: string;
		country?: string;
		dateOfBirth?: string;
		profilePicture?: string;
	}): Promise<{ message: string; user: Partial<User> }> {
		const response = await apiService.put<{ message: string; user: Partial<User> }>('/auth/profile', data);
		if (response.data) {
			return response.data;
		}
		throw new Error(response.error || 'Failed to update profile');
	}

	async changePassword(data: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
		const response = await apiService.post<{ message: string }>('/auth/change-password', data);
		if (response.data?.message) {
			return { message: response.data.message };
		}
		throw new Error(response.error || 'Failed to change password');
	}

	async connectWallet(walletAddress: string): Promise<{ message: string; walletAddress: string }> {
		const response = await apiService.post<{ message: string; walletAddress: string }>('/auth/connect-wallet', { walletAddress });
		if (response.data) {
			return response.data;
		}
		throw new Error(response.error || 'Failed to connect wallet');
	}

	// OAuth Methods
	loginWithGoogle(): void {
		if (typeof window === 'undefined') return;
		// VITE_API_BASE_URL includes /api, so we need to use just the base URL
		const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000';
		window.location.href = `${baseUrl}/api/auth/oauth/google`;
	}

	handleOAuthCallback(token: string): void {
		this.setToken(token);
	}

	getApiUrl(): string {
		return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
	}

	logout(): void {
		if (typeof window !== 'undefined') {
			localStorage.removeItem(this.TOKEN_KEY);
			localStorage.removeItem(this.USER_KEY);

			// Clear the auth cookie
			document.cookie = 'auth_token=; path=/; max-age=0';
		}
	}

	getToken(): string | null {
		if (typeof window === 'undefined') return null;
		return localStorage.getItem(this.TOKEN_KEY);
	}

	private setToken(token: string): void {
		if (typeof window === 'undefined') return;
		localStorage.setItem(this.TOKEN_KEY, token);

		// Set cookie for server-side auth checks
		// Using 7 days expiration, SameSite=Lax for security
		const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
		document.cookie = `auth_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
	}

	getUserData(): User | null {
		if (typeof window === 'undefined') return null;
		const userData = localStorage.getItem(this.USER_KEY);
		return userData ? JSON.parse(userData) : null;
	}

	private setUserData(user: any): void {
		if (typeof window === 'undefined') return;
		localStorage.setItem(this.USER_KEY, JSON.stringify(user));
	}

	isAuthenticated(): boolean {
		return !!this.getToken();
	}
}

export const authService = new AuthService();
