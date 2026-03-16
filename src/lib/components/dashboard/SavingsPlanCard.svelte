<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import { savingsService } from '../services/savings.service';

	type PlanType = 'FlexFi' | 'GrowFi' | 'VaultFi' | 'SwiftFi';
	type CardColor = 'blue' | 'green' | 'purple' | 'orange';
	type CardStatus = 'running' | 'not-started' | 'available';

	interface Props {
		id: string;
		name: PlanType;
		interest: string;
		color: CardColor;
		progress?: number;
		available: number;
		principal: number;
		interestAmount: number;
		maturity?: string;
		status: CardStatus;
		minDeposit?: number;
		lockPeriod?: number;
		onDeposit?: (planId: string) => void;
		onRefresh?: () => void;
	}

	let {
		id,
		name,
		interest,
		color,
		progress,
		available,
		principal,
		interestAmount,
		maturity,
		status,
		minDeposit,
		lockPeriod,
		onDeposit,
		onRefresh
	}: Props = $props();

	let showWithdrawModal = $state(false);
	let withdrawAmount = $state(0);
	let isProcessingWithdraw = $state(false);
	let toastMessage = $state<{ message: string; type: 'success' | 'error' } | null>(null);

	const colorClasses = {
		blue: {
			bg: 'bg-[#F2F8FE] dark:bg-gray-800',
			text: 'text-blue-500',
			badge: 'bg-blue-500',
			progress: 'text-blue-500',
			button: 'bg-blue-500 hover:bg-blue-600',
			borderColor: 'border-blue-500'
		},
		green: {
			bg: 'bg-[#F7FFFB] dark:bg-gray-800',
			text: 'text-green-500',
			badge: 'bg-green-500',
			progress: 'text-green-500',
			button: 'bg-green-500 hover:bg-green-600',
			borderColor: 'border-green-500'
		},
		purple: {
			bg: 'bg-[#F8F5FF] dark:bg-gray-800',
			text: 'text-[#7146E8]',
			badge: 'bg-[#7146E8]',
			progress: 'text-[#7146E8]',
			button: 'bg-[#7146E8] hover:bg-[#5c3db8]',
			borderColor: 'border-[#7146E8]'
		},
		orange: {
			bg: 'bg-[#FFFDFB] dark:bg-gray-800',
			text: 'text-[#E89E50]',
			badge: 'bg-[#E89E50]',
			progress: 'text-[#E89E50]',
			button: 'bg-[#E89E50] hover:bg-[#d6893d]',
			borderColor: 'border-[#E89E50]'
		}
	};

	const colors = colorClasses[color];

	const getButtonText = () => {
		if (status === 'not-started') return 'Start plan';
		if (status === 'available') return 'Add funds';
		if (status === 'running') return 'Add funds';
		return 'View plan';
	};

	const showToast = (message: string, type: 'success' | 'error') => {
		toastMessage = { message, type };
		setTimeout(() => (toastMessage = null), 3000);
	};

	const handleClick = () => {
		if (onDeposit && id) {
			onDeposit(id);
		}
	};

	const handleWithdraw = async () => {
		// Validate amount
		if (withdrawAmount <= 0) {
			showToast('Please enter a valid amount', 'error');
			return;
		}

		if (withdrawAmount > available) {
			showToast('Insufficient balance', 'error');
			return;
		}

		isProcessingWithdraw = true;

		try {
			// Call backend API to withdraw funds
			await savingsService.withdrawFunds(id, withdrawAmount);
			showToast(`Successfully withdrew $${withdrawAmount.toFixed(2)}`, 'success');
			closeWithdrawModal();

			// Refresh the parent component
			if (onRefresh) {
				onRefresh();
			}
		} catch (error: any) {
			console.error('Withdraw error:', error);
			const errorMessage = error.response?.data?.error || error.message || 'Failed to withdraw. Please try again.';
			showToast(errorMessage, 'error');
		} finally {
			isProcessingWithdraw = false;
		}
	};

	const openWithdrawModal = () => {
		withdrawAmount = available;
		showWithdrawModal = true;
	};

	const closeWithdrawModal = () => {
		showWithdrawModal = false;
		withdrawAmount = 0;
	};

	const circumference = 2 * Math.PI * 20;
	const dashOffset = circumference * (1 - (progress || 0) / 100);
</script>

<div class="{colors.bg} border {colors.borderColor} rounded-2xl p-5 relative overflow-hidden">
	<div class="flex items-start justify-between mb-4">
		<div>
			<h4 class="text-lg font-bold {colors.text} mb-1">{name}</h4>
			<span class="text-xs {colors.badge} text-white px-2 py-1 rounded-full">
				{interest}
			</span>
		</div>
		<div class="relative w-12 h-12">
			<svg class="transform -rotate-90 w-12 h-12">
				<circle
					cx="24"
					cy="24"
					r="20"
					stroke="currentColor"
					stroke-width="4"
					fill="none"
					class="text-neutral-200 dark:text-gray-700"
				/>
				<circle
					cx="24"
					cy="24"
					r="20"
					stroke="currentColor"
					stroke-width="4"
					fill="none"
					stroke-dasharray={circumference}
					stroke-dashoffset={dashOffset}
					class={colors.progress}
					stroke-linecap="round"
				/>
			</svg>
			<span class="absolute inset-0 flex items-center justify-center text-xs font-bold {colors.text}">
				{progress}%
			</span>
		</div>
	</div>

	<div class="space-y-3 mb-4">
		<div>
			<p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Available balance:</p>
			<p class="text-2xl font-bold text-gray-900 dark:text-white">
				{available.toFixed(2)} <span class="text-sm font-normal">USDT</span>
			</p>
		</div>

		<div>
			<p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Principal + Interest:</p>
			<p class="text-sm font-semibold text-gray-900 dark:text-white">
				{principal.toFixed(2)} <span class="text-xs font-normal">USDT</span> +
				<span class={colors.text}>{interestAmount.toFixed(2)} USDT</span>
			</p>
		</div>

		<div>
			<p class="text-xs text-gray-600 dark:text-gray-400">
				Matures: <span class="font-medium text-gray-900 dark:text-white">{maturity}</span>
			</p>
		</div>
	</div>

	<div class="flex gap-2">
		<button
			onclick={handleClick}
			class="flex-1 px-4 py-2 text-sm {colors.button} text-white rounded-full cursor-pointer font-semibold transition-colors"
		>
			{getButtonText()}
		</button>
		{#if status === 'running' && available > 0}
			<button
				onclick={openWithdrawModal}
				class="px-4 py-2 text-sm border-2 {colors.borderColor} {colors.text} rounded-full cursor-pointer font-semibold hover:bg-opacity-10 transition-colors"
			>
				Withdraw
			</button>
		{/if}
	</div>
</div>

<!-- Withdraw Modal -->
{#if showWithdrawModal}
	<div
		class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
		onclick={closeWithdrawModal}
	>
		<div
			class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-xl font-bold text-gray-900 dark:text-white">Withdraw from {name}</h3>
				<button
					onclick={closeWithdrawModal}
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
						bind:value={withdrawAmount}
						min="0.01"
						max={available}
						step="0.01"
						class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
						Available: ${available.toFixed(2)} USDT
					</p>
				</div>

				{#if lockPeriod && lockPeriod > 0}
					<div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
						<p class="text-sm text-yellow-800 dark:text-yellow-200">
							⚠️ <strong>Early withdrawal:</strong> Withdrawing before maturity may incur a penalty fee.
						</p>
					</div>
				{/if}

				<div class="flex gap-3">
					<button
						onclick={closeWithdrawModal}
						disabled={isProcessingWithdraw}
						class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Cancel
					</button>
					<button
						onclick={handleWithdraw}
						disabled={isProcessingWithdraw || withdrawAmount <= 0 || withdrawAmount > available}
						class="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					>
						{#if isProcessingWithdraw}
							<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
							Processing...
						{:else}
							Withdraw
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
