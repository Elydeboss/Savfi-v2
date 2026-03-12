<script lang="ts">
	import { ArrowRight, Shield, Eye, Lock, Trash2 } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Privacy Policy - SavFi</title>
	<meta name="description" content="Read SavFi's privacy policy and learn how we protect your data" />
</svelte:head>

<div class="min-h-screen bg-background">
	<div class="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 py-20">
		<div class="container mx-auto px-4 lg:px-8 text-center">
			<h1 class="text-4xl lg:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
			<p class="text-xl text-white/90 max-w-3xl mx-auto">
				Your privacy is important to us. Learn how we protect your data.
			</p>
		</div>
	</div>

	<div class="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
		<div class="prose prose-lg max-w-none">
			<section class="mb-12">
				<h2 class="text-2xl font-bold text-blue-500 mb-4 flex items-center gap-2">
					<Shield class="w-6 h-6" />
					Information We Collect
				</h2>
				<p class="text-gray-600 leading-relaxed mb-4">
					SavFi collects the following types of information:
				</p>

				<div class="bg-blue-50 rounded-xl p-6 mb-4">
					<h3 class="font-semibold text-foreground mb-2">Personal Information</h3>
					<ul class="list-disc list-inside text-gray-600 space-y-1 text-sm">
						<li>Name and contact information (email, phone)</li>
						<li>Government-issued ID (for verification)</li>
						<li>Bank account information (for withdrawals)</li>
						<li>Wallet addresses (for crypto transactions)</li>
					</ul>
				</div>

				<div class="bg-blue-50 rounded-xl p-6">
					<h3 class="font-semibold text-foreground mb-2">Usage Information</h3>
					<ul class="list-disc list-inside text-gray-600 space-y-1 text-sm">
						<li>Transaction history and account balances</li>
						<li>Device information and IP address</li>
						<li>Browser type and operating system</li>
						<li>Pages viewed and features used</li>
					</ul>
				</div>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-blue-500 mb-4 flex items-center gap-2">
					<Eye class="w-6 h-6" />
					How We Use Your Information
				</h2>
				<p class="text-gray-600 leading-relaxed mb-4">
					We use your information to:
				</p>
				<ul class="list-disc list-inside text-gray-600 space-y-2">
					<li>Provide and maintain our services</li>
					<li>Process transactions and send notifications</li>
					<li>Verify your identity and prevent fraud</li>
					<li>Comply with legal obligations</li>
					<li>Improve our services and develop new features</li>
					<li>Communicate about updates and offers</li>
				</ul>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-blue-500 mb-4 flex items-center gap-2">
					<Lock class="w-6 h-6" />
					Data Security
				</h2>
				<p class="text-gray-600 leading-relaxed mb-4">
					We employ industry-standard security measures to protect your data:
				</p>
				<div class="grid md:grid-cols-2 gap-4">
					<div class="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
						<h3 class="font-semibold text-foreground mb-1">Encryption</h3>
						<p class="text-sm text-gray-600">All data is encrypted in transit and at rest using AES-256 encryption</p>
					</div>
					<div class="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
						<h3 class="font-semibold text-foreground mb-1">Two-Factor Authentication</h3>
						<p class="text-sm text-gray-600">Optional 2FA for enhanced account security</p>
					</div>
					<div class="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
						<h3 class="font-semibold text-foreground mb-1">Secure Storage</h3>
						<p class="text-sm text-gray-600">Funds stored in secure cold wallets</p>
					</div>
					<div class="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
						<h3 class="font-semibold text-foreground mb-1">Regular Audits</h3>
						<p class="text-sm text-gray-600">Regular security audits and penetration testing</p>
					</div>
				</div>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-blue-500 mb-4 flex items-center gap-2">
					<Trash2 class="w-6 h-6" />
					Data Retention and Deletion
				</h2>
				<p class="text-gray-600 leading-relaxed mb-4">
					We retain your data for as long as necessary to provide our services
					and comply with legal obligations. You may request deletion of your
					personal data by:
				</p>
				<ul class="list-disc list-inside text-gray-600 space-y-2">
					<li>Contacting support at support@savfi.com</li>
					<li>Using the account deletion feature in settings</li>
				</ul>
				<p class="text-gray-600 leading-relaxed mt-4">
					Please note that certain data must be retained for legal and regulatory
					purposes even after account deletion.
				</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-blue-500 mb-4">Third-Party Sharing</h2>
				<p class="text-gray-600 leading-relaxed mb-4">
					We do not sell your personal information. We may share data with:
				</p>
				<ul class="list-disc list-inside text-gray-600 space-y-2">
					<li><strong>Service Providers:</strong> Payment processors, cloud hosting services</li>
					<li><strong>Regulatory Authorities:</strong> When required by law</li>
					<li><strong>Business Partners:</strong> Only with your consent</li>
				</ul>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-blue-500 mb-4">Your Rights</h2>
				<p class="text-gray-600 leading-relaxed mb-4">
					You have the right to:
				</p>
				<ul class="list-disc list-inside text-gray-600 space-y-2">
					<li>Access and view your personal data</li>
					<li>Correct inaccurate information</li>
					<li>Request deletion of your data</li>
					<li>Opt-out of marketing communications</li>
					<li>Export your data</li>
					<li>Withdraw consent at any time</li>
				</ul>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-blue-500 mb-4">Cookies and Tracking</h2>
				<p class="text-gray-600 leading-relaxed mb-4">
					We use cookies and similar technologies to:
				</p>
				<ul class="list-disc list-inside text-gray-600 space-y-2">
					<li>Remember your preferences</li>
					<li>Analyze site traffic and usage patterns</li>
					<li>Improve user experience</li>
				</ul>
				<p class="text-gray-600 leading-relaxed">
					You can manage cookie preferences through your browser settings.
				</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-blue-500 mb-4">Children's Privacy</h2>
				<p class="text-gray-600 leading-relaxed">
					Our services are not intended for individuals under 18 years of age.
					We do not knowingly collect information from children.
				</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-blue-500 mb-4">International Data Transfers</h2>
				<p class="text-gray-600 leading-relaxed">
					Your information may be transferred to and processed in countries other
					than Nigeria. We ensure appropriate safeguards are in place to protect
					your data in accordance with this privacy policy.
				</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-blue-500 mb-4">Changes to This Policy</h2>
				<p class="text-gray-600 leading-relaxed">
					We may update this privacy policy from time to time. Significant changes
					will be communicated through email or in-app notifications.
				</p>
			</section>

			<section class="bg-blue-50 rounded-xl p-6">
				<h3 class="font-semibold text-foreground mb-2">Contact Us</h3>
				<p class="text-gray-600 text-sm mb-2">
					For privacy-related inquiries, contact us at:
				</p>
				<p class="text-gray-600">
					Email: <a href="mailto:privacy@savfi.com" class="text-blue-500 hover:underline">privacy@savfi.com</a>
				</p>
				<p class="text-sm text-gray-600 mt-4">
					Last updated: March 2025
				</p>
			</section>
		</div>

		<div class="mt-12 text-center">
			<a href="/about-us" class="inline-flex items-center text-blue-500 hover:text-blue-600 font-semibold">
				Back to About Us
				<ArrowRight class="w-4 h-4 ml-2" />
			</a>
		</div>
	</div>
</div>
