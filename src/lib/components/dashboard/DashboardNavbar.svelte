<script lang="ts">
	import { Bell, Search, ChevronDown, User, Settings, LogOut, Moon, Sun } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/auth.service';
	import { authStore } from '$lib/stores/auth.store';
	import { userStore } from '$lib/stores/user.store';
	import { walletStore } from '$lib/stores/wallet.store';
	import { uiStore, isDarkMode } from '$lib/stores/ui.store';

	let { title = 'Dashboard' } = $props<{ title: string }>();

	let isProfileDropdownOpen = $state(false);
	let showLogoutModal = $state(false);

	// Theme toggle
	const toggleTheme = () => {
		const newTheme = $isDarkMode ? 'light' : 'dark';
		uiStore.setTheme(newTheme);
	};

	// Handle keyboard events for modal
	const handleModalKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			showLogoutModal = false;
		}
	};

	// Load user data from auth service
	let user = $state({
		name: 'User',
		email: 'user@savfi.com',
		avatar: ''
	});

	$effect(() => {
		const userData = authService.getUserData();
		if (userData) {
			user = {
				name: userData.username || 'User',
				email: userData.email || '',
				avatar: userData.profilePicture || ''
			};
		}
	});

	const handleLogout = () => {
		// Clear all stores
		authStore.logout();
		userStore.clearProfile();
		walletStore.disconnect();

		// Show success toast
		uiStore.addToast('Logged out successfully. See you soon!', 'info');

		// Redirect to login
		goto('/login');
	};

	const getInitials = () => user.name.charAt(0).toUpperCase();
</script>

<nav
	class="fixed top-0 right-0 left-0 md:left-[260px] lg:left-[332px] h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6 z-30"
>
	<!-- Page Title -->
	<div class="flex items-center">
		<h1 class="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">{title}</h1>
	</div>

	<!-- Right Actions -->
	<div class="flex items-center gap-4">
		<!-- Search -->
		<div class="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
			<Search class="w-4 h-4 text-gray-500 dark:text-gray-400" />
			<input
				type="text"
				placeholder="Search..."
				class="bg-transparent border-none outline-none text-sm ml-2 w-40 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
			/>
		</div>

		<!-- Notifications -->
		<button
			class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			aria-label="Notifications"
		>
			<Bell class="w-5 h-5 text-gray-600 dark:text-gray-400" />
			<span
				class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
			></span>
		</button>

		<!-- Theme Toggle -->
		<button
			onclick={toggleTheme}
			class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			aria-label="Toggle theme"
		>
			{#if $isDarkMode}
				<Sun class="w-5 h-5 text-gray-600 dark:text-gray-400" />
			{:else}
				<Moon class="w-5 h-5 text-gray-600 dark:text-gray-400" />
			{/if}
		</button>

		<!-- Profile Dropdown -->
		<div class="relative">
			<button
				onclick={() => isProfileDropdownOpen = !isProfileDropdownOpen}
				class="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			>
				<img
					src={user.avatar}
					alt={user.name}
					class="w-8 h-8 rounded-full object-cover"
				/>
				<div class="hidden md:block text-left">
					<p class="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
					<p class="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
				</div>
				<ChevronDown class="w-4 h-4 text-gray-500 dark:text-gray-400" />
			</button>

			{#if isProfileDropdownOpen}
				<div
					class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
				>
					<a
						href="/dashboard/profile"
						class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
					>
						<User class="w-4 h-4" />
						Profile
					</a>
					<a
						href="/dashboard/profile"
						class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
					>
						<Settings class="w-4 h-4" />
						Settings
					</a>
					<hr class="my-2 border-gray-200 dark:border-gray-700" />
					<button
						onclick={() => {
							isProfileDropdownOpen = false;
							showLogoutModal = true;
						}}
						class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
					>
						<LogOut class="w-4 h-4" />
						Logout
					</button>
				</div>
			{/if}
		</div>
	</div>
</nav>

<!-- Logout Modal -->
{#if showLogoutModal}
	<div
		role="presentation"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
		onclick={() => showLogoutModal = false}
	>
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="logout-modal-title"
			class="bg-white dark:bg-gray-800 w-[90%] max-w-sm rounded-2xl p-6 shadow-xl text-center"
			onclick={(e) => e.stopPropagation()}
			onkeydown={handleModalKeydown}
		>
			<h2 id="logout-modal-title" class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Log out</h2>
			<p class="text-gray-700 dark:text-gray-300 mb-6">Are you sure you want to log out of your account?</p>

			<div class="flex items-center justify-center gap-6">
				<button
					onclick={handleLogout}
					class="text-red-600 font-semibold hover:text-red-700 transition-colors"
				>
					Log out
				</button>
				<button
					onclick={() => showLogoutModal = false}
					class="text-gray-600 dark:text-gray-400 font-semibold hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Close dropdown when clicking outside -->
<svelte:window onclick={(e) => {
	if (e.target && !(e.target as Element).closest('.relative')) {
		isProfileDropdownOpen = false;
	}
}} />
