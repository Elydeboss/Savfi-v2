<script lang="ts">
	import { ArrowRight, Shield } from 'lucide-svelte';
</script>

<section id="home" class="relative min-h-screen flex items-center pt-16 sm:pt-20 overflow-hidden">
	<div class="absolute inset-0 z-0">
		<div class="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-blue-500/10 dark:from-gray-900 dark:via-gray-900/95 dark:to-blue-600/10"></div>
	</div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
		<div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
			<!-- Left Content -->
			<div class="animate-fade-in flex flex-col justify-center items-center text-center lg:text-left lg:items-start">
				<!-- Badge -->
				<div class="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
					<Shield class="w-4 h-4 text-blue-500 flex-shrink-0" />
					<span class="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">Secure & Trusted Savings</span>
				</div>

				<!-- Heading -->
				<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
					Grow Your Crypto,<br />
					<span class="text-blue-500">Secure Your Future.</span>
				</h1>

				<!-- Description -->
				<p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
					Save smart, earn rewards, and build wealth effortlessly with our secure crypto savings platform.
				</p>

				<!-- CTA Buttons -->
				<div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
					<a href="/signup" class="w-full sm:w-auto">
						<button class="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 font-semibold cursor-pointer transition-colors text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-2.5 rounded-full shadow-lg">
							Get Started Free
							<ArrowRight class="w-4 h-4 sm:w-5 sm:h-5" />
						</button>
					</a>
					<a href="/about" class="w-full sm:w-auto">
						<button class="w-full sm:w-auto border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center gap-2 font-semibold cursor-pointer transition-colors text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-2.5 rounded-full">
							Learn More
						</button>
					</a>
				</div>

				<!-- Stats (Mobile: stacked, Desktop: inline) -->
				<div class="grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto lg:mx-0">
					<div class="text-center lg:text-left">
						<p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">$10M+</p>
						<p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Saved</p>
					</div>
					<div class="text-center lg:text-left">
						<p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">50K+</p>
						<p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Users</p>
					</div>
					<div class="text-center lg:text-left">
						<p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">4.9★</p>
						<p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Rating</p>
					</div>
				</div>
			</div>

			<!-- Right Content - Hero Image -->
			<div class="relative order-first lg:order-last mb-8 lg:mb-0">
				<div class="relative">
					<!-- Background glow effect 
					<div class="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/10 rounded-3xl blur-3xl transform -rotate-6"></div> -->
					<img
						src="/images/hero2.png"
						alt="SavFi dashboard showing savings growth and investment portfolio"
						class="relative rounded-2xl sm:rounded-3xl w-full animate-float"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-20px); }
	}
	.animate-float {
		animation: float 6s ease-in-out infinite;
	}
	@keyframes fade-in {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.animate-fade-in {
		animation: fade-in 0.8s ease-out forwards;
	}
</style>
