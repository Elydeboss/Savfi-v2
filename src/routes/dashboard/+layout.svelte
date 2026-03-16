<script lang="ts">
	import { page } from '$app/stores';
	import { Menu, X } from 'lucide-svelte';
	import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
	import DashboardNavbar from '$lib/components/dashboard/DashboardNavbar.svelte';
	import { isDarkMode } from '$lib/stores/ui.store';
	import type { Snippet } from 'svelte';

	let { children } = $props<{ children: Snippet }>();

	const sidebarItems = [
		{ icon: 'home', label: 'Dashboard', href: '/dashboard' },
		{ icon: 'wallet', label: 'Savings Plan', href: '/dashboard/savings-plan' },
		{ icon: 'receipt', label: 'Transaction', href: '/dashboard/transaction' },
		{ icon: 'users', label: 'Referrals', href: '/dashboard/referrals' },
		{ icon: 'bot', label: 'SaveBot', href: '/dashboard/savebot' }
	];

	let isSidebarOpen = $state(false);

	// Get page title from route
	const getPageTitle = (path: string) => {
		const segments = path.split('/').filter(Boolean);
		const lastSegment = segments[segments.length - 1];
		if (!lastSegment || lastSegment === 'dashboard') return 'Dashboard';
		return lastSegment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
	};

	const pageTitle = $derived(getPageTitle($page.url.pathname));
</script>

<svelte:head>
	<title>SavFi - {pageTitle}</title>
</svelte:head>

<div class="min-h-screen bg-[#F5F5F5] dark:bg-[#0f1419] flex">
	<!-- Mobile menu button -->
	<button
		class="md:hidden fixed top-3 right-2 z-50 p-2 h-10 w-10 rounded-lg transition-colors shadow-lg {$isDarkMode
			? 'bg-[#0D1B2A] text-white hover:bg-[#1a2f45]'
			: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'}"
		onclick={() => isSidebarOpen = !isSidebarOpen}
		aria-label="Toggle menu"
	>
		{#if isSidebarOpen}
			<X size={20} />
		{:else}
			<Menu size={20} />
		{/if}
	</button>

	<!-- Sidebar -->
	<Sidebar {sidebarItems} {isSidebarOpen} close={() => isSidebarOpen = false} />

	<!-- Main Content -->
	<div class="flex-1 md:ml-64 lg:ml-72 flex flex-col">
		<DashboardNavbar title={pageTitle} />

		<main class="flex-1 p-4 md:p-6 pt-20 md:pt-20">
			{@render children()}
		</main>
	</div>
</div>

<style>
	:global(body) {
		background-color: #F5F5F5;
	}
	:global([data-theme="dark"] body) {
		background-color: #0f1419;
	}
</style>
