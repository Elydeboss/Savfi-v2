<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth.store';
	import { authService } from '$lib/services/auth.service';
	import { Loader2 } from 'lucide-svelte';

	let error = $state('');

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');
		const provider = urlParams.get('provider');
		const errorParam = urlParams.get('error');

		if (errorParam) {
			error = errorParam;
			// Redirect to login after showing error
			setTimeout(() => {
				goto(`/login?error=${errorParam}`);
			}, 2000);
			return;
		}

		if (token) {
			// Store the token
			authService.handleOAuthCallback(token);

			try {
				// Fetch user data
				const { user } = await authService.getCurrentUser();

				// Manually set the auth state for OAuth
				authStore.setToken(token);
				authStore.setUser(user as any);

				// Redirect to dashboard
				goto('/dashboard');
			} catch (err) {
				console.error('Failed to fetch user data:', err);
				error = 'Failed to fetch user data';
				setTimeout(() => goto('/login?error=fetch_user_failed'), 2000);
			}
		} else {
			error = 'No token received';
			setTimeout(() => goto('/login?error=no_token'), 2000);
		}
	});
</script>

<div class="min-h-screen bg-background flex items-center justify-center">
	<div class="text-center">
		{#if error}
			<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md mx-auto">
				<svg
					class="w-16 h-16 text-red-500 mx-auto mb-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
				<h2 class="text-xl font-semibold text-red-900 dark:text-red-100 mb-2">
					Authentication Failed
				</h2>
				<p class="text-red-700 dark:text-red-300 mb-4">{error}</p>
				<p class="text-sm text-red-600 dark:text-red-400">
					Redirecting to login page...
				</p>
			</div>
		{:else}
			<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 max-w-md mx-auto">
				<Loader2 class="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
				<h2 class="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
					Signing you in...
				</h2>
				<p class="text-blue-700 dark:text-blue-300">
					Please wait while we complete your authentication.
				</p>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(body) {
		background-color: #f5f5f5;
	}
	:global([data-theme='dark'] body) {
		background-color: #0f1419;
	}
</style>
