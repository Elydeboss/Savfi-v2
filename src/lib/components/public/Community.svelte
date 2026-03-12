<script lang="ts">
	import { Star } from 'lucide-svelte';

	const testimonials = [
		{
			name: 'Adebayo O.',
			location: 'Lagos, Nigeria',
			role: 'Business Owner',
			content:
				'SavFi has completely changed how I save. I\'ve been using VaultFi for 6 months and the returns are exactly as promised. The platform is transparent and easy to use.',
			rating: 5
		},
		{
			name: 'Chioma N.',
			location: 'Abuja, Nigeria',
			role: 'Software Engineer',
			content:
				'I love the flexibility of FlexiFi. I can deposit whenever I want and still earn 5% interest. The customer support is excellent and always responsive.',
			rating: 5
		},
		{
			name: 'Emeka O.',
			location: 'Port Harcourt, Nigeria',
			role: 'Freelancer',
			content:
				'As someone who values liquidity, SwiftFi is perfect for me. Instant access to my funds with no lock period. The Solana integration is seamless and fast.',
			rating: 4
		},
		{
			name: 'Fatima M.',
			location: 'Kano, Nigeria',
			role: 'Teacher',
			content:
				'I\'ve been saving with GrowFi for 4 months and I\'m impressed with the interest calculations. The referral program is also a great way to earn extra USDC.',
			rating: 5
		},
		{
			name: 'Ifeoma A.',
			location: 'Ibadan, Nigeria',
			role: 'Student',
			content:
				'The minimum deposit of 10 USDC on SwiftFi made it easy for me to start saving. I\'ve already referred 3 friends and earned bonuses!',
			rating: 5
		}
	];
</script>

<section class="py-20 lg:py-32 bg-[#f2f9ff]">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="text-center mb-16 animate-fade-in">
			<h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-4">
				What Our Users Say
			</h2>
			<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
				Join thousands of satisfied savers who trust SavFi
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
			{#each testimonials as testimonial, index}
				<div
					class="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 animate-slide-up"
				>
					<div class="flex items-center gap-1 mb-4">
						{#each Array(testimonial.rating) as _}
							<Star class="w-5 h-5 fill-[#ffc928] text-[#ffc928]" />
						{/each}
					</div>

					<p class="text-foreground/80 leading-relaxed mb-6 italic">"{testimonial.content}"</p>

					<div class="space-y-2">
						<p class="text-lg font-bold text-foreground">{testimonial.name}</p>
						<p class="text-sm text-muted-foreground">{testimonial.role} • {testimonial.location}</p>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-16 text-center">
			<p class="text-xl text-foreground mb-6 font-semibold">
				Ready to join our community?
			</p>
			<a
				href="/signup"
				class="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-full font-semibold cursor-pointer hover:bg-blue-600 transition-colors text-lg shadow-lg"
			>
				Start Saving Today
			</a>
		</div>
	</div>
</section>
