<script lang="ts">
	import { ChevronDown, Filter, Download, Search } from 'lucide-svelte';

	type TransactionFilter = 'All' | 'Deposit' | 'Withdrawal' | 'Conversion' | 'Interest' | 'Referral';
	type TxStatus = 'Success' | 'Pending' | 'Failed';

	interface Transaction {
		id: string;
		date: string;
		type: string;
		amount: string;
		status: TxStatus;
		source: string;
		description: string;
		txHash?: string;
	}

	// Sample transactions data
	const transactions: Transaction[] = [
		{
			id: '1',
			date: '2025-03-10',
			type: 'Deposit',
			amount: '+500.00 USDT',
			status: 'Success',
			source: 'Crypto',
			description: 'Deposit from wallet',
			txHash: '0x1a2b3c4d5e6f...'
		},
		{
			id: '2',
			date: '2025-03-09',
			type: 'Interest',
			amount: '+12.50 USDT',
			status: 'Success',
			source: 'Interest',
			description: 'FlexFi interest payment'
		},
		{
			id: '3',
			date: '2025-03-08',
			type: 'Conversion',
			amount: '1000.00 USDC',
			status: 'Success',
			source: 'Crypto',
			description: 'USDT to USDC conversion'
		},
		{
			id: '4',
			date: '2025-03-07',
			type: 'Withdrawal',
			amount: '-200.00 USDT',
			status: 'Pending',
			source: 'Crypto',
			description: 'Withdrawal to wallet',
			txHash: '0x9z8y7x6w5v...'
		},
		{
			id: '5',
			date: '2025-03-06',
			type: 'Referral',
			amount: '+25.00 USDT',
			status: 'Success',
			source: 'Referral',
			description: 'Referral bonus from user@example.com'
		}
	];

	let activeFilter: TransactionFilter = $state('All');
	let isFilterOpen = $state(false);
	let searchQuery = $state('');
	let isMobile = $state(false);

	// Check if mobile
	$effect(() => {
		const checkMobile = () => {
			isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
		};
		checkMobile();
		if (typeof window !== 'undefined') {
			const handleResize = () => checkMobile();
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	});

	const filters: TransactionFilter[] = [
		'All',
		'Deposit',
		'Withdrawal',
		'Conversion',
		'Interest',
		'Referral'
	];

	const getCategory = (tx: Transaction): TransactionFilter => {
		const t = tx.type.toLowerCase();
		if (t.includes('deposit')) return 'Deposit';
		if (t.includes('withdrawal')) return 'Withdrawal';
		if (t.includes('conversion')) return 'Conversion';
		if (t.includes('interest')) return 'Interest';
		if (t.includes('referral')) return 'Referral';
		return 'All';
	};

	const filteredTransactions = $derived(
		transactions
			.filter((t) => {
				if (activeFilter === 'All') return true;
				return getCategory(t) === activeFilter;
			})
			.filter((t) => {
				if (!searchQuery) return true;
				return (
					t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
					t.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
					t.amount.toLowerCase().includes(searchQuery.toLowerCase())
				);
			})
	);

	const getStatusColor = (status: TxStatus) => {
		switch (status) {
			case 'Success':
				return 'text-green-500 bg-green-50';
			case 'Pending':
				return 'text-[#E89E50] bg-yellow-50';
			case 'Failed':
				return 'text-red-500 bg-red-50';
			default:
				return 'text-gray-600 bg-gray-100';
		}
	};

	const getSourceColor = (source: string) => {
		switch (source) {
			case 'Naira':
				return 'text-[#E89E50] bg-yellow-50';
			case 'Crypto':
				return 'text-blue-500 bg-blue-50';
			case 'Interest':
				return 'text-purple-500 bg-purple-50';
			case 'Referral':
				return 'text-green-500 bg-green-50';
			case 'System':
				return 'text-gray-600 bg-gray-100';
			default:
				return 'text-gray-900 bg-gray-50';
		}
	};
</script>

<svelte:head>
	<title>Transactions - SavFi</title>
	<meta name="description" content="View your transaction history" />
</svelte:head>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
		<div>
			<h2 class="text-2xl font-semibold text-gray-900 mb-2">Transactions</h2>
			<p class="text-gray-600">View your complete transaction history</p>
		</div>

		<div class="flex items-center gap-3">
			<button
				class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
			>
				<Download class="w-4 h-4" />
				<span class="text-sm font-medium">Export</span>
			</button>
		</div>
	</div>

	<!-- Search and Filter -->
	<div class="flex flex-col md:flex-row gap-4">
		<div class="relative flex-1">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search transactions..."
				class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<div class="relative">
			<button
				onclick={() => (isFilterOpen = !isFilterOpen)}
				class="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
			>
				<Filter class="w-4 h-4" />
				<span class="text-sm font-medium">{activeFilter}</span>
				<ChevronDown class="w-4 h-4" />
			</button>

			{#if isFilterOpen}
				<div
					class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10"
				>
					{#each filters as filter}
						<button
							onclick={() => {
								activeFilter = filter;
								isFilterOpen = false;
							}}
							class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 {activeFilter
								=== filter
								? 'bg-blue-50 text-blue-500'
								: 'text-gray-700'}"
						>
							{filter}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- Transactions List -->
	{#if filteredTransactions.length === 0}
		<div
			class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-10 text-center bg-gray-50"
		>
			<div class="text-2xl font-semibold text-gray-900 mb-2">No transactions found</div>
			<p class="text-sm text-gray-600 max-w-md">
				{searchQuery
					? 'Try adjusting your search or filter'
					: 'When you make transactions, they will appear here'}
			</p>
		</div>
	{:else}
		<div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
			{#if isMobile}
				<!-- Mobile View -->
				<div class="divide-y divide-gray-200">
					{#each filteredTransactions as tx}
						<div class="p-4 space-y-3 cursor-pointer hover:bg-gray-50 transition-colors">
							<div class="flex items-center justify-between">
								<span class="text-sm font-semibold text-gray-900">{tx.type}</span>
								<span class="text-sm font-medium py-1 px-2 rounded-full {getStatusColor(
									tx.status
								)}">
									{tx.status}
								</span>
							</div>
							<p class="text-sm text-gray-600">{tx.description}</p>
							<div class="flex items-center justify-between">
								<span class="text-xs text-gray-500">{tx.date}</span>
								<span class="text-lg font-bold {tx.amount.startsWith(
									'+'
								)
									? 'text-green-500'
									: 'text-gray-900'}">{tx.amount}</span
								>
							</div>
							<div class="flex items-center justify-between">
								<span class="text-xs font-medium px-2 py-1 rounded-full {getSourceColor(
									tx.source
								)}">
									{tx.source}
								</span>
								{#if tx.txHash}
									<span class="text-xs text-gray-500 font-mono">{tx.txHash}</span>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<!-- Desktop Table View -->
				<table class="min-w-full">
					<thead class="bg-gray-100">
						<tr class="border-b border-gray-200">
							<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
								Date
							</th>
							<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
								Type
							</th>
							<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
								Description
							</th>
							<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
								Amount
							</th>
							<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
								Status
							</th>
							<th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
								Source
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each filteredTransactions as tx}
							<tr class="hover:bg-gray-50 transition-colors cursor-pointer">
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
									{tx.date}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{tx.type}
								</td>
								<td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
									{tx.description}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm font-bold {tx.amount.startsWith(
									'+'
								)
									? 'text-green-500'
									: 'text-gray-900'}">
									{tx.amount}
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span class="text-xs font-medium py-1 px-2 rounded-full {getStatusColor(
										tx.status
									)}">
										{tx.status}
									</span>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span class="text-xs font-medium px-2 py-1 rounded-full {getSourceColor(
										tx.source
									)}">
										{tx.source}
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
	{/if}

	<!-- Pagination -->
	{#if filteredTransactions.length > 0}
		<div class="flex items-center justify-between">
			<p class="text-sm text-gray-600">
				Showing 1-{filteredTransactions.length} of {filteredTransactions.length} transactions
			</p>
			<div class="flex items-center gap-2">
				<button
					disabled
					class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
				>
					Previous
				</button>
				<button
					disabled
					class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
				>
					Next
				</button>
			</div>
		</div>
	{/if}
</div>
