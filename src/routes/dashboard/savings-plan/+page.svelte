<script lang="ts">
	import { Wallet, TrendingUp, Calendar, Lock } from 'lucide-svelte';
	import { savingsService } from '$lib/services/savings.service';
	import { goto } from '$app/navigation';

	type PlanType = 'FlexFi' | 'GrowFi' | 'VaultFi' | 'SwiftFi';

	interface SavingsPlan {
		id: string;
		name: PlanType;
		apy: number;
		minDeposit: number;
		lockPeriod: string;
		description: string;
		color: string;
		isActive: boolean;
		balance: number;
		startDate?: string;
		maturityDate?: string;
		interestEarned: number;
	}

	const savingsPlans: SavingsPlan[] = [
		{
			id: '1',
			name: 'VaultFi',
			apy: 8,
			minDeposit: 100,
			lockPeriod: '1 year',
			description: 'Maximum returns with long-term commitment',
			color: 'purple',
			isActive: false,
			balance: 0,
			interestEarned: 0
		},
		{
			id: '2',
			name: 'GrowFi',
			apy: 4,
			minDeposit: 50,
			lockPeriod: '6 months',
			description: 'Balanced growth with medium lock period',
			color: 'green',
			isActive: false,
			balance: 0,
			interestEarned: 0
		},
		{
			id: '3',
			name: 'FlexFi',
			apy: 2,
			minDeposit: 25,
			lockPeriod: '4 months',
			description: 'Flexible savings with steady returns',
			color: 'blue',
			isActive: false,
			balance: 0,
			interestEarned: 0
		},
		{
			id: '4',
			name: 'SwiftFi',
			apy: 0,
			minDeposit: 10,
			lockPeriod: 'No lock',
			description: 'Quick access savings with no interest',
			color: 'orange',
			isActive: false,
			balance: 0,
			interestEarned: 0
		}
	];

	const colorClasses: Record<string, {
		bg: string;
		bgDark: string;
		border: string;
		text: string;
		button: string;
	}> = {
		purple: {
			bg: 'bg-purple-50',
			bgDark: 'dark:bg-purple-900/20',
			border: 'border-purple-500',
			text: 'text-purple-500',
			button: 'bg-purple-500 hover:bg-purple-600'
		},
		green: {
			bg: 'bg-green-50',
			bgDark: 'dark:bg-green-900/20',
			border: 'border-green-500',
			text: 'text-green-500',
			button: 'bg-green-500 hover:bg-green-600'
		},
		blue: {
			bg: 'bg-blue-50',
			bgDark: 'dark:bg-blue-900/20',
			border: 'border-blue-500',
			text: 'text-blue-500',
			button: 'bg-blue-500 hover:bg-blue-600'
		},
		orange: {
			bg: 'bg-orange-50',
			bgDark: 'dark:bg-orange-900/20',
			border: 'border-orange-500',
			text: 'text-orange-500',
			button: 'bg-orange-500 hover:bg-orange-600'
		}
	};

	let selectedPlan = $state<SavingsPlan | null>(null);
	let depositAmount = $state(0);
	let showDepositModal = $state(false);
	let isProcessingDeposit = $state(false);
	let toastMessage = $state<{ message: string; type: 'success' | 'error' } | null>(null);

	const openDepositModal = (plan: SavingsPlan) => {
		selectedPlan = plan;
		depositAmount = plan.minDeposit;
		showDepositModal = true;
	};

	const closeDepositModal = () => {
		showDepositModal = false;
		selectedPlan = null;
		depositAmount = 0;
	};

	const showToast = (message: string, type: 'success' | 'error') => {
		toastMessage = { message, type };
		setTimeout(() => (toastMessage = null), 3000);
	};

	const handleDeposit = async () => {
		if (!selectedPlan) return;

		// Validate amount
		if (depositAmount < selectedPlan.minDeposit) {
			showToast(`Minimum deposit is $${selectedPlan.minDeposit}`, 'error');
			return;
		}

		isProcessingDeposit = true;

		try {
			// Map frontend plan names to backend plan types
			const planTypeMap: Record<PlanType, 'vaultfi' | 'growfi' | 'flexifi' | 'swiftfi'> = {
				VaultFi: 'vaultfi',
				GrowFi: 'growfi',
				FlexFi: 'flexifi',
				SwiftFi: 'swiftfi'
			};

			// Call backend API to create savings plan
			await savingsService.createPlan({
				planType: planTypeMap[selectedPlan.name],
				amount: depositAmount
			});

			showToast(`Successfully deposited $${depositAmount.toFixed(2)} to ${selectedPlan.name}!`, 'success');
			closeDepositModal();

			// Redirect to dashboard to see the updated plan
			setTimeout(() => {
				goto('/dashboard');
			}, 1000);

		} catch (error: any) {
			console.error('Deposit error:', error);
			const errorMessage = error.response?.data?.error || error.message || 'Failed to complete deposit. Please try again.';
			showToast(errorMessage, 'error');
		} finally {
			isProcessingDeposit = false;
		}
	};

	const getLockPeriodDays = (lockPeriod: string): number => {
		const periodMap: Record<string, number> = {
			'1 year': 365,
			'6 months': 180,
			'4 months': 120,
			'No lock': 0
		};
		return periodMap[lockPeriod] || 0;
	};
</script>

<svelte:head>
	<title>Savings Plans - SavFi</title>
	<meta name="description" content="View and manage your savings plans" />
</svelte:head>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="mb-6">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Savings Plans</h2>
		<p class="text-gray-600 dark:text-gray-400">Choose a plan that suits your financial goals</p>
	</div>

	<!-- Savings Plans Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each savingsPlans as plan}
			{@const colors = colorClasses[plan.color]}
			<div
				class="{colors.bg} {colors.bgDark} border-2 {plan.isActive
					? colors.border
					: 'border-gray-200 dark:border-gray-700'} rounded-2xl p-6 relative overflow-hidden"
			>
				{#if plan.isActive}
					<div
						class="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
					>
						Active
					</div>
				{/if}

				<div class="flex items-start justify-between mb-4">
					<div>
						<h3 class="text-2xl font-bold {colors.text} mb-1">{plan.name}</h3>
						<p class="text-gray-600 dark:text-gray-400 text-sm">{plan.description}</p>
					</div>
					<div class="{colors.bg} {colors.bgDark} p-3 rounded-xl">
						<Wallet class="w-6 h-6 {colors.text}" />
					</div>
				</div>

				<div class="space-y-3 mb-6">
					<div class="flex items-center gap-3">
						<TrendingUp class="w-5 h-5 {colors.text}" />
						<div>
							<p class="text-xs text-gray-600 dark:text-gray-400">APY</p>
							<p class="text-lg font-bold text-gray-900 dark:text-white">{plan.apy}%</p>
						</div>
					</div>

					<div class="flex items-center gap-3">
						<Calendar class="w-5 h-5 {colors.text}" />
						<div>
							<p class="text-xs text-gray-600 dark:text-gray-400">Lock Period</p>
							<p class="text-lg font-bold text-gray-900 dark:text-white">{plan.lockPeriod}</p>
						</div>
					</div>

					<div class="flex items-center gap-3">
						<Lock class="w-5 h-5 {colors.text}" />
						<div>
							<p class="text-xs text-gray-600 dark:text-gray-400">Min Deposit</p>
							<p class="text-lg font-bold text-gray-900 dark:text-white">${plan.minDeposit}</p>
						</div>
					</div>
				</div>

				{#if plan.isActive}
					<div class="border-t border-gray-200 dark:border-gray-700 pt-4">
						<div class="flex justify-between items-center mb-2">
							<span class="text-sm text-gray-600 dark:text-gray-400">Current Balance</span>
							<span class="text-lg font-bold text-gray-900 dark:text-white"
								>${plan.balance.toFixed(2)}</span
							>
						</div>
						<div class="flex justify-between items-center mb-2">
							<span class="text-sm text-gray-600 dark:text-gray-400">Interest Earned</span>
							<span class="text-lg font-bold {colors.text}"
								>${plan.interestEarned.toFixed(2)}</span
							>
						</div>
						{#if plan.maturityDate}
							<div class="flex justify-between items-center">
								<span class="text-sm text-gray-600 dark:text-gray-400">Maturity Date</span>
								<span class="text-sm font-medium text-gray-900 dark:text-white">{plan.maturityDate}</span>
							</div>
						{/if}
					</div>
				{/if}

				<div class="mt-6 flex gap-3">
					<button
						onclick={() => openDepositModal(plan)}
						class="flex-1 px-4 py-3 {colors.button} text-white rounded-xl font-semibold transition-colors cursor-pointer"
					>
						{plan.isActive ? 'Add Funds' : 'Start Plan'}
					</button>
					{#if plan.isActive}
						<button
							class="px-4 py-3 border-2 {colors.border} {colors.text} rounded-xl font-semibold hover:opacity-80 transition-colors cursor-pointer"
						>
							Details
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- Plan Summary -->
	<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
		<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Summary</h3>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<div class="text-center">
				<p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Balance</p>
				<p class="text-2xl font-bold text-gray-900 dark:text-white">
					${savingsPlans.reduce((sum, p) => sum + p.balance, 0).toFixed(2)}
				</p>
			</div>
			<div class="text-center">
				<p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Plans</p>
				<p class="text-2xl font-bold text-blue-500">
					{savingsPlans.filter((p) => p.isActive).length}
				</p>
			</div>
			<div class="text-center">
				<p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Interest</p>
				<p class="text-2xl font-bold text-green-500">
					${savingsPlans.reduce((sum, p) => sum + p.interestEarned, 0).toFixed(2)}
				</p>
			</div>
			<div class="text-center">
				<p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg APY</p>
				<p class="text-2xl font-bold text-purple-500">
					{savingsPlans.length > 0
						? (savingsPlans.reduce((sum, p) => sum + p.apy, 0) / savingsPlans.length).toFixed(1)
						: 0}%
				</p>
			</div>
		</div>
	</div>
</div>

<!-- Deposit Modal -->
{#if showDepositModal && selectedPlan}
	<div
		class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
		onclick={closeDepositModal}
	>
		<div
			class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-xl font-bold text-gray-900 dark:text-white">Deposit to {selectedPlan.name}</h3>
				<button
					onclick={closeDepositModal}
					class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full cursor-pointer transition-colors"
				>
					✕
				</button>
			</div>

			<div class="space-y-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Amount (USDT)
					</label>
					<input
						type="number"
						bind:value={depositAmount}
						min={selectedPlan.minDeposit}
						step="0.01"
						class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
						Minimum deposit: ${selectedPlan.minDeposit}
					</p>
				</div>

				<div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
					<div class="flex justify-between text-sm mb-2">
						<span class="text-gray-600 dark:text-gray-400">Est. Interest</span>
						<span class="font-semibold text-gray-900 dark:text-white">
							@ {selectedPlan.apy}% APY
						</span>
					</div>
					<p class="text-xs text-gray-500 dark:text-gray-400">
						Interest is calculated daily and credited at maturity
					</p>
				</div>

				<div class="flex gap-3">
					<button
						onclick={closeDepositModal}
						disabled={isProcessingDeposit}
						class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Cancel
					</button>
					<button
						onclick={handleDeposit}
						disabled={isProcessingDeposit || depositAmount < selectedPlan.minDeposit}
						class="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					>
						{#if isProcessingDeposit}
							<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
							Processing...
						{:else}
							Deposit
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Toast Notification -->
{#if toastMessage}
	<div
		class="fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg {toastMessage.type === 'success'
			? 'bg-green-500 text-white'
			: 'bg-red-500 text-white'} z-50 animate-fade-in"
	>
		{toastMessage.message}
	</div>
{/if}
