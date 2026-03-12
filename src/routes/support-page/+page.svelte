<script lang="ts">
	import { Mail, MessageCircle, Phone, Clock } from 'lucide-svelte';
	import FAQ from '$lib/components/public/FAQ.svelte';
	import Footer from '$lib/components/public/Footer.svelte';

	let formData = $state({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
		// Reset form
		formData = { name: '', email: '', subject: '', message: '' };
	};

	const contactMethods = [
		{
			icon: Mail,
			title: 'Email Support',
			description: 'Get help via email within 24 hours',
			action: 'support@savfi.com',
			href: 'mailto:support@savfi.com'
		},
		{
			icon: MessageCircle,
			title: 'WhatsApp Chat',
			description: 'Chat with us instantly on WhatsApp',
			action: 'Start Chat',
			href: 'https://wa.me/2348000000000'
		},
		{
			icon: Phone,
			title: 'Phone Support',
			description: 'Call us Monday to Friday, 9 AM - 6 PM',
			action: '+234 800 000 0000',
			href: 'tel:+2348000000000'
		},
		{
			icon: Clock,
			title: 'Live Chat',
			description: 'Available 24/7 for urgent queries',
			action: 'Coming Soon',
			href: '#'
		}
	];
</script>

<svelte:head>
	<title>Support - SavFi</title>
	<meta name="description" content="Get help with your SavFi account. Contact our support team via chat, email, or WhatsApp." />
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Hero Section -->
	<div class="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 py-20">
		<div class="container mx-auto px-4 lg:px-8 text-center">
			<h1 class="text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in">
				How Can We Help You?
			</h1>
			<p class="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
				Our dedicated support team is here to assist you 24/7. Get answers
				to your questions or reach out directly for personalized help.
			</p>
		</div>
	</div>

	<!-- Contact Methods Section -->
	<section class="py-20 lg:py-32">
		<div class="container mx-auto px-4 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
				<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
					Choose your preferred way to reach our support team
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each contactMethods as method, index}
					{@const Icon = method.icon}
					<div class="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all duration-300 text-center animate-slide-up" style:animation-delay="{index * 0.1}s">
						<Icon class="w-8 h-8 text-primary mx-auto mb-4" />
						<h3 class="text-xl font-bold text-foreground mb-2">{method.title}</h3>
						<p class="text-sm text-muted-foreground mb-4">{method.description}</p>
						{#if method.href === '#'}
							<span class="text-primary font-semibold">{method.action}</span>
						{:else}
							<a
								href={method.href}
								target={method.href.startsWith('http') ? '_blank' : undefined}
								rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
								class="text-primary hover:text-primary-dark font-semibold transition-colors">
								{method.action}
							</a>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Help Center Section -->
	<section class="py-20 lg:py-32 bg-[#f2f9ff]">
		<div class="container mx-auto px-4 lg:px-8">
			<div class="max-w-4xl mx-auto">
				<div class="text-center mb-16">
					<h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-4">Quick Help Resources</h2>
					<p class="text-xl text-muted-foreground">Find instant answers to common questions</p>
				</div>

				<div class="grid md:grid-cols-3 gap-6 mb-12">
					<div class="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all duration-300">
						<h3 class="text-lg font-bold text-foreground mb-2">Getting Started</h3>
						<p class="text-sm text-muted-foreground mb-4">
							Learn how to create an account and make your first deposit
						</p>
						<button class="w-full py-2 px-6 rounded-full font-medium bg-muted border-2 border-muted cursor-pointer">
							Read Guide
						</button>
					</div>

					<div class="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all duration-300">
						<h3 class="text-lg font-bold text-foreground mb-2">Savings Plans</h3>
						<p class="text-sm text-muted-foreground mb-4">
							Compare plans and choose the best one for your goals
						</p>
						<button class="w-full py-2 px-6 rounded-full font-medium bg-muted border-2 border-muted cursor-pointer">
							View Plans
						</button>
					</div>

					<div class="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all duration-300">
						<h3 class="text-lg font-bold text-foreground mb-2">Security & Safety</h3>
						<p class="text-sm text-muted-foreground mb-4">
							Understand how we protect your money and data
						</p>
						<button class="w-full py-2 px-6 rounded-full font-medium bg-muted border-2 border-muted cursor-pointer">
							Learn More
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Form Section -->
	<section class="py-20 lg:py-32 bg-[#f2f9ff]">
		<div class="container mx-auto px-4 lg:px-8">
			<div class="max-w-2xl mx-auto">
				<div class="text-center mb-12">
					<h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-4">Send Us a Message</h2>
					<p class="text-xl text-muted-foreground">
						Fill out the form below and we'll get back to you within 24 hours
					</p>
				</div>

				<div class="bg-card rounded-2xl p-8 border border-border shadow-lg">
					<form onsubmit={handleSubmit} class="space-y-6">
						<div>
							<label for="name" class="block text-sm font-medium text-foreground mb-2">
								Full Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								bind:value={formData.name}
								required
								class="w-full px-4 py-3 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
								placeholder="Enter your full name"
							/>
						</div>

						<div>
							<label for="email" class="block text-sm font-medium text-foreground mb-2">
								Email Address
							</label>
							<input
								type="email"
								id="email"
								name="email"
								bind:value={formData.email}
								required
								class="w-full px-4 py-3 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
								placeholder="your.email@example.com"
							/>
						</div>

						<div>
							<label for="subject" class="block text-sm font-medium text-foreground mb-2">
								Subject
							</label>
							<input
								type="text"
								id="subject"
								name="subject"
								bind:value={formData.subject}
								required
								class="w-full px-4 py-3 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
								placeholder="What is this about?"
							/>
						</div>

						<div>
							<label for="message" class="block text-sm font-medium text-foreground mb-2">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								bind:value={formData.message}
								required
								rows={6}
								class="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
								placeholder="Tell us how we can help you..."
							></textarea>
						</div>

						<button
							type="submit"
							class="w-full py-2.5 px-6 rounded-full font-semibold bg-primary text-white hover:bg-primary/90 transition-opacity cursor-pointer">
							Send Message
						</button>
					</form>
				</div>
			</div>
		</div>
	</section>

	<FAQ />
	<Footer />
</div>
