<script lang="ts">
	import { Shield, Lock, AlertTriangle, CheckCircle, Eye, Server } from 'lucide-svelte';

	const securityFeatures = [
		{
			icon: Lock,
			title: 'Bank-Grade Encryption',
			description: 'All data encrypted with AES-256 encryption, the same standard used by major banks'
		},
		{
			icon: Eye,
			title: 'Two-Factor Authentication',
			description: 'Add an extra layer of security with optional 2FA via authenticator apps'
		},
		{
			icon: Server,
			title: 'Secure Cold Storage',
			description: '95% of user funds stored in offline cold wallets, protected from online threats'
		},
		{
			icon: Shield,
			title: 'Smart Contract Audits',
			description: 'All smart contracts audited by leading security firms'
		}
	];

	const bestPractices = [
		'Use a strong, unique password for your SavFi account',
		'Enable two-factor authentication (2FA)',
		'Never share your password or recovery phrases',
		'Be wary of phishing attempts - verify all URLs',
		'Keep your device software and browser updated',
		'Only access SavFi from secure, private networks'
	];
</script>

<svelte:head>
	<title>Security - SavFi</title>
	<meta name="description" content="Learn about SavFi's security measures and how we protect your funds" />
</svelte:head>

<div class="min-h-screen bg-background">
	<div class="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 py-20">
		<div class="container mx-auto px-4 lg:px-8 text-center">
			<h1 class="text-4xl lg:text-5xl font-bold text-white mb-6">Your Security is Our Priority</h1>
			<p class="text-xl text-white/90 max-w-3xl mx-auto">
				Industry-leading security measures to protect your assets and personal information
			</p>
		</div>
	</div>

	<!-- Security Features -->
	<section class="py-20 lg:py-32">
		<div class="container mx-auto px-4 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-4">Security Features</h2>
				<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
					Built with security at every level
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each securityFeatures as feature}
					{@const Icon = feature.icon}
					<div class="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all duration-300">
						<div class="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
							<Icon class="w-8 h-8 text-blue-500" />
						</div>
						<h3 class="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
						<p class="text-muted-foreground">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- How We Protect You -->
	<section class="py-20 lg:py-32 bg-blue-50/50">
		<div class="container mx-auto px-4 lg:px-8">
			<div class="max-w-4xl mx-auto">
				<div class="text-center mb-16">
					<h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-4">How We Protect Your Funds</h2>
				</div>

				<div class="space-y-6">
					<div class="bg-card rounded-2xl p-6 border border-border flex items-start gap-4">
						<div class="bg-green-100 p-3 rounded-xl">
							<CheckCircle class="w-6 h-6 text-green-500" />
						</div>
						<div>
							<h3 class="text-lg font-bold text-foreground mb-2">Cold Storage</h3>
							<p class="text-muted-foreground">
								95% of user funds are stored in offline cold wallets, inaccessible to hackers.
								Only 5% is kept in hot wallets for daily withdrawals.
							</p>
						</div>
					</div>

					<div class="bg-card rounded-2xl p-6 border border-border flex items-start gap-4">
						<div class="bg-green-100 p-3 rounded-xl">
							<CheckCircle class="w-6 h-6 text-green-500" />
						</div>
						<div>
							<h3 class="text-lg font-bold text-foreground mb-2">Multi-Signature Wallets</h3>
							<p class="text-muted-foreground">
								All transactions require multiple signatures from authorized personnel,
								preventing unauthorized fund movement.
							</p>
						</div>
					</div>

					<div class="bg-card rounded-2xl p-6 border border-border flex items-start gap-4">
						<div class="bg-green-100 p-3 rounded-xl">
							<CheckCircle class="w-6 h-6 text-green-500" />
						</div>
						<div>
							<h3 class="text-lg font-bold text-foreground mb-2">Regular Audits</h3>
							<p class="text-muted-foreground">
								Our smart contracts and systems are regularly audited by leading security
								firms like CertiK and Trail of Bits.
							</p>
						</div>
					</div>

					<div class="bg-card rounded-2xl p-6 border border-border flex items-start gap-4">
						<div class="bg-green-100 p-3 rounded-xl">
							<CheckCircle class="w-6 h-6 text-green-500" />
						</div>
						<div>
							<h3 class="text-lg font-bold text-foreground mb-2">Bug Bounty Program</h3>
							<p class="text-muted-foreground">
								We run a bug bounty program inviting security researchers to find and
								report vulnerabilities, keeping our platform secure.
							</p>
						</div>
					</div>

					<div class="bg-card rounded-2xl p-6 border border-border flex items-start gap-4">
						<div class="bg-green-100 p-3 rounded-xl">
							<CheckCircle class="w-6 h-6 text-green-500" />
						</div>
						<div>
							<h3 class="text-lg font-bold text-foreground mb-2">Insurance Coverage</h3>
							<p class="text-muted-foreground">
								User funds are covered by insurance to protect against potential security
								breaches or operational failures.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Best Practices -->
	<section class="py-20 lg:py-32">
		<div class="container mx-auto px-4 lg:px-8">
			<div class="max-w-4xl mx-auto">
				<div class="text-center mb-16">
					<h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-4">Stay Secure: Best Practices</h2>
					<p class="text-xl text-muted-foreground">
						Follow these tips to keep your account safe
					</p>
				</div>

				<div class="grid md:grid-cols-2 gap-4">
					{#each bestPractices as practice}
						<div class="bg-card rounded-xl p-4 border border-border flex items-start gap-3">
							<Shield class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
							<p class="text-sm text-foreground">{practice}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Security Warnings -->
	<section class="py-20 lg:py-32 bg-red-50/50">
		<div class="container mx-auto px-4 lg:px-8">
			<div class="max-w-4xl mx-auto">
				<div class="text-center mb-12">
					<h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-4">
						<AlertTriangle class="w-8 h-8 inline text-red-500 mb-2" />
						Security Warnings
					</h2>
				</div>

				<div class="bg-red-100 border-l-4 border-red-500 rounded-r-xl p-6 mb-6">
					<h3 class="font-bold text-red-700 mb-2">SavFi Will Never Ask For:</h3>
					<ul class="list-disc list-inside text-red-600 space-y-1">
						<li>Your password or recovery phrase</li>
						<li>Your private keys or seed words</li>
						<li>Remote access to your device</li>
						<li>Direct crypto transfers outside the platform</li>
					</ul>
				</div>

				<div class="bg-yellow-100 border-l-4 border-yellow-500 rounded-r-xl p-6">
					<h3 class="font-bold text-yellow-700 mb-2">Report Suspicious Activity</h3>
					<p class="text-yellow-600">
						If you notice any suspicious activity or believe your account has been compromised,
						contact us immediately at <a href="mailto:security@savfi.com" class="underline font-semibold">security@savfi.com</a>
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="py-20 lg:py-32">
		<div class="container mx-auto px-4 lg:px-8 text-center">
			<h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-6">
				Ready to Start Saving Securely?
			</h2>
			<p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
				Join thousands of users who trust SavFi with their crypto savings
			</p>
			<a href="/signup">
				<button class="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity cursor-pointer">
					Get Started Now
				</button>
			</a>
		</div>
	</section>
</div>
