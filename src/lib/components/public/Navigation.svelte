<script lang="ts">
	import { page } from '$app/stores';
	import { Menu, X } from 'lucide-svelte';

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Products', href: '/products' },
		{ name: 'About Us', href: '/about-us' },
		{ name: 'Support', href: '/support-page' }
	];

	let isMenuOpen = $state(false);
	const isActive = (href: string) => $page.url.pathname === href;
</script>

<nav class="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-border z-50">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="flex items-center justify-between h-16 md:h-20">
			<a href="/" class="">
				<img src="/images/logo-dark.svg" alt="SavFi Logo" class="w-32" style="filter: brightness(0) saturate(100%) invert(35%) sepia(90%) saturate(2500%) hue-rotate(190deg) brightness(95%) contrast(90%);" />
			</a>

			<div class="hidden md:flex items-center space-x-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="font-semibold transition-colors {isActive(link.href) ? 'text-blue-500' : 'text-foreground/80 hover:text-blue-500'}"
					>
						{link.name}
					</a>
				{/each}
			</div>

			<div class="hidden md:flex items-center space-x-4">
				<a href="/login">
					<button class="text-foreground font-semibold cursor-pointer">Sign In</button>
				</a>
				<a href="/signup">
					<button
						class="bg-blue-500 text-white rounded-full py-2.5 px-5 cursor-pointer font-semibold hover:opacity-90 transition-opacity">
						Get Started
					</button>
				</a>
			</div>

			<button
				class="md:hidden text-foreground cursor-pointer"
				onclick={() => isMenuOpen = !isMenuOpen}
				aria-label="Toggle menu"
			>
				{#if isMenuOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>
		</div>

		{#if isMenuOpen}
			<div class="md:hidden py-4 border-t border-border animate-slide-up">
				<div class="flex flex-col space-y-4">
					{#each navLinks as link}
						<a
							href={link.href}
							class="font-medium transition-colors py-2 {isActive(link.href) ? 'text-blue-500' : 'text-foreground/80 hover:text-blue-500'}"
							onclick={() => isMenuOpen = false}
						>
							{link.name}
						</a>
					{/each}
					<div class="flex flex-col space-y-5 pt-4">
						<a href="/login">
							<button class="text-foreground/90 cursor-pointer font-semibold">Sign In</button>
						</a>
						<a href="/signup">
							<button
								class="w-full py-2.5 font-semibold cursor-pointer rounded-full text-white bg-blue-500 hover:opacity-90 transition-opacity">
								Get Started
							</button>
						</a>
					</div>
				</div>
			</div>
		{/if}
	</div>
</nav>
