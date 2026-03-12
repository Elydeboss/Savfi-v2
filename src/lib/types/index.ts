export interface VaultType {
	name: 'VaultFi' | 'GrowFi' | 'FlexiFi' | 'SwiftFi';
	apy: number;
	minDeposit: number;
	lockPeriod?: number;
	color: 'blue' | 'green' | 'purple' | 'orange';
}

export interface SavingsPlan {
	id: string;
	vaultType: VaultType['name'];
	principal: number;
	interestEarned: number;
	currentBalance: number;
	status: 'active' | 'locked' | 'completed' | 'cancelled';
	apy: number;
	lockPeriod?: number;
	createdAt: string;
	maturityDate?: string;
	isLiveInterestEnabled: boolean;
}

export interface Transaction {
	id: string;
	type: 'deposit' | 'withdrawal' | 'interest' | 'referral';
	amount: number;
	currency: 'USDC';
	status: 'processing' | 'completed' | 'failed' | 'cancelled';
	vaultType?: string;
	planId?: string;
	timestamp: string;
	solanaSignature?: string;
	metadata?: {
		principalAmount?: number;
		interestEarned?: number;
		penaltyAmount?: number;
		referralCode?: string;
	};
}

export interface User {
	id: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	avatar?: string;
	bio?: string;
	country?: string;
	state?: string;
	phone?: string;
	referralCode: string;
	preferences: {
		currency: 'USDC' | 'NGN';
		theme: 'light' | 'dark' | 'auto';
		notifications: {
			email: boolean;
			push: boolean;
		};
	};
	kycStatus: 'not_verified' | 'pending' | 'verified' | 'rejected';
	kycDocuments?: {
		idDocument?: string;
		selfie?: string;
		proofOfAddress?: string;
		submittedAt?: string;
	};
	createdAt: string;
}

export interface APIResponse<T = any> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface WalletState {
	isConnected: boolean;
	publicKey: string | null;
	balance: number;
	loading: boolean;
	error: string | null;
	network: 'devnet' | 'mainnet';
}

export interface AuthState {
	user: User | null;
	token: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

export interface SavingsState {
	plans: SavingsPlan[];
	totalBalance: number;
	totalInterestEarned: number;
	activePlans: number;
	loading: boolean;
	error: string | null;
}

export interface TransactionState {
	transactions: Transaction[];
	filter: {
		type?: Transaction['type'];
		status?: Transaction['status'];
		dateRange?: { start: string; end: string };
		search?: string;
	};
	loading: boolean;
	error: string | null;
	totalTransactions: number;
}

export interface Referral {
	id: string;
	code: string;
	totalReferrals: number;
	totalBonusEarned: number;
	referredUsers: Array<{
		id: string;
		username: string;
		joinedAt: string;
		bonusAmount?: number;
	}>;
}

export interface AdminMetrics {
	totalUsers: {
		registered: number;
		verified: number;
		activeToday: number;
	};
	totalDeposits: {
		amount: number;
		count: number;
	};
	totalWithdrawals: {
		amount: number;
		count: number;
	};
	activeSavingsPlans: number;
	pendingKYCApplications: number;
	pendingWithdrawals: {
		count: number;
		amount: number;
	};
	totalInterestPaid: number;
	platformRevenue: number;
}

export interface KYCApplication {
	id: string;
	userId: string;
	userName: string;
	email: string;
	status: 'pending' | 'approved' | 'rejected';
	documents: {
		idDocument: string;
		selfie: string;
		proofOfAddress: string;
	};
	submittedAt: string;
	reviewedAt?: string;
	rejectionReason?: string;
	adminNotes?: string;
}

export interface VaultConfig {
	VaultFi: { apy: 0.12; minDeposit: 100; maxDeposit: 10000; lockPeriod: [3, 6, 12]; penalty: 0.05 };
	GrowFi: { apy: 0.08; minDeposit: 50; maxDeposit: 10000; lockPeriod: 6; penalty: 0.03 };
	FlexiFi: { apy: 0.05; minDeposit: 25; maxDeposit: 10000; lockPeriod: null; penalty: 0.01 };
	SwiftFi: { apy: 0.00; minDeposit: 10; maxDeposit: 10000; lockPeriod: null; penalty: 0.00 };
}
