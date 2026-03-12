<script lang="ts">
	import { Gift, Users, TrendingUp, ArrowRight } from 'lucide-svelte';
</script>

<section id="referral" class="py-20 lg:py-32 bg-[#fff8f8]">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="bg-gradient-to-br from-ring to-[#2e6bd8] rounded-3xl overflow-hidden">
			<div class="grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
				<div class="text-white text-center md:text-start animate-fade-in">
					<div class="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
						<Gift class="w-4 h-4" />
						<span class="text-sm font-medium">Referral Program</span>
					</div>

					<h2 class="text-3xl lg:text-4xl font-bold mb-6">
						Earn More by Sharing SaveFi
					</h2>

					<p class="text-xl text-white/90 mb-8 leading-relaxed">
						Invite your friends and family to join SaveFi. When they save,
						you both earn bonus rewards. Build your wealth together!
					</p>

					<a href="/signup" class="flex justify-center items-center md:justify-start">
						<button class="bg-white flex items-center justify-center md:justify-start cursor-pointer rounded-full font-semibold py-2.5 text-primary hover:bg-white/90 transition-opacity px-8">
							Get Your Referral Link
							<ArrowRight class="ml-2 w-5 h-5" />
						</button>
					</a>
				</div>

				<div class="space-y-6 animate-slide-up">
					<div class="bg-white rounded-2xl p-6 lg:p-8 shadow-lg">
						<div class="flex items-start space-x-4">
							<div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
								<Users class="w-6 h-6 text-primary" />
							</div>
							<div>
								<h3 class="text-xl font-bold text-foreground mb-2">
									Share Your Link
								</h3>
								<p class="text-foreground/80">
									Send your unique referral link to friends via WhatsApp,
									SMS, or social media
								</p>
							</div>
						</div>
					</div>

					<div class="bg-white rounded-2xl p-6 lg:p-8 shadow-lg" style:animation-delay="0.1s">
						<div class="flex items-start space-x-4">
							<div class="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center shrink-0">
								<Gift class="w-6 h-6 text-success" />
							</div>
							<div>
								<h3 class="text-xl font-bold text-foreground mb-2">
									They Save & Earn
								</h3>
								<p class="text-foreground/80">
									Your friend signs up, makes their first deposit, and
									starts earning interest
								</p>
							</div>
						</div>
					</div>

					<div class="bg-white rounded-2xl p-6 lg:p-8 shadow-lg" style:animation-delay="0.2s">
						<div class="flex items-start space-x-4">
							<div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
								<TrendingUp class="w-6 h-6 text-accent" />
							</div>
							<div>
								<h3 class="text-xl font-bold text-foreground mb-2">
									You Both Win
								</h3>
								<p class="text-foreground/80">
									Receive bonus rewards when your referral completes their
									first savings milestone
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
