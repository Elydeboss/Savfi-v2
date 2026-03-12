<script lang="ts">
	import { CheckCircle } from 'lucide-svelte';
</script>

<section class="w-full bg-gradient-to-br from-[#f6f9ff] via-[#eef3ff] to-[#e3eaff] py-20 lg:py-32">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid lg:grid-cols-[60%_35%] gap-12 lg:gap-[5%] items-center">
			<!-- LEFT SIDE — DASHBOARD IMAGE -->
			<div class="block relative animate-float">
				<img src="/images/dashboard2.svg" alt="Dashboard Preview" class="w-full" />
			</div>

			<!-- RIGHT SIDE -->
			<div class="text-foreground flex flex-col justify-center items-center md:items-start md:justify-center">
				<h2 class="text-3xl md:text-4xl font-bold leading-tight">
					See your savings <br /> grow in real time
				</h2>

				<p class="mt-6 text-lg text-center md:text-start text-foreground leading-relaxed max-w-lg">
					Personalized dashboard that lets you take control.
				</p>

				<ul class="mt-8 space-y-4 text-foreground">
					<li class="flex items-center gap-3">
						<span class="grid place-items-center">
							<CheckCircle class="text-primary w-5 h-5" />
						</span>
						Live balances & plan status
					</li>
					<li class="flex items-center gap-3">
						<span class="grid place-items-center">
							<CheckCircle class="text-primary w-5 h-5" />
						</span>
						One-click deposit & withdrawals
					</li>
					<li class="flex items-center gap-3">
						<span class="grid place-items-center">
							<CheckCircle class="text-primary w-5 h-5" />
						</span>
						Real-time interest and conversion info
					</li>
				</ul>

				<a href="/signup" class="mt-10 flex flex-wrap gap-4">
					<button class="px-10 py-3 cursor-pointer rounded-full bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 transition">
						Get Started
					</button>
				</a>
			</div>
		</div>
	</div>
</section>
