<script lang="ts">
	import { ArrowRight, Shield } from 'lucide-svelte';
</script>

<section id="home" class="relative min-h-screen flex items-center pt-20 overflow-hidden">
	<div class="absolute inset-0 z-0">
			<div class="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-blue-500/10"></div>
	</div>

	<div class="container mx-auto px-4 py-4 lg:px-8 relative z-10">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<div class="animate-fade-in flex flex-col justify-center items-center md:justify-start md:items-start">
				<div class="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full mb-6">
					<Shield class="w-4 h-4 text-blue-500" />
					<span class="text-sm font-medium text-blue-500">Secure & Trusted Savings</span>
				</div>

				<h1 class="text-3xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
					Grow Your Crypto,<br />
					<span class="text-blue-500">Secure Your Future.</span>
				</h1>

				<p class="text-xl text-muted-foreground mb-8 leading-relaxed text-center sm:text-start max-w-xl">
					Save smart, earn rewards, and build wealth effortlessly.
				</p>

				<a href="/about" class="flex sm:flex-row gap-4 mb-12">
					<button
						class="bg-blue-500 text-white flex items-center gap-2 hover:opacity-90 font-semibold cursor-pointer transition-opacity text-base px-8 py-2.5 rounded-full shadow-glow">
						Discover More
						<ArrowRight class="ml-2 w-5 h-5" />
					</button>
				</a>
			</div>

			<div class="block relative animate-float">
				<img src="/images/hero2.png" alt="SavFi dashboard showing savings growth and investment portfolio" class="rounded-3xl w-full" />
			</div>
		</div>
	</div>
</section>
