import { writable, derived } from 'svelte/store';
import Decimal from 'decimal.js';

type VaultType = 'VaultFi' | 'GrowFi' | 'FlexiFi' | 'SwiftFi';
type PlanStatus = 'active' | 'locked' | 'completed' | 'cancelled';

interface SavingsPlan {
	id: string;
	vaultType: VaultType;
	principal: number;
	interestEarned: number;
	currentBalance: number;
	status: PlanStatus;
	apy: number;
	lockPeriod?: number;
	createdAt: string;
	maturityDate?: string;
	isLiveInterestEnabled: boolean;
}

interface SavingsState {
	plans: SavingsPlan[];
	totalBalance: number;
	totalInterestEarned: number;
	activePlans: number;
	loading: boolean;
	error: string | null;
}

const initialState: SavingsState = {
	plans: [],
	totalBalance: 0,
	totalInterestEarned: 0,
	activePlans: 0,
	loading: false,
	error: null
};

const VAULT_CONFIG = {
	VaultFi: { apy: 0.12, minDeposit: 100, color: 'purple' },
	GrowFi: { apy: 0.08, minDeposit: 50, color: 'green' },
	FlexiFi: { apy: 0.05, minDeposit: 25, color: 'blue' },
	SwiftFi: { apy: 0.00, minDeposit: 10, color: 'orange' }
};

function createSavingsStore() {
	const { subscribe, set, update } = writable<SavingsState>(initialState);

	return {
		subscribe,
		set,
		update,
		setPlans: (plans: SavingsPlan[]) => {
			const totalBalance = plans.reduce((sum, plan) => sum + plan.currentBalance, 0);
			const totalInterest = plans.reduce((sum, plan) => sum + plan.interestEarned, 0);
			const active = plans.filter(p => p.status === 'active' || p.status === 'locked').length;

			update(state => ({
				...state,
				plans,
				totalBalance,
				totalInterestEarned: totalInterest,
				activePlans: active,
				loading: false
			}));
		},
		addPlan: (plan: SavingsPlan) => {
			update(state => {
				const newPlans = [...state.plans, plan];
				const totalBalance = newPlans.reduce((sum, p) => sum + p.currentBalance, 0);
				const totalInterest = newPlans.reduce((sum, p) => sum + p.interestEarned, 0);
				const active = newPlans.filter(p => p.status === 'active' || p.status === 'locked').length;

				return {
					...state,
					plans: newPlans,
					totalBalance,
					totalInterestEarned: totalInterest,
					activePlans: active
				};
			});
		},
		updatePlanInterest: (planId: string, newInterest: number) => {
			update(state => {
				const newPlans = state.plans.map(plan => {
					if (plan.id === planId) {
						const currentBalance = plan.principal + newInterest;
						return { ...plan, interestEarned: newInterest, currentBalance };
					}
					return plan;
				});

				const totalBalance = newPlans.reduce((sum, p) => sum + p.currentBalance, 0);
				const totalInterest = newPlans.reduce((sum, p) => sum + p.interestEarned, 0);

				return {
					...state,
					plans: newPlans,
					totalBalance,
					totalInterestEarned: totalInterest
				};
			});
		},
		getPlan: (planId: string) => {
			let plan: SavingsPlan | undefined;
			const unsubscribe = subscribe(state => {
				plan = state.plans.find(p => p.id === planId);
			});
			unsubscribe();
			return plan;
		},
		getVaultConfig: (vaultType: VaultType) => VAULT_CONFIG[vaultType],
		calculateInterest: (
			principal: number,
			apy: number,
			daysElapsed: number
		): number => {
			const P = new Decimal(principal);
			const r = new Decimal(apy);
			const n = new Decimal(365);
			const t = new Decimal(daysElapsed).div(365);

			const A = P.mul(Decimal.add(1, r.div(n)).pow(n.mul(t)));
			const interest = A.minus(P);

			return interest.toDecimalPlaces(2).toNumber();
		},
		setLoading: (loading: boolean) => update(state => ({ ...state, loading })),
		setError: (error: string | null) => update(state => ({ ...state, error })),
		clearPlans: () => update(state => initialState)
	};
}

export const savingsStore = createSavingsStore();
export const plansByType = derived(savingsStore, $savings =>
	$savings.plans.reduce((acc, plan) => {
		if (!acc[plan.vaultType]) {
			acc[plan.vaultType] = [];
		}
		acc[plan.vaultType].push(plan);
		return acc;
	}, {} as Record<VaultType, SavingsPlan[]>
)
);
export const totalBalance = derived(savingsStore, $savings => $savings.totalBalance);
export const totalInterestEarned = derived(savingsStore, $savings => $savings.totalInterestEarned);
