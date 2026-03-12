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

<section class="py-20 lg:py-32 bg-[#f2f9ff]">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="text-center mb-16 animate-fade-in">
			<h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-4">Why Choose SavFi?</h2>
			<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
				Built for Nigerians who want to save smarter and grow their wealth securely on Solana
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each features as feature, index}
				<div
					class="bg-card rounded-2xl p-8 border border-border hover:border-primary transition-all duration-300 hover:shadow-lg animate-slide-up"
				>
					<div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
						<svelte:component this={feature.icon} class="w-7 h-7 text-primary" />
					</div>

					<h3 class="text-xl font-bold font-dm-sans text-foreground mb-3">
						{feature.title}
					</h3>

					<p class="text-foreground/80 leading-relaxed">
						{feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
