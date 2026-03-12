<script lang="ts">
	import SavingsPlans from '$lib/components/public/SavingsPlans.svelte';
	import HowItWorks from '$lib/components/public/HowItWorks.svelte';
	import CTA from '$lib/components/public/CTA.svelte';
	import Footer from '$lib/components/public/Footer.svelte';
</script>

<svelte:head>
	<title>Products - SavFi</title>
	<meta name="description" content="Explore our savings products - VaultFi, GrowFi, FlexiFi, and SwiftFi" />
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Hero Section -->
	<div class="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 py-20">
		<div class="container mx-auto px-4 lg:px-8 text-center">
			<h1 class="text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in">
				Our Savings Products
			</h1>
			<p class="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
				Discover flexible savings plans designed to help you achieve your
				financial goals. From instant access to high-yield long-term
				savings, we have the perfect plan for you.
			</p>
		</div>
	</div>

	<SavingsPlans />
	<HowItWorks />
	<CTA />
	<Footer />
</div>
