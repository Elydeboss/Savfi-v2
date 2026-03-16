<script lang="ts">
	import { page } from '$app/stores';
	import { Menu, X } from 'lucide-svelte';

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Products', href: '/products' },
		{ name: 'About Us', href: '/about' },
		{ name: 'Support', href: '/support' }
	];

	let isMenuOpen = $state(false);
	const isActive = (href: string) => $page.url.pathname === href;

	// Close menu when route changes
	$effect(() => {
		if ($page.url.pathname) {
			isMenuOpen = false;
		}
	});
</script>

<nav class="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 z-50">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16 md:h-20">
			<a href="/" class="flex-shrink-0">
				<img
					src="/images/logo-dark.svg"
					alt="SavFi Logo"
					class="h-8 w-auto sm:h-10"
					style="filter: brightness(0) saturate(100%) invert(35%) sepia(90%) saturate(2500%) hue-rotate(190deg) brightness(95%) contrast(90%);"
				/>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-sm font-medium transition-colors {isActive(link.href)
							? 'text-blue-500'
							: 'text-gray-700 dark:text-gray-300 hover:text-blue-500'}"
					>
						{link.name}
					</a>
				{/each}
			</div>

			<!-- Desktop CTA Buttons -->
			<div class="hidden md:flex items-center space-x-3 lg:space-x-4">
				<a href="/login">
					<button class="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors cursor-pointer">
						Sign In
					</button>
				</a>
				<a href="/signup">
					<button class="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 px-4 lg:px-5 text-sm font-semibold transition-colors cursor-pointer">
						Get Started
					</button>
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
				onclick={() => isMenuOpen = !isMenuOpen}
				aria-label="Toggle menu"
				aria-expanded={isMenuOpen}
			>
				{#if isMenuOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if isMenuOpen}
			<div class="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-slide-up">
				<div class="flex flex-col space-y-1">
					{#each navLinks as link}
						<a
							href={link.href}
							class="font-medium transition-colors py-4 px-4 rounded-xl {isActive(link.href)
								? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
								: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}"
							onclick={() => isMenuOpen = false}
						>
							{link.name}
						</a>
					{/each}
					<div class="flex flex-col space-y-3 pt-4 mt-2 border-t border-gray-200 dark:border-gray-700">
						<a href="/login" class="w-full">
							<button class="w-full text-left py-4 px-4 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer">
								Sign In
							</button>
						</a>
						<a href="/signup" class="w-full">
							<button class="w-full py-4 px-4 font-semibold cursor-pointer rounded-xl text-white bg-blue-500 hover:bg-blue-600 transition-colors">
								Get Started
							</button>
						</a>
					</div>
				</div>
			</div>
		{/if}
	</div>
</nav>
