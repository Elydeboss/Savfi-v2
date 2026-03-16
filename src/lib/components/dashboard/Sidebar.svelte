<script lang="ts">
	import { page } from '$app/stores';
	import { User, Gift, LogOut, Wallet, Receipt, Users, Bot, Home } from 'lucide-svelte';
	import { isDarkMode } from '$lib/stores/ui.store';

	interface SidebarItem {
		icon: string;
		label: string;
		href: string;
	}

	let { sidebarItems = [], isSidebarOpen = false } = $props<{
		sidebarItems: SidebarItem[];
		isSidebarOpen: boolean;
		close: () => void;
	}>();

	const iconMap: Record<string, any> = {
		home: Home,
		wallet: Wallet,
		receipt: Receipt,
		users: Users,
		bot: Bot
	};

	let activeIndex = $state(0);

	$effect(() => {
		// Update activeIndex based on current route
		const currentIndex = sidebarItems.findIndex((item: SidebarItem) => $page.url.pathname === item.href);
		if (currentIndex !== -1) {
			activeIndex = currentIndex;
		}
	});

	function handleClick(item: SidebarItem, index: number) {
		activeIndex = index;
		isSidebarOpen = false;
	}

	function handleProfile() {
		isSidebarOpen = false;
	}
</script>

<aside
	class="fixed top-0 left-0 w-64 md:w-72 h-full max-w-[20vw] font-medium transform z-50 transition-transform duration-300 {isSidebarOpen
		? 'translate-x-0'
		: '-translate-x-full'} md:translate-x-0 {$isDarkMode
		? 'bg-[#0D1B2A] text-white'
		: 'bg-white text-gray-900 border-r border-gray-200'} p-6 md:p-8"
>
	<!-- Logo -->
	<a href="/dashboard" class="flex items-center gap-3 mb-10">
		<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
			<span class="text-xl font-bold text-white">S</span>
		</div>
		<span class="text-2xl font-bold {$isDarkMode ? 'text-white' : 'text-gray-900'}">SavFi</span>
	</a>

	<div class="flex flex-col h-full">
		<!-- Main Menu -->
		<div class="flex flex-col gap-2 mb-8">
			<h2 class="text-xs {$isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-semibold tracking-wider mb-4">MAIN MENU</h2>

			<ul class="relative list-none space-y-1">
				{#each sidebarItems as item, index}
					{@const Icon = iconMap[item.icon] || Wallet}
					{@const isActive = $page.url.pathname === item.href}
					<li class="relative">
						<a
							href={item.href}
							onclick={() => handleClick(item, index)}
							class="group flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 {isActive
								? 'bg-blue-500 text-white'
								: $isDarkMode
									? 'text-gray-300 hover:bg-white/10 hover:text-white'
									: 'text-gray-700 hover:bg-gray-100'}"
						>
							<Icon class="w-5 h-5" />
							<span class="text-sm font-medium">{item.label}</span>
							{#if isActive}
								<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Account Section -->
		<div class="flex flex-col gap-2 mb-8">
			<h3 class="text-xs {$isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-semibold tracking-wider mb-4">ACCOUNT</h3>

			<ul class="list-none space-y-1">
				<li class="relative">
					<a
						href="/dashboard/profile"
						onclick={handleProfile}
						class="group flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 {$page.url.pathname ===
						'/dashboard/profile'
							? 'bg-blue-500 text-white'
							: $isDarkMode
								? 'text-gray-300 hover:bg-white/10 hover:text-white'
								: 'text-gray-700 hover:bg-gray-100'}"
					>
						<User class="w-5 h-5" />
						<span class="text-sm font-medium">Profile</span>
						{#if $page.url.pathname === '/dashboard/profile'}
							<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
						{/if}
					</a>
				</li>

				<li class="relative">
					<button
						class="group flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 {$isDarkMode
							? 'text-gray-300 hover:bg-white/10 hover:text-white'
							: 'text-gray-700 hover:bg-gray-100'}"
					>
						<LogOut class="w-5 h-5" />
						<span class="text-sm font-medium">Logout</span>
					</button>
				</li>
			</ul>
		</div>

		<!-- Invite Section -->
		<div class="mt-auto">
			<div class="rounded-2xl p-5 bg-gradient-to-br {$isDarkMode
				? 'from-blue-500 to-blue-600'
				: 'from-blue-600 to-blue-700'} relative overflow-hidden">
				<!-- Decorative circles -->
				<div
					class="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"
				></div>
				<div
					class="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full"
				></div>

				<div class="relative z-10">
					<div class="flex items-center gap-3 mb-3">
						<div
							class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
						>
							<Gift class="w-5 h-5 text-white" />
						</div>
						<h3 class="text-base font-semibold text-white">Invite and Earn</h3>
					</div>

					<p class="text-xs text-blue-100 mb-4 leading-relaxed">
						Get bonuses when your invited friends save.
					</p>

					<a
						href="/dashboard/referrals"
						class="block w-full py-2.5 text-blue-600 text-sm font-semibold rounded-xl transition text-center bg-white hover:bg-blue-50 cursor-pointer"
					>
						Invite Now
					</a>
				</div>
			</div>
		</div>
	</div>
</aside>

<!-- Overlay for mobile -->
{#if isSidebarOpen}
	<div
		class="fixed inset-0 bg-black/50 z-40 md:hidden"
		onclick={() => {
			isSidebarOpen = false;
			close();
		}}
	></div>
{/if}
