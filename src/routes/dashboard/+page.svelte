<script lang="ts">
	import {
		Eye,
		EyeOff,
		Copy,
		CirclePlus,
		DollarSign,
		ShieldCheck,
		ChevronDown
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/auth.service';
	import SavingsPlanCard from '$lib/components/dashboard/SavingsPlanCard.svelte';
	import TransactionsTable from '$lib/components/dashboard/TransactionsTable.svelte';

	type PlanType = 'FlexFi' | 'GrowFi' | 'VaultFi' | 'SwiftFi';
	type TxStatus = 'Success' | 'Pending' | 'Failed';

	interface DisplayPlan {
		type: PlanType;
		duration?: string;
		interest: string;
		balance: number;
		principal?: number;
		interestEarned?: number;
		maturityDate?: string;
		progress?: number;
		isActive: boolean;
		status?: 'Active' | 'Emergency only';
	}

	interface Transaction {
		date: string;
		type: string;
		amount: string;
		status: TxStatus;
		source: string;
	}

	const PLAN_CONFIGS = {
		FlexFi: { duration: '4 months plan', interestDisplay: '+2% interest' },
		GrowFi: { duration: '6 months plan', interestDisplay: '+4% interest' },
		VaultFi: { duration: '1 year plan', interestDisplay: '+8% interest' },
		SwiftFi: { duration: '', interestDisplay: '+0% interest' }
	};

	const COLOR_BY_PLAN: Record<PlanType, 'blue' | 'green' | 'purple' | 'orange'> = {
		FlexFi: 'blue',
		GrowFi: 'green',
		VaultFi: 'purple',
		SwiftFi: 'orange'
	};

	let showBalance = $state(true);
	let currency = $state('USDT');
	let openDropdown = $state(false);
	let toast = $state<{ message: string; type: 'success' | 'error' } | null>(null);
	let displayPlans = $state<DisplayPlan[]>([]);
	let totalBalance = $state(0);
	let isLoadingData = $state(true);

	let userName = $state('User');
	let walletAddress = $state('');
	let kycVerified = $state(false);

	// Load user data on mount
	onMount(async () => {
		// Check if user is authenticated
		if (!authService.isAuthenticated()) {
			goto('/login');
			return;
		}

		// Load user data
		try {
			const { user } = await authService.getCurrentUser();
			userName = user.username || 'User';
			walletAddress = user.phantomWallet || '';
			kycVerified = user.kycVerified || false;
		} catch (error) {
			console.error('Failed to load user data:', error);
			// Try to use cached user data from localStorage
			const cachedUser = authService.getUserData();
			if (cachedUser) {
				userName = cachedUser.username || 'User';
				walletAddress = cachedUser.phantomWallet || '';
				kycVerified = cachedUser.kycVerified || false;
				toast = { message: 'Using cached user data', type: 'success' };
			} else {
				toast = { message: 'Failed to load user data', type: 'error' };
			}
		} finally {
			isLoadingData = false;
		}

		// TODO: Load savings plans from API
		initializeDisplayPlans();
	});

	function initializeDisplayPlans() {
		const plans: DisplayPlan[] = [
			{
				type: 'FlexFi',
				duration: PLAN_CONFIGS.FlexFi.duration,
				interest: PLAN_CONFIGS.FlexFi.interestDisplay,
				balance: 0,
				isActive: false
			},
			{
				type: 'GrowFi',
				duration: PLAN_CONFIGS.GrowFi.duration,
				interest: PLAN_CONFIGS.GrowFi.interestDisplay,
				balance: 0,
				isActive: false
			},
			{
				type: 'VaultFi',
				duration: PLAN_CONFIGS.VaultFi.duration,
				interest: PLAN_CONFIGS.VaultFi.interestDisplay,
				balance: 0,
				isActive: false
			},
			{
				type: 'SwiftFi',
				interest: PLAN_CONFIGS.SwiftFi.interestDisplay,
				balance: 0,
				isActive: false
			}
		];

		displayPlans = plans;
		totalBalance = 0;
	}

	const mapStatusToCardStatus = (
		p: DisplayPlan
	): 'running' | 'not-started' | 'available' => {
		if ((p.balance ?? 0) > 0) return 'running';
		if (p.type === 'SwiftFi') return 'available';
		return 'not-started';
	};

	const toSavingPlanCardProps = (p: DisplayPlan) => {
		return {
			name: p.type,
			interest: p.interest,
			color: COLOR_BY_PLAN[p.type],
			progress: p.progress ?? 0,
			available: p.balance ?? 0,
			principal: p.principal ?? 0,
			interestAmount: p.interestEarned ?? 0,
			maturity: p.maturityDate ?? '—',
			status: mapStatusToCardStatus(p)
		};
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast = { message: 'Copied to clipboard!', type: 'success' };
		setTimeout(() => (toast = null), 3000);
	};

	const formattedAddress = (address: string) => {
		if (address.length <= 10) return address;
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	const activePlansCount = $derived(
		displayPlans.filter((p) => p.isActive).length
	);
</script>

<svelte:head>
	<title>Dashboard - SavFi</title>
	<meta name="description" content="Manage your savings and investments" />
</svelte:head>

<div class="space-y-6">
	{#if isLoadingData}
		<div class="flex items-center justify-center py-20">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007BFF]"></div>
		</div>
	{:else}
		<!-- Welcome Section -->
		<div class="mb-4 sm:mb-6">
			<h2 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1 flex flex-col sm:flex-row sm:items-center sm:gap-2">
				<span>Welcome {userName} 👋</span>
				<span class="text-sm font-normal text-gray-600 dark:text-gray-400"> Lock in. Level up. </span>
			</h2>
		</div>

	<!-- KYC Banner -->
	{#if !kycVerified}
		<div
			class="mb-6 p-4 bg-[#FFF7EE] dark:bg-gray-800 border border-[#FFAE58] dark:border-orange-600 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
		>
		<div class="flex items-center gap-3">
			<div
				class="w-10 h-10 rounded-full bg-[#ffead4] dark:bg-gray-700 flex items-center justify-center"
			>
				<ShieldCheck class="w-5 h-5 text-[#FFAE58] dark:text-orange-400" />
			</div>
			<div>
				<p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Complete your KYC to unlock full access</p>
				<p class="text-xs text-gray-600 dark:text-gray-400">Verify your NIN to secure your account</p>
			</div>
		</div>
		<a href="/dashboard/profile" class="w-full sm:w-auto">
			<button
				class="w-full sm:w-auto px-6 py-2 bg-gray-900 dark:bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors cursor-pointer"
			>
				Complete KYC
			</button>
		</a>
	</div>
	{/if}

	<!-- Balance Cards -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
		<!-- Total Balance Card -->
		<div
			class="bg-[#1D85D4] rounded-2xl px-4 sm:px-6 py-6 sm:py-8 text-white relative overflow-hidden"
		>
			<div
				class="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 -mt-12 sm:-mr-16 sm:-mt-16"
			></div>
			<div
				class="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full -ml-10 -mb-10 sm:-ml-12 sm:-mb-12"
			></div>

			<div class="relative z-10">
				<div class="flex items-center justify-between mb-4 sm:mb-8">
					<span class="text-xs sm:text-sm opacity-90">Total balance</span>
					<button
						onclick={() => (showBalance = !showBalance)}
						class="p-1.5 hover:bg-white/20 cursor-pointer rounded-lg transition-colors"
						aria-label={showBalance ? 'Hide balance' : 'Show balance'}
					>
						{#if showBalance}
							<Eye class="w-4 h-4 sm:w-5 sm:h-5" />
						{:else}
							<EyeOff class="w-4 h-4 sm:w-5 sm:h-5" />
						{/if}
					</button>
				</div>

				<div class="mb-2 text-white">
					<div class="text-2xl sm:text-3xl md:text-4xl font-bold flex flex-col sm:flex-row gap-1 sm:items-center mb-1">
						{showBalance ? `${totalBalance.toFixed(2)}` : '****'}
						<!-- Currency Button -->
						<div class="relative inline-block">
							<button
								onclick={() => (openDropdown = !openDropdown)}
								class="flex items-center gap-1"
							>
								<span class="text-base sm:text-lg font-semibold">{currency}</span>
								<ChevronDown class="w-3 h-3 sm:w-4 sm:h-4" />
							</button>
							<!-- DROPDOWN MENU -->
							{#if openDropdown}
								<div
									class="absolute top-7 sm:top-8 p-0 left-0 bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden z-20 min-w-[100px]"
								>
									<button
										class="w-full text-sm text-left px-3 py-2 hover:bg-gray-100"
										onclick={() => {
											currency = 'USDT';
											openDropdown = false;
										}}
									>
										USDT
									</button>
									<button
										class="w-full text-sm text-left px-3 py-2 hover:bg-gray-100"
										onclick={() => {
											currency = 'USDC';
											openDropdown = false;
										}}
									>
										USDC
									</button>
								</div>
							{/if}
						</div>
					</div>
					<div class="mt-2 sm:mt-3 flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
						<p class="text-xs sm:text-sm font-medium text-white">
							₦{(totalBalance * 1600).toFixed(2)}
						</p>

						<div class="flex items-center gap-2">
							<span class="text-xs truncate max-w-[100px] sm:max-w-none">{walletAddress ? formattedAddress(walletAddress) : 'No wallet'}</span>
							<button
								onclick={() => copyToClipboard(walletAddress)}
								class="p-1 hover:bg-white/20 cursor-pointer rounded transition-colors"
								aria-label="Copy wallet address"
							>
								<Copy class="w-3 h-3 sm:w-4 sm:h-4" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Active Plans Card -->
		<div
			class="bg-[#D6C8FF] rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden"
		>
			<div
				class="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 -mt-12 sm:-mr-16 sm:-mt-16"
			></div>

			<div class="relative z-10">
				<span class="text-xs sm:text-sm text-gray-900 block mb-4 sm:mb-8"> Active savings plan </span>

				<div class="mb-2">
					<div class="text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold mb-1">
						{activePlansCount === 0
							? '0 plan'
							: `${activePlansCount} ${activePlansCount === 1 ? 'plan' : 'plans'}`}
					</div>
					<p class="text-xs sm:text-sm font-medium text-gray-900">
						{totalBalance > 0
							? `Total value: ${totalBalance.toFixed(2)} USDT`
							: 'Start saving today'}
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Action Buttons -->
	<div class="flex flex-col sm:flex-row gap-3 mb-8">
		<button
			class="flex-1 px-6 py-3 bg-blue-500 cursor-pointer text-white rounded-full font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
		>
			<CirclePlus class="w-5 h-5" />
			Deposit
		</button>
		<button
			class="flex-1 px-6 py-3 border-2 font-semibold border-blue-500 text-blue-500 rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30"
		>
			<CirclePlus class="w-5 h-5" />
			Start new plan
		</button>
		<button
			class="flex-1 px-6 py-3 border-2 border-blue-500 cursor-pointer text-blue-500 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30"
		>
			<DollarSign class="w-5 h-5" />
			Withdraw
		</button>
	</div>

	<!-- Savings Plans -->
	<div class="mb-6">
		<div class="flex items-center justify-between mb-4">
			<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Saving Plans</h3>
		</div>

		{#if isLoadingData}
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{#each Array(4) as _}
					<div class="h-64 animate-pulse rounded-2xl bg-gray-200"></div>
				{/each}
			</div>
		{:else}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{#each displayPlans as plan}
					<SavingsPlanCard {...toSavingPlanCardProps(plan)} />
				{/each}
			</div>
		{/if}
	</div>

	<!-- Transactions -->
	<TransactionsTable transactions={[]} loading={false} />
	{/if}
</div>

<!-- Toast -->
{#if toast}
	<div
		class="fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg {toast.type ===
		'success'
			? 'bg-green-500 text-white'
			: 'bg-red-500 text-white'} z-50 animate-fade-in"
	>
		{toast.message}
	</div>
{/if}
