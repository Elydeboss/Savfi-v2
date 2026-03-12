<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
</script>

<section class="py-20 lg:py-32 bg-gradient-to-br from-blue-500/5 to-blue-500">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<div class="text-white">
				<h2 class="text-3xl lg:text-4xl font-bold mb-6">
					Ready to Start Saving?
				</h2>
				<p class="text-xl text-white/80 mb-8 leading-relaxed">
					Join thousands of Nigerians who trust SavFi for secure and profitable
					savings. Start earning up to 12% APY today.
				</p>

				<div class="space-y-4">
					<div class="flex items-center gap-3">
						<div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
							<span class="text-white font-bold">✓</span>
						</div>
						<span class="text-white/90 text-lg">Instant account creation</span>
					</div>
					<div class="flex items-center gap-3">
						<div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
							<span class="text-white font-bold">✓</span>
						</div>
						<span class="text-white/90 text-lg">No hidden fees</span>
					</div>
					<div class="flex items-center gap-3">
						<div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
							<span class="text-white font-bold">✓</span>
						</div>
						<span class="text-white/90 text-lg">24/7 support</span>
					</div>
				</div>

				<a
					href="/signup"
					class="inline-flex items-center gap-2 bg-white text-blue-500 px-8 py-4 rounded-full font-semibold cursor-pointer hover:bg-white/90 transition-colors text-lg shadow-lg"
				>
					Create Free Account
					<ArrowRight class="w-6 h-6" />
				</a>
			</div>

			<div class="hidden lg:block">
				<img
					src="/images/hero2.png"
					alt="Savings illustration"
					class="rounded-3xl shadow-2xl animate-float"
				/>
			</div>
		</div>
</div>
</section>
