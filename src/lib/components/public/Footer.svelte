<script lang="ts">
	import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-svelte';

	const footerLinks = {
		product: [
			{ name: 'FlexFi', href: '/products#products' },
			{ name: 'GrowFi', href: '/products#products' },
			{ name: 'VaultFi', href: '/products#products' },
			{ name: 'SwiftFi', href: '/products#products' }
		],
		company: [
			{ name: 'About Us', href: '/about' },
			{ name: 'How It Works', href: '/#how-it-works' },
			{ name: 'Referral', href: '/#referral' }
		],
		support: [
			{ name: 'Help Center', href: '/support' },
			{ name: 'FAQ', href: '/#faq' },
			{ name: 'Contact Us', href: '/support' },
			{ name: 'Security', href: '/security' }
		],
		legal: [
			{ name: 'Privacy Policy', href: '/privacy-policy' },
			{ name: 'Terms of Service', href: '/terms-of-service' }
		]
	};

	let email = $state('');
</script>

<footer class="bg-gray-900 dark:bg-black text-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
		<!-- Main Footer Content -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-8 sm:mb-12">
			<!-- Brand Column -->
			<div class="lg:col-span-2">
				<a href="/" class="inline-block mb-4">
					<img src="/images/logo-dark.svg" alt="SavFi Logo" class="h-8 sm:h-10 w-auto" style="filter: brightness(0) invert(1);" />
				</a>
				<p class="text-gray-400 dark:text-gray-500 mt-4 mb-6 leading-relaxed text-sm sm:text-base">
					Nigeria's modern savings platform powered by blockchain technology. Save securely, earn interest, and protect your wealth.
				</p>
				<!-- Social Icons -->
				<div class="flex space-x-3 sm:space-x-4">
					<a
						href="https://facebook.com"
						target="_blank"
						rel="noopener noreferrer"
						class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
						aria-label="Facebook"
					>
						<Facebook class="w-4 h-4 sm:w-5 sm:h-5" />
					</a>
					<a
						href="https://twitter.com"
						target="_blank"
						rel="noopener noreferrer"
						class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
						aria-label="Twitter"
					>
						<Twitter class="w-4 h-4 sm:w-5 sm:h-5" />
					</a>
					<a
						href="https://instagram.com"
						target="_blank"
						rel="noopener noreferrer"
						class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
						aria-label="Instagram"
					>
						<Instagram class="w-4 h-4 sm:w-5 sm:h-5" />
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
						class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
						aria-label="LinkedIn"
					>
						<Linkedin class="w-4 h-4 sm:w-5 sm:h-5" />
					</a>
				</div>
			</div>

			<!-- Product Links -->
			<div>
				<h3 class="font-bold mb-4 text-sm sm:text-base">Products</h3>
				<ul class="space-y-2 sm:space-y-3">
					{#each footerLinks.product as link}
						<li>
							<a href={link.href} class="text-gray-400 dark:text-gray-500 hover:text-white transition-colors text-sm">
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Company Links -->
			<div>
				<h3 class="font-bold mb-4 text-sm sm:text-base">Company</h3>
				<ul class="space-y-2 sm:space-y-3">
					{#each footerLinks.company as link}
						<li>
							<a href={link.href} class="text-gray-400 dark:text-gray-500 hover:text-white transition-colors text-sm">
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Support Links -->
			<div>
				<h3 class="font-bold mb-4 text-sm sm:text-base">Support</h3>
				<ul class="space-y-2 sm:space-y-3">
					{#each footerLinks.support as link}
						<li>
							<a href={link.href} class="text-gray-400 dark:text-gray-500 hover:text-white transition-colors text-sm">
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Legal Links -->
			<div>
				<h3 class="font-bold mb-4 text-sm sm:text-base">Legal</h3>
				<ul class="space-y-2 sm:space-y-3">
					{#each footerLinks.legal as link}
						<li>
							<a href={link.href} class="text-gray-400 dark:text-gray-500 hover:text-white transition-colors text-sm">
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Newsletter Section -->
		<div class="border-t border-white/20 pt-6 sm:pt-8 mb-6 sm:mb-8">
			<div class="max-w-md">
				<h3 class="font-bold mb-2 text-sm sm:text-base">Stay Updated</h3>
				<p class="text-gray-400 dark:text-gray-500 mb-3 sm:mb-4 text-sm">
					Get latest updates on new features and savings tips
				</p>
				<div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
					<input
						type="email"
						bind:value={email}
						placeholder="Enter your email"
						class="flex-1 px-4 py-2.5 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 text-sm"
					/>
					<button
						class="px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap"
					>
						<Mail class="w-4 h-4" />
						<span>Subscribe</span>
					</button>
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="border-t border-white/20 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
			<p>© 2025 SavFi. All rights reserved.</p>
			<div class="flex items-center gap-1">
				<span>•</span>
				<p>Powered by Blockchain Technology</p>
			</div>
		</div>
	</div>
</footer>
