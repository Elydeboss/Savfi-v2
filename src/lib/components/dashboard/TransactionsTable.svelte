<script lang="ts">
	import { ChevronRight, ArrowRight } from 'lucide-svelte';

	type TransactionFilter = 'All' | 'Deposit' | 'Withdrawal' | 'Conversion' | 'Interest' | 'Referral';
	type TxStatus = 'Success' | 'Pending' | 'Failed';

	interface Transaction {
		date: string;
		type: string;
		amount: string;
		status: TxStatus;
		source: string;
	}

	let { transactions = [], loading = false } = $props<{
		transactions: Transaction[];
		loading: boolean;
	}>();

	let activeFilter: TransactionFilter = $state('All');
	let isMobile = $state(false);

	// Check if mobile on mount and resize
	$effect(() => {
		const checkMobile = () => {
			isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
		};
		checkMobile();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', checkMobile);
			return () => window.removeEventListener('resize', checkMobile);
		}
	});

	const filters: TransactionFilter[] = ['All', 'Deposit', 'Withdrawal', 'Conversion', 'Interest', 'Referral'];

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
		activeFilter === 'All'
			? transactions
			: transactions.filter((t: Transaction) => getCategory(t) === activeFilter)
	);

	const hasAnyTransactions = $derived(transactions.length > 0);
	const hasFilteredResults = $derived(filteredTransactions.length > 0);

	const getStatusColor = (status: TxStatus) => {
		switch (status) {
			case 'Success':
				return 'text-green-500 bg-green-50 dark:bg-green-900/20';
			case 'Pending':
				return 'text-[#E89E50] bg-yellow-50 dark:bg-yellow-900/20';
			case 'Failed':
				return 'text-red-500 bg-red-50 dark:bg-red-900/20';
			default:
				return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
		}
	};

	const getSourceColor = (source: string) => {
		switch (source) {
			case 'Naira':
				return 'text-[#E89E50] bg-yellow-50 dark:bg-yellow-900/20';
			case 'Crypto':
				return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
			case 'Interest':
				return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
			case 'Referral':
				return 'text-green-500 bg-green-50 dark:bg-green-900/20';
			case 'System':
				return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
			default:
				return 'text-gray-900 bg-gray-50 dark:bg-gray-800 dark:text-gray-300';
		}
	};
</script>

<div>
	<div class="flex items-center justify-between flex-wrap gap-4 mb-4">
		<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Transactions</h3>

		<!-- Filter Buttons -->
		<div class="flex items-center flex-wrap gap-2 overflow-x-auto pb-2">
			{#each filters as filter}
				<button
					onclick={() => activeFilter = filter}
					class="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer whitespace-nowrap transition-colors {activeFilter
						=== filter
						? 'bg-blue-500 text-white'
						: 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}"
				>
					{filter}
				</button>
			{/each}
		</div>
	</div>

	{#if loading}
		<div class="grid gap-3">
			{#each Array(5) as _}
				<div class="h-16 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700"></div>
			{/each}
		</div>
	{:else if !hasAnyTransactions}
		<!-- Empty State -->
		<div
			class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-10 text-center bg-gray-50 dark:bg-gray-800"
		>
			<div class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No transactions yet</div>
			<p class="text-sm text-gray-600 dark:text-gray-400 max-w-md">
				When you deposit, convert to USDT/USDC, or start a plan, your activity will appear here.
			</p>
		</div>
	{:else if !hasFilteredResults}
		<!-- Empty Filter State -->
		<div
			class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-10 text-center bg-gray-50 dark:bg-gray-800"
		>
			<div class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No "{activeFilter}" found</div>
			<p class="text-sm text-gray-600 dark:text-gray-400 max-w-md mb-4">
				Try a different filter or clear filters to see all your transactions.
			</p>
			<button
				onclick={() => activeFilter = 'All'}
				class="inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:hover:bg-blue-700 cursor-pointer"
			>
				Clear filter
			</button>
		</div>
	{:else}
		<!-- Transactions List -->
		<div class="rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
			{#if isMobile}
				<!-- Mobile View -->
				<div class="p-4 space-y-3">
					{#each filteredTransactions as transaction, index}
						<div
							class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
						>
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium text-gray-900 dark:text-white">{transaction.type}</span>
								<span class="text-sm font-medium py-1 px-2 rounded-full {getStatusColor(
									transaction.status
								)}">
									{transaction.status}
								</span>
							</div>
							<div class="flex items-center justify-between">
								<span class="text-xs text-gray-600 dark:text-gray-400">{transaction.date}</span>
								<span class="text-lg font-semibold text-gray-900 dark:text-white">{transaction.amount}</span>
							</div>
							<div class="flex items-center justify-between">
								<span class="text-xs font-medium px-2 py-1 rounded-full {getSourceColor(
									transaction.source
								)}">
									{transaction.source}
								</span>
								<ArrowRight class="w-4 h-4 text-gray-400 dark:text-gray-500" />
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<!-- Desktop Table View -->
				<div class="overflow-hidden rounded-xl">
					<table class="min-w-full">
						<thead class="bg-gray-100 dark:bg-gray-700 font-semibold">
							<tr class="border-b border-gray-200 dark:border-gray-700">
								<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
									Date
								</th>
								<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
									Type
								</th>
								<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
									Amount
								</th>
								<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
									Status
								</th>
								<th class="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
									Source
								</th>
							</tr>
						</thead>
						<tbody class="bg-white dark:bg-gray-800">
							{#each filteredTransactions as transaction, index}
								<tr
									class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
								>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
										{transaction.date}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
										{transaction.type}
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
										{transaction.amount}
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<span class="text-xs font-medium py-1 px-2 rounded-full {getStatusColor(
											transaction.status
										)}">
											{transaction.status}
										</span>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<span class="text-xs font-medium px-2 py-1 rounded-full {getSourceColor(
											transaction.source
										)}">
											{transaction.source}
										</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	{/if}

	<!-- See All Link -->
	<div class="p-4 mt-3 flex justify-center">
		<a
			href="/dashboard/transaction"
			class="font-semibold text-blue-500 cursor-pointer flex items-center gap-1 hover:text-blue-600"
		>
			See all transactions
			<ChevronRight class="w-4 h-4" />
		</a>
	</div>
</div>
