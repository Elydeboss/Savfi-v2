import { writable, derived } from 'svelte/store';

type TransactionType = 'deposit' | 'withdrawal' | 'interest' | 'referral';
type TransactionStatus = 'processing' | 'completed' | 'failed' | 'cancelled';

interface Transaction {
	id: string;
	type: TransactionType;
	amount: number;
	currency: 'USDC';
	status: TransactionStatus;
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

interface TransactionState {
	transactions: Transaction[];
	filter: {
		type?: TransactionType;
		status?: TransactionStatus;
		dateRange?: { start: string; end: string };
		search?: string;
	};
	loading: boolean;
	error: string | null;
	totalTransactions: number;
}

const initialState: TransactionState = {
	transactions: [],
	filter: {},
	loading: false,
	error: null,
	totalTransactions: 0
};

function createTransactionStore() {
	const { subscribe, set, update } = writable<TransactionState>(initialState);

	return {
		subscribe,
		set,
		update,
		setTransactions: (transactions: Transaction[]) => {
			update(state => ({
				...state,
				transactions,
				totalTransactions: transactions.length,
				loading: false
			}));
		},
		addTransaction: (transaction: Transaction) => {
			update(state => {
				const newTransactions = [transaction, ...state.transactions];
				return {
					...state,
					transactions: newTransactions,
					totalTransactions: newTransactions.length
				};
			});
		},
		updateTransactionStatus: (transactionId: string, status: TransactionStatus, signature?: string) => {
			update(state => {
				const newTransactions = state.transactions.map(t => {
					if (t.id === transactionId) {
						return {
							...t,
							status,
							solanaSignature: signature || t.solanaSignature
						};
					}
					return t;
				});
				return { ...state, transactions: newTransactions };
			});
		},
		setFilter: (filter: TransactionState['filter']) => update(state => ({ ...state, filter })),
		getFilteredTransactions: () => {
			let filtered: Transaction[] = [];
			const unsubscribe = subscribe(state => {
				filtered = state.transactions.filter(t => {
					let matchesType = !state.filter.type || t.type === state.filter.type;
					let matchesStatus = !state.filter.status || t.status === state.filter.status;
					let matchesSearch =
						!state.filter.search ||
						t.id.includes(state.filter.search) ||
						(t.solanaSignature && t.solanaSignature.includes(state.filter.search));

					return matchesType && matchesStatus && matchesSearch;
				});
			});
			unsubscribe();
			return filtered;
		},
		setLoading: (loading: boolean) => update(state => ({ ...state, loading })),
		setError: (error: string | null) => update(state => ({ ...state, error })),
		clearTransactions: () => update(state => initialState)
	};
}

export const transactionStore = createTransactionStore();
export const filteredTransactions = derived(transactionStore, () => transactionStore.getFilteredTransactions());
export const deposits = derived(transactionStore, $tx =>
	$tx.transactions.filter(t => t.type === 'deposit')
);
export const withdrawals = derived(transactionStore, $tx =>
	$tx.transactions.filter(t => t.type === 'withdrawal')
);
