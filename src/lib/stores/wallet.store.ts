import { writable, derived } from 'svelte/store';

interface WalletState {
	isConnected: boolean;
	publicKey: string | null;
	balance: number;
	loading: boolean;
	error: string | null;
	network: 'devnet' | 'mainnet';
}

const initialState: WalletState = {
	isConnected: false,
	publicKey: null,
	balance: 0,
	loading: false,
	error: null,
	network: 'devnet'
};

function createWalletStore() {
	const { subscribe, set, update } = writable<WalletState>(initialState);

	return {
		subscribe,
		set,
		update,
		connect: async (publicKey: string) => {
			update(state => ({ ...state, loading: true, error: null }));
			try {
				localStorage.setItem('wallet_public_key', publicKey);
				update(state => ({
					...state,
					isConnected: true,
					publicKey,
					loading: false,
					error: null
				}));
			} catch (error) {
				update(state => ({
					...state,
					loading: false,
					error: 'Failed to connect wallet'
				}));
			}
		},
		disconnect: () => {
			localStorage.removeItem('wallet_public_key');
			update(state => ({
				...state,
				isConnected: false,
				publicKey: null,
				balance: 0,
				error: null
			}));
		},
		setBalance: (balance: number) => update(state => ({ ...state, balance })),
		setNetwork: (network: 'devnet' | 'mainnet') => update(state => ({ ...state, network })),
		setError: (error: string | null) => update(state => ({ ...state, error })),
		initializeFromStorage: () => {
			const publicKey = localStorage.getItem('wallet_public_key');
			if (publicKey) {
				update(state => ({
					...state,
					isConnected: true,
					publicKey
				}));
			}
		}
	};
}

export const walletStore = createWalletStore();
export const isConnected = derived(walletStore, $wallet => $wallet.isConnected);
export const walletBalance = derived(walletStore, $wallet => $wallet.balance);
