<script lang="ts">
	import { Copy, Gift, Users, TrendingUp, Share2, Check } from 'lucide-svelte';

	let referralCode = $state('SAVFI2025');
	let referralLink = $state('https://savfi.com/ref/SAVFI2025');
	let toast = $state<{ message: string; type: 'success' | 'error' } | null>(null);

	const referralStats = {
		totalReferrals: 12,
		activeReferrals: 8,
		totalEarned: 150.0,
		pendingEarnings: 25.0
	};

	const recentReferrals = [
		{ name: 'John Doe', email: 'john@example.com', date: '2025-03-10', status: 'Active', bonus: 10.0 },
		{
			name: 'Jane Smith',
			email: 'jane@example.com',
			date: '2025-03-09',
			status: 'Pending',
			bonus: 0
		},
		{ name: 'Bob Johnson', email: 'bob@example.com', date: '2025-03-08', status: 'Active', bonus: 15.0 },
		{
			name: 'Alice Williams',
			email: 'alice@example.com',
			date: '2025-03-07',
			status: 'Active',
			bonus: 10.0
		}
	];

	const copyToClipboard = (text: string, label: string) => {
		navigator.clipboard.writeText(text);
		toast = { message: `${label} copied to clipboard!`, type: 'success' };
		setTimeout(() => (toast = null), 3000);
	};

	const shareLinks = [
		{ name: 'WhatsApp', icon: '📱', url: `https://wa.me/?text=${encodeURIComponent(referralLink)}` },
		{ name: 'Twitter', icon: '🐦', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}` },
		{ name: 'Email', icon: '✉️', url: `mailto:?subject=Join SavFi&body=${encodeURIComponent(referralLink)}` },
		{ name: 'Facebook', icon: '👥', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}` }
	];
</script>

<svelte:head>
	<title>Referrals - SavFi</title>
	<meta name="description" content="Earn rewards by referring friends to SavFi" />
</svelte:head>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="mb-6">
		<h2 class="text-2xl font-semibold text-gray-900 mb-2">Referral Program</h2>
		<p class="text-gray-600">Earn rewards when your friends join SavFi</p>
	</div>

	<!-- Referral Stats Cards -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
		<div class="bg-white rounded-2xl p-6 border border-gray-200">
			<div class="flex items-center gap-3 mb-2">
				<div class="p-2 bg-blue-100 rounded-lg">
					<Users class="w-5 h-5 text-blue-500" />
				</div>
				<span class="text-sm text-gray-600">Total Referrals</span>
			</div>
			<p class="text-2xl font-bold text-gray-900">{referralStats.totalReferrals}</p>
		</div>

		<div class="bg-white rounded-2xl p-6 border border-gray-200">
			<div class="flex items-center gap-3 mb-2">
				<div class="p-2 bg-green-100 rounded-lg">
					<Check class="w-5 h-5 text-green-500" />
				</div>
				<span class="text-sm text-gray-600">Active Referrals</span>
			</div>
			<p class="text-2xl font-bold text-gray-900">{referralStats.activeReferrals}</p>
		</div>

		<div class="bg-white rounded-2xl p-6 border border-gray-200">
			<div class="flex items-center gap-3 mb-2">
				<div class="p-2 bg-purple-100 rounded-lg">
					<TrendingUp class="w-5 h-5 text-purple-500" />
				</div>
				<span class="text-sm text-gray-600">Total Earned</span>
			</div>
			<p class="text-2xl font-bold text-gray-900">${referralStats.totalEarned.toFixed(2)}</p>
		</div>

		<div class="bg-white rounded-2xl p-6 border border-gray-200">
			<div class="flex items-center gap-3 mb-2">
				<div class="p-2 bg-yellow-100 rounded-lg">
					<Gift class="w-5 h-5 text-yellow-500" />
				</div>
				<span class="text-sm text-gray-600">Pending Earnings</span>
			</div>
			<p class="text-2xl font-bold text-gray-900">${referralStats.pendingEarnings.toFixed(2)}</p>
		</div>
	</div>

	<!-- Referral Code Section -->
	<div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white mb-6">
		<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
			<div>
				<h3 class="text-xl font-bold mb-2">Your Referral Code</h3>
				<p class="text-blue-100 text-sm mb-4">
					Share this code with friends and earn 10% of their first deposit as a bonus!
				</p>
				<div class="flex items-center gap-3">
					<code class="bg-white/20 px-4 py-2 rounded-lg text-lg font-mono">{referralCode}</code>
					<button
						onclick={() => copyToClipboard(referralCode, 'Referral code')}
						class="p-2 bg-white/20 hover:bg-white/30 rounded-lg cursor-pointer transition-colors"
					>
						<Copy class="w-5 h-5" />
					</button>
				</div>
			</div>

			<div class="flex-1 lg:max-w-md">
				<h3 class="text-xl font-bold mb-2">Your Referral Link</h3>
				<p class="text-blue-100 text-sm mb-4">Share this unique link via social media or email</p>
				<div class="flex items-center gap-2">
					<input
						type="text"
						readonly
						value={referralLink}
						class="flex-1 px-4 py-2 rounded-lg bg-white/20 border-none text-white placeholder-blue-200 text-sm"
					/>
					<button
						onclick={() => copyToClipboard(referralLink, 'Referral link')}
						class="px-4 py-2 bg-white text-blue-500 rounded-lg font-semibold hover:bg-blue-50 transition-colors cursor-pointer"
					>
						Copy
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Share Buttons -->
	<div class="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
		<h3 class="text-lg font-semibold text-gray-900 mb-4">Share via</h3>
		<div class="flex flex-wrap gap-3">
			{#each shareLinks as link}
				<a
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
				>
					<span class="text-xl">{link.icon}</span>
					<span class="text-sm font-medium">{link.name}</span>
				</a>
			{/each}
		</div>
	</div>

	<!-- How It Works -->
	<div class="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
		<h3 class="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
		<div class="grid md:grid-cols-3 gap-6">
			<div class="text-center">
				<div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
					<span class="text-xl font-bold text-blue-500">1</span>
				</div>
				<h4 class="font-semibold text-gray-900 mb-2">Share Your Link</h4>
				<p class="text-sm text-gray-600">
					Share your unique referral link with friends via social media, email, or WhatsApp
				</p>
			</div>

			<div class="text-center">
				<div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
					<span class="text-xl font-bold text-green-500">2</span>
				</div>
				<h4 class="font-semibold text-gray-900 mb-2">Friends Sign Up</h4>
				<p class="text-sm text-gray-600">
					Your friends sign up using your link and make their first deposit
				</p>
			</div>

			<div class="text-center">
				<div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
					<span class="text-xl font-bold text-purple-500">3</span>
				</div>
				<h4 class="font-semibold text-gray-900 mb-2">Earn Rewards</h4>
				<p class="text-sm text-gray-600">
					You earn 10% of their first deposit as a bonus. They also get a welcome bonus!
				</p>
			</div>
		</div>
	</div>

	<!-- Recent Referrals -->
	<div class="bg-white rounded-2xl p-6 border border-gray-200">
		<h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Referrals</h3>

		{#if recentReferrals.length === 0}
			<div class="text-center py-8">
				<Users class="w-12 h-12 text-gray-300 mx-auto mb-3" />
				<p class="text-gray-600">No referrals yet. Start sharing your link!</p>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="min-w-full">
					<thead>
						<tr class="border-b border-gray-200">
							<th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
							<th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
							<th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
							<th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
							<th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Bonus</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each recentReferrals as referral}
							<tr>
								<td class="px-4 py-3 text-sm font-medium text-gray-900">{referral.name}</td>
								<td class="px-4 py-3 text-sm text-gray-600">{referral.email}</td>
								<td class="px-4 py-3 text-sm text-gray-600">{referral.date}</td>
								<td class="px-4 py-3">
									<span
										class="text-xs font-medium px-2 py-1 rounded-full {referral.status ===
										'Active'
											? 'bg-green-100 text-green-700'
											: 'bg-yellow-100 text-yellow-700'}"
									>
										{referral.status}
									</span>
								</td>
								<td class="px-4 py-3 text-sm font-medium {referral.bonus > 0
									? 'text-green-500'
									: 'text-gray-600'}">
									{referral.bonus > 0 ? `$${referral.bonus.toFixed(2)}` : '—'}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>

<!-- Toast -->
{#if toast}
	<div
		class="fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg {toast.type ===
			'success'
			? 'bg-green-500 text-white'
			: 'bg-red-500 text-white'} z-50 animate-fade-in"
	>
		{toast.message}
	</div>
{/if}
