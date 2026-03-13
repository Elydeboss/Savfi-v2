import api from './api';

export interface CreateSavingsPlanRequest {
	planType: 'vaultfi' | 'growfi' | 'flexifi' | 'swiftfi';
	amount: number;
}

export interface SavingsPlanResponse {
	_id: string;
	userId: string;
	planType: string;
	depositAmount: number;
	currentBalance: number;
	interestEarned: number;
	apy: number;
	status: string;
	lockPeriod?: number;
	startDate: string;
	endDate?: string;
	lastInterestCalculation: string;
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

class SavingsService {
	/**
	 * Create a new savings plan
	 */
	async createPlan(request: CreateSavingsPlanRequest): Promise<SavingsPlanResponse> {
		try {
			const response = await api.post<ApiResponse<SavingsPlanResponse>>('/savings/create', request);
			if (response.data.success && response.data.data) {
				return response.data.data;
			}
			throw new Error(response.data.error || 'Failed to create savings plan');
		} catch (error: any) {
			console.error('Create plan error:', error);
			throw error;
		}
	}

	/**
	 * Get all savings plans for the current user
	 */
	async getUserPlans(): Promise<SavingsPlanResponse[]> {
		try {
			const response = await api.get<ApiResponse<SavingsPlanResponse[]>>('/savings');
			if (response.data.success && response.data.data) {
				return response.data.data;
			}
			return [];
		} catch (error: any) {
			console.error('Get plans error:', error);
			return [];
		}
	}

	/**
	 * Add funds to an existing savings plan
	 */
	async addFunds(planId: string, amount: number): Promise<SavingsPlanResponse> {
		try {
			const response = await api.post<ApiResponse<SavingsPlanResponse>>(`/savings/${planId}/deposit`, { amount });
			if (response.data.success && response.data.data) {
				return response.data.data;
			}
			throw new Error(response.data.error || 'Failed to add funds');
		} catch (error: any) {
			console.error('Add funds error:', error);
			throw error;
		}
	}

	/**
	 * Withdraw funds from a savings plan
	 */
	async withdrawFunds(planId: string, amount: number): Promise<SavingsPlanResponse> {
		try {
			const response = await api.post<ApiResponse<SavingsPlanResponse>>(`/savings/${planId}/withdraw`, { amount });
			if (response.data.success && response.data.data) {
				return response.data.data;
			}
			throw new Error(response.data.error || 'Failed to withdraw funds');
		} catch (error: any) {
			console.error('Withdraw funds error:', error);
			throw error;
		}
	}

	/**
	 * Get savings plan statistics
	 */
	async getStatistics(): Promise<{
		totalBalance: number;
		totalInterest: number;
		activePlans: number;
	}> {
		try {
			const response = await api.get<ApiResponse<{
				totalBalance: number;
				totalInterest: number;
				activePlans: number;
			}>>('/savings/statistics');
			if (response.data.success && response.data.data) {
				return response.data.data;
			}
			return { totalBalance: 0, totalInterest: 0, activePlans: 0 };
		} catch (error: any) {
			console.error('Get statistics error:', error);
			return { totalBalance: 0, totalInterest: 0, activePlans: 0 };
		}
	}
}

export const savingsService = new SavingsService();
