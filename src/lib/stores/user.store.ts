import { writable, derived } from 'svelte/store';

interface User {
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

interface UserState {
	profile: User | null;
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	profile: null,
	loading: false,
	error: null
};

function createUserStore() {
	const { subscribe, set, update } = writable<UserState>(initialState);

	return {
		subscribe,
		set,
		update,
		setProfile: (profile: User) => {
			update(state => ({ ...state, profile, loading: false }));
		},
		updateProfile: (updates: Partial<User>) => {
			update(state => {
				if (!state.profile) return state;
				return {
					...state,
					profile: { ...state.profile, ...updates }
				};
			});
		},
		updatePreferences: (preferences: Partial<User['preferences']>) => {
			update(state => {
				if (!state.profile) return state;
				return {
					...state,
					profile: {
						...state.profile,
						preferences: { ...state.profile.preferences, ...preferences }
					}
				};
			});
		},
		setKYCStatus: (status: User['kycStatus'], documents?: User['kycDocuments']) => {
			update(state => {
				if (!state.profile) return state;
				return {
					...state,
					profile: {
						...state.profile,
						kycStatus: status,
						kycDocuments: documents || state.profile.kycDocuments
					}
				};
			});
		},
		setLoading: (loading: boolean) => update(state => ({ ...state, loading })),
		setError: (error: string | null) => update(state => ({ ...state, error })),
		clearProfile: () => update(state => initialState)
	};
}

export const userStore = createUserStore();
export const userProfile = derived(userStore, $user => $user.profile);
export const isVerified = derived(userProfile, $profile => $profile?.kycStatus === 'verified');
export const kycStatus = derived(userProfile, $profile => $profile?.kycStatus || 'not_verified');
export const userPreferences = derived(userProfile, $profile => $profile?.preferences);
export const userCurrency = derived(userPreferences, $pref => $pref?.currency || 'USDC');
