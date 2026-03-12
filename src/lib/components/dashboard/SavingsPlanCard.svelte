<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';

	type PlanType = 'FlexFi' | 'GrowFi' | 'VaultFi' | 'SwiftFi';
	type CardColor = 'blue' | 'green' | 'purple' | 'orange';
	type CardStatus = 'running' | 'not-started' | 'available';

	interface Props {
		name: PlanType;
		interest: string;
		color: CardColor;
		progress: number;
		available: number;
		principal: number;
		interestAmount: number;
		maturity: string;
		status: CardStatus;
	}

	let {
		name,
		interest,
		color,
		progress,
		available,
		principal,
		interestAmount,
		maturity,
		status
	}: Props = $props();

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
		return 'View plan';
	};

	const handleClick = () => {
		const routes = {
			FlexFi: '/dashboard/savings-plan/flexfi',
			GrowFi: '/dashboard/savings-plan/growfi',
			VaultFi: '/dashboard/savings-plan/vaultfi',
			SwiftFi: '/dashboard/savings-plan/swiftfi'
		};
		// Navigate to the plan's route
		console.log(`Navigate to: ${routes[name]}`);
	};

	const circumference = 2 * Math.PI * 20;
	const dashOffset = circumference * (1 - progress / 100);
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

	<div class="text-end">
		<button
			onclick={handleClick}
			class="px-4 py-2 text-sm {colors.button} text-white rounded-full cursor-pointer font-semibold transition-colors"
		>
			{getButtonText()}
		</button>
	</div>
</div>
