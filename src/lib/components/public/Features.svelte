<script lang="ts">
	import { Shield, Zap, Lock, TrendingUp, Globe, Users } from 'lucide-svelte';

	const features = [
		{
			icon: Shield,
			title: 'Bank-Grade Security',
			description: 'Your funds are protected with advanced blockchain technology and NIN verification.'
		},
		{
			icon: Zap,
			title: 'Instant Conversion',
			description: 'Automatic Naira to stablecoin conversion at live market rates with transparent fees.'
		},
		{
			icon: Lock,
			title: 'Protected from Inflation',
			description: 'Save in USDT or USDC to shield your money from Naira devaluation.'
		},
		{
			icon: TrendingUp,
			title: 'Earn Up to 12%',
			description: 'Choose from flexible plans offering interest rates from 2% to 12% annually.'
		},
		{
			icon: Globe,
			title: 'Simple Withdrawals',
			description: 'Cash out to your bank account or crypto wallet anytime with low fees.'
		},
		{
			icon: Users,
			title: 'Referral Rewards',
			description: 'Earn bonuses by inviting friends and family to join the SaveFi community.'
		}
	];
</script>

<section class="py-16 sm:py-20 lg:py-32 bg-blue-50 dark:bg-blue-950">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="text-center mb-10 sm:mb-16 animate-fade-in">
			<h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
				Why Choose SavFi?
			</h2>
			<p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
				Built for Nigerians who want to save smarter and grow their wealth securely on Solana
			</p>
		</div>

		<!-- Features Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
			{#each features as feature, index}
				<div
					class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg animate-slide-up"
					style="animation-delay: {index * 100}ms"
				>
					<!-- Icon -->
					<div class="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
						<svelte:component this={feature.icon} class="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
					</div>

					<!-- Title -->
					<h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
						{feature.title}
					</h3>

					<!-- Description -->
					<p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
						{feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-slide-up {
		animation: slide-up 0.6s ease-out forwards;
		opacity: 0;
	}
	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	.animate-fade-in {
		animation: fade-in 0.8s ease-out forwards;
	}
</style>
