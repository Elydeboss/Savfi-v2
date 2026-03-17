import api from './api';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';

// Initialize Solana connection
const connection = new Connection(
	import.meta.env.VITE_SOLANA_RPC_URL || 'https://api.devnet.solana.com',
	'confirmed'
);

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
	yieldSource?: string;
}

export interface BlockchainDepositResponse {
	plan: SavingsPlanResponse;
	transaction: {
		serialized: number[];
		blockhash: string;
	};
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

class SavingsService {
	/**
	 * Create a new savings plan with blockchain transaction
	 */
	async createPlan(request: CreateSavingsPlanRequest): Promise<BlockchainDepositResponse> {
		try {
			const response = await api.post<ApiResponse<BlockchainDepositResponse>>('/savings/create', request);

			if (response.data?.success && response.data.data) {
				return response.data.data;
			}

			throw new Error(response.data?.error || 'Failed to create savings plan');
		} catch (error: any) {
			console.error('Create plan error:', error);
			throw error;
		}
	}

	/**
	 * Check if Phantom wallet is installed
	 */
	isPhantomInstalled(): boolean {
		return !!(window as any).solana?.isPhantom;
	}

	/**
	 * Connect to Phantom wallet
	 */
	async connectPhantom(): Promise<string> {
		if (!this.isPhantomInstalled()) {
			throw new Error('Phantom wallet not installed. Please install it from phantom.app');
		}

		if (!(window as any).solana?.isConnected) {
			const response = await (window as any).solana.connect();
			return response.publicKey.toString();
		}

		return (window as any).solana.publicKey.toString();
	}

	/**
	 * Sign and send deposit transaction with Phantom wallet
	 */
	async signAndSendDeposit(serializedTransaction: number[]): Promise<{ signature: string }> {
		try {
			// Check if Phantom is installed
			if (!this.isPhantomInstalled()) {
				throw new Error('Please install Phantom wallet from phantom.app');
			}

			// Connect wallet if not connected
			if (!(window as any).solana?.isConnected) {
				await (window as any).solana.connect();
			}

			// Deserialize transaction
			const transaction = Transaction.from(
				Buffer.from(new Uint8Array(serializedTransaction))
			);

			// Sign transaction with Phantom
			const { signature } = await (window as any).solana.signAndSendTransaction(transaction);

			// Wait for confirmation
			await connection.confirmTransaction(signature);

			return { signature };
		} catch (error: any) {
			console.error('Sign and send error:', error);
			throw error;
		}
	}

	/**
	 * Confirm deposit with backend after blockchain transaction
	 */
	async confirmDeposit(planId: string, signature: string): Promise<void> {
		try {
			const response = await api.post(`/savings/${planId}/deposit/confirm`, { signature });

			if (!response.data?.success) {
				throw new Error(response.data?.error || 'Failed to confirm deposit');
			}
		} catch (error: any) {
			console.error('Confirm deposit error:', error);
			throw error;
		}
	}

	/**
	 * Complete deposit flow: create plan, sign transaction, confirm
	 */
	async completeDeposit(request: CreateSavingsPlanRequest): Promise<SavingsPlanResponse> {
		// Step 1: Get unsigned transaction from backend
		const { transaction, plan } = await this.createPlan(request);

		// Step 2: Sign and send with Phantom
		const { signature } = await this.signAndSendDeposit(transaction.serialized);

		// Step 3: Confirm with backend
		await this.confirmDeposit(plan._id, signature);

		return plan;
	}

	/**
	 * Get all savings plans for the current user
	 */
	async getUserPlans(): Promise<SavingsPlanResponse[]> {
		try {
			const response = await api.get<ApiResponse<SavingsPlanResponse[]>>('/savings');
			if (response.data?.success && response.data.data) {
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
			const response = await api.post<ApiResponse<SavingsPlanResponse>>(`/api/savings/plans/${planId}/deposit`, { amount });
			if (response.data?.success && response.data.data) {
				return response.data.data;
			}
			throw new Error(response.data?.error || 'Failed to add funds');
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
			const response = await api.post<ApiResponse<SavingsPlanResponse>>(`/api/savings/plans/${planId}/withdraw`, { amount });
			if (response.data?.success && response.data.data) {
				return response.data.data;
			}
			throw new Error(response.data?.error || 'Failed to withdraw funds');
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
			if (response.data?.success && response.data.data) {
				return response.data.data;
			}
			return { totalBalance: 0, totalInterest: 0, activePlans: 0 };
		} catch (error: any) {
			console.error('Get statistics error:', error);
			return { totalBalance: 0, totalInterest: 0, activePlans: 0 };
		}
	}

	/**
	 * Get current APY from Solend
	 */
	async getCurrentAPY(): Promise<{
		solendAPY: number;
		vaultfi: number;
		growfi: number;
		flexifi: number;
		swiftfi: number;
	}> {
		try {
			const response = await api.get<ApiResponse<{
				solendAPY: number;
				vaultfi: number;
				growfi: number;
				flexifi: number;
				swiftfi: number;
			}>>('/savings/apy');

			if (response.data?.success && response.data.data) {
				return response.data.data;
			}

			// Fallback to default rates
			return {
				solendAPY: 0.05,
				vaultfi: 0.045,
				growfi: 0.047,
				flexifi: 0.049,
				swiftfi: 0
			};
		} catch (error) {
			console.error('Get APY error:', error);
			return {
				solendAPY: 0.05,
				vaultfi: 0.045,
				growfi: 0.047,
				flexifi: 0.049,
				swiftfi: 0
			};
		}
	}
}

export const savingsService = new SavingsService();
