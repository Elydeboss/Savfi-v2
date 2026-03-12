<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';

	const vaults = [
		{
			name: 'VaultFi',
			apy: 12,
			minDeposit: 100,
			lockPeriod: '1 year',
			color: 'purple',
			description: 'Maximum returns with lock period',
			features: ['12% APY', '1-year lock', 'Premium tier']
		},
		{
			name: 'GrowFi',
			apy: 8,
			minDeposit: 50,
			lockPeriod: '6 months',
			color: 'green',
			description: 'Balanced growth with medium lock',
			features: ['8% APY', '6-month lock', 'Growth tier']
		},
		{
			name: 'FlexiFi',
			apy: 5,
			minDeposit: 25,
			lockPeriod: 'Flexible',
			color: 'blue',
			description: 'Flexible savings with anytime withdrawal',
			features: ['5% APY', 'No lock', 'Standard tier']
		},
		{
			name: 'SwiftFi',
			apy: 0,
			minDeposit: 10,
			lockPeriod: 'No lock',
			color: 'orange',
			description: 'Quick access with no interest',
			features: ['0% APY', 'No lock', 'Quick tier']
		}
	];

	const colorClasses: Record<
		string,
		{
			bg: string;
			text: string;
			button: string;
			accent: string;
		}
	> = {
		purple: {
			bg: 'bg-[#F8F5FF]',
			text: 'text-[#7146E8]',
			button: 'bg-[#7146E8] hover:bg-[#5c3db8]',
			accent: 'bg-[#D6EBFF]'
		},
		green: {
			bg: 'bg-[#F7FFFB]',
			text: 'text-success',
			button: 'bg-success hover:bg-success/90',
			accent: 'bg-[#D1FAD6]'
		},
		blue: {
			bg: 'bg-[#F2F8FE]',
			text: 'text-blue-500',
			button: 'bg-blue-500 hover:bg-blue-500/90',
			accent: 'bg-[#D6EBFF]'
		},
		orange: {
			bg: 'bg-[#FFFDFB]',
			text: 'text-[#E89E50]',
			button: 'bg-[#E89E50] hover:bg-[#d48840]',
			accent: 'bg-[#FFEFD0]'
		}
	};
</script>

<section id="products" class="py-20 lg:py-32">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="text-center mb-16 animate-fade-in">
			<h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-4">
				Choose Your Savings Plan
			</h2>
			<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
				Four tiers designed for every savings goal
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each vaults as vault}
				<div
					class="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 animate-slide-up"
				>
					<div
						class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 {colorClasses[vault.color].accent}"
					>
						<span class="text-2xl font-bold {colorClasses[vault.color].text}">
							{vault.apy}%
						</span>
					</div>

					<h3 class="text-2xl font-bold text-foreground mb-2">{vault.name}</h3>

					<p class="text-foreground/70 mb-6">{vault.description}</p>

					<div class="space-y-2 mb-6">
						{#each vault.features as feature}
							<div class="flex items-center gap-2">
								<div class="w-2 h-2 rounded-full bg-success"></div>
								<span class="text-sm text-foreground/80">{feature}</span>
							</div>
						{/each}
					</div>

					<div class="space-y-4">
						<div>
							<p class="text-xs text-muted-foreground mb-1">Minimum Deposit</p>
							<p class="text-lg font-bold text-foreground">
								{vault.minDeposit} USDC
							</p>
						</div>
						<div>
							<p class="text-xs text-muted-foreground mb-1">Lock Period</p>
							<p class="text-lg font-semibold text-foreground">
								{vault.lockPeriod}
							</p>
						</div>
					</div>

					<a
						href="/savings/vaultfi/create"
						class="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-colors cursor-pointer {colorClasses[vault.color].button} text-white"
					>
						Get Started
						<ArrowRight class="w-5 h-5" />
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>
