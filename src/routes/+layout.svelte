<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/public/Navigation.svelte';
	import Footer from '$lib/components/public/Footer.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { uiStore } from '$lib/stores/ui.store';

	// Check if current route is a dashboard route
	const isDashboardRoute = $derived($page.url.pathname.startsWith('/dashboard'));

	// Initialize theme on mount
	onMount(() => {
		uiStore.initializeTheme();
	});
</script>

<svelte:head>
	<title>SavFi - Smart Savings on Solana</title>
	<meta name="description" content="Earn high interest on your USDC with SavFi's four-tier savings vaults on Solana blockchain" />
</svelte:head>

{#if !isDashboardRoute}
	<Navigation />
{/if}

<main class:pt-0={isDashboardRoute}>
	<slot />
</main>

{#if !isDashboardRoute}
	<Footer />
{/if}

<style>
	main {
		min-height: 100vh;
	}
	main:not(.pt-0) {
		padding-top: 80px;
	}
</style>
