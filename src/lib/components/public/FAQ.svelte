<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';

	const faqs = [
		{
			question: 'What is SavFi and how does it work?',
			answer:
				'SavFi is a blockchain-powered savings platform that helps Nigerians save securely using USDC on Solana. You can connect your Phantom wallet or use email/password authentication, deposit USDC, choose a savings plan, and earn interest based on your chosen savings plan.'
		},
		{
			question: 'Is my money safe with SavFi?',
			answer:
				'Yes! Your funds are secured with blockchain technology and protected by KYC verification. All savings are held in USDC on Solana, providing fast transactions, low fees, and transparent operations.'
		},
		{
			question: 'What are the different savings plans?',
			answer:
				'SavFi offers four plans: VaultFi (12% APY, 1 year lock), GrowFi (8% APY, 6 months), FlexiFi (5% APY, flexible), and SwiftFi (0% APY, no lock). Choose based on your goals and how long you can save.'
		},
		{
			question: 'How do I withdraw my savings?',
			answer:
				'You can withdraw to your Phantom wallet anytime. FlexiFi and SwiftFi offer instant access, while VaultFi and GrowFi have lock-in periods with early withdrawal penalties. Withdrawals include minimal fees to cover transaction costs.'
		},
		{
			question: 'What fees does SavFi charge?',
			answer:
				'We charge minimal transaction fees on Solana blockchain. Deposits and withdrawals require Phantom wallet signatures. No platform fees for managing your savings!'
		},
		{
			question: 'Do I need crypto knowledge to use SavFi?',
			answer:
				'Not at all! SavFi handles all the technical aspects for you. Simply connect your Phantom wallet or use email/password, choose your plan, deposit USDC, and watch your savings grow. It\'s as easy as using any banking app.'
		},
		{
			question: 'How does the referral program work?',
			answer:
				'Share your unique referral code with friends and family. When they sign up and make their first deposit, you both receive bonus rewards (5% of first deposit). There\'s no limit to how many people you can refer!'
		},
		{
			question: 'Can I switch between savings plans?',
			answer:
				'Yes! You can withdraw and create new plans, though some restrictions apply for locked savings. SwiftFi offers the most flexibility for instant transfers.'
		}
	];

	let openIndex: number | null = null;

	const toggleAccordion = (index: number) => {
		openIndex = openIndex === index ? null : index;
	};
</script>

<section id="faq" class="py-20 lg:py-32 bg-background">
	<div class="container mx-auto px-4 lg:px-8 max-w-4xl">
		<div class="text-center mb-16 animate-fade-in">
			<h2 class="text-3xl lg:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
			<p class="text-xl text-muted-foreground">Everything you need to know about saving with SavFi</p>
		</div>

		<div class="space-y-4 animate-slide-up">
			{#each faqs as faq, index}
				<div class="bg-card border rounded-2xl px-6 transition-colors {openIndex === index ? 'border-primary' : 'border-border'}">
					<button
						onclick={() => toggleAccordion(index)}
						class="w-full text-left text-lg font-semibold cursor-pointer text-foreground hover:text-primary py-6 flex items-center justify-between transition-colors"
					>
						<span>{faq.question}</span>
						<ChevronDown
							class="w-5 h-5 text-primary transition-transform duration-300 {openIndex === index ? 'rotate-180' : ''}"
						/>
					</button>
					<div class="overflow-hidden transition-all duration-300 {openIndex === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}">
						<p class="text-foreground/80 leading-relaxed">
							{faq.answer}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-12 text-center bg-primary/10 rounded-2xl p-8 border border-primary/20">
			<h3 class="text-2xl font-bold text-foreground mb-2">Still have questions?</h3>
			<p class="text-muted-foreground mb-6">Our support team is here to help you 24/7</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/support" class="text-primary hover:text-primary-dark font-semibold transition-colors">
					Visit Help Center
				</a>
				<a
					href="https://wa.me/2348000000000"
					class="text-primary hover:text-primary-dark font-semibold transition-colors"
					target="_blank"
					rel="noopener noreferrer"
				>
					WhatsApp Support
				</a>
			</div>
		</div>
	</div>
</section>
