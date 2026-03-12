import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from 'axios';
import { authStore } from '../stores/auth.store';
import { uiStore } from '../stores/ui.store';
import type { APIResponse, PaginatedResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class APIService {
	private client: AxiosInstance;

	constructor() {
		this.client = axios.create({
			baseURL: API_BASE_URL,
			headers: {
				'Content-Type': 'application/json'
			},
			timeout: 30000
		});

		this.setupInterceptors();
	}

	private setupInterceptors(): void {
		this.client.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem('auth_token');
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		this.client.interceptors.response.use(
			(response) => {
				return response;
			},
			(error: AxiosError<APIResponse>) => {
				console.error('API Error:', {
					url: error.config?.url,
					method: error.config?.method,
					status: error.response?.status,
					data: error.response?.data,
					message: error.message
				});

				if (error.response?.status === 401) {
					authStore.logout();
					uiStore.addToast('Session expired. Please login again.', 'error');
					window.location.href = '/login';
				}

				const errorMessage =
					error.response?.data?.error ||
					error.response?.data?.message ||
					error.message ||
					'An error occurred';

				uiStore.addToast(errorMessage, 'error');

				return Promise.reject(error);
			}
		);
	}

	async get<T = any>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<APIResponse<T>> {
		try {
			const response = await this.client.get<APIResponse<T>>(url, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async post<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<APIResponse<T>> {
		try {
			const response = await this.client.post<APIResponse<T>>(url, data, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async put<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<APIResponse<T>> {
		try {
			const response = await this.client.put<APIResponse<T>>(url, data, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async delete<T = any>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<APIResponse<T>> {
		try {
			const response = await this.client.delete<APIResponse<T>>(url, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async upload<T = any>(
		url: string,
		file: File,
		onProgress?: (progress: number) => void
	): Promise<APIResponse<T>> {
		try {
			const formData = new FormData();
			formData.append('file', file);

			const response = await this.client.post<APIResponse<T>>(url, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: (progressEvent) => {
					if (onProgress && progressEvent.total) {
						const progress = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);
						onProgress(progress);
					}
				}
			});

			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async getPaginated<T = any>(
		url: string,
		page: number = 1,
		limit: number = 20,
		config?: AxiosRequestConfig
	): Promise<PaginatedResponse<T>> {
		try {
			const response = await this.client.get<PaginatedResponse<T>>(url, {
				...config,
				params: { ...config?.params, page, limit }
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}

export const apiService = new APIService();
export default apiService;
