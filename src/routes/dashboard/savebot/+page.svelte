<script lang="ts">
	import { Bot, Play, Pause, Settings, TrendingUp, Wallet, Sparkles } from 'lucide-svelte';

	let isActive = $state(false);
	let autoSaveAmount = $state(50);
	let saveFrequency = $state('daily');
	let targetPlan = $state('SwiftFi');

	const saveBotStats = {
		totalSaved: 1250.0,
		totalAutoSaves: 45,
		averagePerSave: 27.78,
		streak: 7
	};

	const frequencies = [
		{ value: 'daily', label: 'Daily' },
		{ value: 'weekly', label: 'Weekly' },
		{ value: 'monthly', label: 'Monthly' }
	];

	const plans = ['SwiftFi', 'FlexFi', 'GrowFi', 'VaultFi'];

	const recentSaves = [
		{ date: '2025-03-10', amount: 50.0, plan: 'SwiftFi' },
		{ date: '2025-03-09', amount: 50.0, plan: 'SwiftFi' },
		{ date: '2025-03-08', amount: 50.0, plan: 'SwiftFi' },
		{ date: '2025-03-07', amount: 25.0, plan: 'SwiftFi' },
		{ date: '2025-03-06', amount: 50.0, plan: 'SwiftFi' }
	];

	const toggleSaveBot = () => {
		isActive = !isActive;
	};
</script>

<svelte:head>
	<title>SaveBot - SavFi</title>
	<meta name="description" content="Automate your savings with SaveBot" />
</svelte:head>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex items-center justify-between mb-6">
		<div>
			<h2 class="text-2xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
				<Bot class="w-6 h-6 text-blue-500" />
				SaveBot
			</h2>
			<p class="text-gray-600">Automate your savings and reach your goals faster</p>
		</div>

		<button
			onclick={toggleSaveBot}
			class="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors cursor-pointer {isActive
				? 'bg-red-500 text-white hover:bg-red-600'
				: 'bg-green-500 text-white hover:bg-green-600'}"
		>
			{#if isActive}
				<Pause class="w-5 h-5" />
				Stop SaveBot
			{:else}
				<Play class="w-5 h-5" />
				Start SaveBot
			{/if}
		</button>
	</div>

	<!-- Status Banner -->
	<div
		class="p-6 rounded-2xl {isActive
			? 'bg-green-50 border-2 border-green-500'
			: 'bg-gray-50 border-2 border-gray-300'}"
	>
		<div class="flex items-center gap-4">
			<div
				class="w-12 h-12 rounded-full flex items-center justify-center {isActive
					? 'bg-green-500'
					: 'bg-gray-400'}"
			>
				<Bot class="w-6 h-6 text-white" />
			</div>
			<div>
				<h3 class="text-lg font-semibold text-gray-900">
					SaveBot is {isActive ? 'Active' : 'Inactive'}
				</h3>
				<p class="text-sm text-gray-600">
					{isActive
						? `Saving $${autoSaveAmount} ${saveFrequency} to ${targetPlan}`
						: 'Configure your SaveBot settings below'}
				</p>
			</div>
		</div>
	</div>

	<!-- Stats Cards -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
		<div class="bg-white rounded-2xl p-6 border border-gray-200">
			<div class="flex items-center gap-3 mb-2">
				<div class="p-2 bg-blue-100 rounded-lg">
					<Wallet class="w-5 h-5 text-blue-500" />
				</div>
				<span class="text-sm text-gray-600">Total Saved</span>
			</div>
			<p class="text-2xl font-bold text-gray-900">${saveBotStats.totalSaved.toFixed(2)}</p>
		</div>

		<div class="bg-white rounded-2xl p-6 border border-gray-200">
			<div class="flex items-center gap-3 mb-2">
				<div class="p-2 bg-green-100 rounded-lg">
					<Sparkles class="w-5 h-5 text-green-500" />
				</div>
				<span class="text-sm text-gray-600">Auto Saves</span>
			</div>
			<p class="text-2xl font-bold text-gray-900">{saveBotStats.totalAutoSaves}</p>
		</div>

		<div class="bg-white rounded-2xl p-6 border border-gray-200">
			<div class="flex items-center gap-3 mb-2">
				<div class="p-2 bg-purple-100 rounded-lg">
					<TrendingUp class="w-5 h-5 text-purple-500" />
				</div>
				<span class="text-sm text-gray-600">Avg/Save</span>
			</div>
			<p class="text-2xl font-bold text-gray-900">${saveBotStats.averagePerSave.toFixed(2)}</p>
		</div>

		<div class="bg-white rounded-2xl p-6 border border-gray-200">
			<div class="flex items-center gap-3 mb-2">
				<div class="p-2 bg-orange-100 rounded-lg">
					<Settings class="w-5 h-5 text-orange-500" />
				</div>
				<span class="text-sm text-gray-600">Streak</span>
			</div>
			<p class="text-2xl font-bold text-gray-900">{saveBotStats.streak} days</p>
		</div>
	</div>

	<div class="grid lg:grid-cols-2 gap-6">
		<!-- Configuration -->
		<div class="bg-white rounded-2xl p-6 border border-gray-200">
			<h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
				<Settings class="w-5 h-5" />
				Configuration
			</h3>

			<div class="space-y-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Auto-Save Amount (USDT)
					</label>
					<input
						type="number"
						bind:value={autoSaveAmount}
						min="10"
						step="1"
						disabled={isActive}
						class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
					/>
					<p class="text-xs text-gray-500 mt-1">Minimum: $10 USDT</p>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Save Frequency</label>
					<div class="grid grid-cols-3 gap-2">
						{#each frequencies as freq}
							<button
								disabled={isActive}
								class="px-4 py-2 border-2 rounded-xl text-sm font-medium transition-colors {saveFrequency ===
								freq.value
									? 'border-blue-500 bg-blue-50 text-blue-500'
									: 'border-gray-300 hover:border-gray-400'} disabled:bg-gray-100 disabled:cursor-not-allowed"
								onclick={() => (saveFrequency = freq.value)}
							>
								{freq.label}
							</button>
						{/each}
					</div>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Target Plan</label>
					<select
						bind:value={targetPlan}
						disabled={isActive}
						class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
					>
						{#each plans as plan}
							<option value={plan}>{plan}</option>
						{/each}
					</select>
				</div>

				<div class="bg-blue-50 rounded-xl p-4">
					<p class="text-sm text-blue-800">
						<strong>Projected Monthly Savings:</strong> $
						{saveFrequency === 'daily'
							? (autoSaveAmount * 30).toFixed(2)
							: saveFrequency === 'weekly'
								? (autoSaveAmount * 4).toFixed(2)
								: autoSaveAmount.toFixed(2)}
					</p>
				</div>
			</div>
		</div>

		<!-- Recent Activity -->
		<div class="bg-white rounded-2xl p-6 border border-gray-200">
			<h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Auto-Saves</h3>

			{#if recentSaves.length === 0}
				<div class="text-center py-8">
					<Bot class="w-12 h-12 text-gray-300 mx-auto mb-3" />
					<p class="text-gray-600">No auto-saves yet. Start SaveBot to begin!</p>
				</div>
			{:else}
				<div class="space-y-3">
					{#each recentSaves as save}
						<div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
							<div class="flex items-center gap-3">
								<div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
									<Sparkles class="w-5 h-5 text-green-500" />
								</div>
								<div>
									<p class="text-sm font-medium text-gray-900">${save.amount.toFixed(2)} USDT</p>
									<p class="text-xs text-gray-600">{save.date} → {save.plan}</p>
								</div>
							</div>
							<span class="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
								Completed
							</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
