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
		this.setToken(response.token);
		this.setUserData(response.user);
		return response;
	}

	async register(data: RegisterRequest): Promise<AuthResponse> {
		const response = await apiService.post<AuthResponse>('/auth/register', data);
		this.setToken(response.token);
		this.setUserData(response.user);
		return response;
	}

	async getCurrentUser(): Promise<{ user: User }> {
		const response = await apiService.get<{ user: User }>('/auth/me');
		this.setUserData(response.user);
		return response;
	}

	async updateProfile(data: {
		phoneNumber?: string;
		country?: string;
		dateOfBirth?: string;
		profilePicture?: string;
	}): Promise<{ message: string; user: Partial<User> }> {
		const response = await apiService.put<{ message: string; user: Partial<User> }>('/auth/profile', data);
		return response;
	}

	async changePassword(data: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
		const response = await apiService.post<{ message: string }>('/auth/change-password', data);
		return response;
	}

	async connectWallet(walletAddress: string): Promise<{ message: string; walletAddress: string }> {
		const response = await apiService.post<{ message: string; walletAddress: string }>('/auth/connect-wallet', { walletAddress });
		return response;
	}

	logout(): void {
		localStorage.removeItem(this.TOKEN_KEY);
		localStorage.removeItem(this.USER_KEY);
	}

	getToken(): string | null {
		if (typeof window === 'undefined') return null;
		return localStorage.getItem(this.TOKEN_KEY);
	}

	private setToken(token: string): void {
		if (typeof window === 'undefined') return;
		localStorage.setItem(this.TOKEN_KEY, token);
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
