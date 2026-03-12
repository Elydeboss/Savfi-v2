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

<footer class="bg-foreground text-white">
	<div class="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
		<div class="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
			<div class="lg:col-span-2">
				<a href="/" class="">
					<img src="/images/logo-dark.svg" alt="SavFi Logo" class="w-24" />
				</a>
				<p class="text-white/70 mt-5 mb-6 leading-relaxed">
					Nigeria's modern savings platform powered by blockchain technology. Save securely, earn
					interest, and protect your wealth.
				</p>
				<div class="flex space-x-4">
					<a
						href="https://facebook.com"
						target="_blank"
						rel="noopener noreferrer"
						class="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
						aria-label="Facebook"
					>
						<Facebook class="w-5 h-5" />
					</a>
					<a
						href="https://twitter.com"
						target="_blank"
						rel="noopener noreferrer"
						class="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
						aria-label="Twitter"
					>
						<Twitter class="w-5 h-5" />
					</a>
					<a
						href="https://instagram.com"
						target="_blank"
						rel="noopener noreferrer"
						class="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
						aria-label="Instagram"
					>
						<Instagram class="w-5 h-5" />
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
						class="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
						aria-label="LinkedIn"
					>
						<Linkedin class="w-5 h-5" />
					</a>
				</div>
			</div>

			<div>
				<h3 class="font-bold mb-4">Products</h3>
				<ul class="space-y-3">
					{#each footerLinks.product as link}
						<li>
							<a href={link.href} class="text-white/70 hover:text-white transition-colors">
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="font-bold mb-4">Company</h3>
				<ul class="space-y-3">
					{#each footerLinks.company as link}
						<li>
							<a href={link.href} class="text-white/70 hover:text-white transition-colors">
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="font-bold mb-4">Support</h3>
				<ul class="space-y-3">
					{#each footerLinks.support as link}
						<li>
							<a href={link.href} class="text-white/70 hover:text-white transition-colors">
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="font-bold mb-4">Legal</h3>
				<ul class="space-y-3">
					{#each footerLinks.legal as link}
						<li>
							<a href={link.href} class="text-white/70 hover:text-white transition-colors">
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="border-t border-white/20 pt-8 mb-8">
			<div class="max-w-md">
				<h3 class="font-bold mb-2">Stay Updated</h3>
				<p class="text-white/70 mb-4 text-sm">
					Get latest updates on new features and savings tips
				</p>
				<div class="flex flex-col sm:flex-row gap-2">
					<input
						type="email"
						bind:value={email}
						placeholder="Enter your email"
						class="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
					/>
					<button
						class="px-6 py-2 bg-primary cursor-pointer rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center">
						<Mail class="w-4 h-4 mr-2" />
						Subscribe
					</button>
				</div>
			</div>
		</div>

		<div
			class="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
			<p>© 2025 SavFi. All rights reserved.</p>
			<p>• Powered by Blockchain Technology</p>
		</div>
	</div>
</footer>
