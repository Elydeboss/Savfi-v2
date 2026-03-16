<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowLeft, Eye, EyeOff } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { authService } from '$lib/services/auth.service';

	let formData = $state({
		email: '',
		password: '',
		rememberMe: false
	});

	let isLoading = $state(false);
	let error = $state('');
	let redirectUrl = $state('/dashboard');
	let showPassword = $state(false);

	onMount(() => {
		// Get redirect parameter from URL query string
		const params = new URLSearchParams($page.url.search);
		const redirect = params.get('redirect');
		if (redirect) {
			redirectUrl = redirect;
		}
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		isLoading = true;

		try {
			await authService.login({
				email: formData.email,
				password: formData.password
			});

			// Redirect to the original destination or dashboard
			await goto(redirectUrl);
		} catch (err: any) {
			error = err.response?.data?.error || err.message || 'An error occurred during login';
		} finally {
			isLoading = false;
		}
	}

	function handleGoogleLogin() {
		authService.loginWithGoogle();
	}
</script>

<svelte:head>
	<title>Login - SavFi</title>
	<meta name="description" content="Sign in to your SavFi account to manage your savings" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6">
	<div class="w-full max-w-md">
		<!-- Back to Home -->
		<a href="/" class="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
			<ArrowLeft class="w-4 h-4 mr-2" />
			<span class="text-sm">Back to Home</span>
		</a>

		<!-- Login Card -->
		<div class="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8">
			<!-- Header -->
			<div class="text-center mb-6 sm:mb-8">
				<h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
					Welcome Back
				</h1>
				<p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
					Sign in to your SavFi account
				</p>
			</div>

			<!-- Error Message -->
			{#if error}
				<div class="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
					<p class="text-sm text-red-600 dark:text-red-400">{error}</p>
				</div>
			{/if}

			<!-- Login Form -->
			<form onsubmit={handleSubmit} class="space-y-4 sm:space-y-5">
				<!-- Continue with Google Button -->
				<button
					type="button"
					disabled={isLoading}
					onclick={handleGoogleLogin}
					class="w-full bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2.5 sm:py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm hover:shadow-md"
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24">
						<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
						<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
						<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
						<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
					</svg>
					Continue with Google
				</button>

				<!-- Divider -->
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
					</div>
					<div class="relative flex justify-center text-sm">
						<span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">or</span>
					</div>
				</div>

				<!-- Email Input -->
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						bind:value={formData.email}
						placeholder="you@example.com"
						required
						disabled={isLoading}
						autocomplete="email"
						class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 text-sm"
					/>
				</div>

				<!-- Password Input -->
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Password
					</label>
					<div class="relative">
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							bind:value={formData.password}
							placeholder="••••••••"
							required
							disabled={isLoading}
							autocomplete="current-password"
							class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 text-sm"
						/>
						<button
							type="button"
							onclick={() => showPassword = !showPassword}
							disabled={isLoading}
							class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors disabled:opacity-50 cursor-pointer"
						>
							{#if showPassword}
								<EyeOff class="w-5 h-5" />
							{:else}
								<Eye class="w-5 h-5" />
							{/if}
						</button>
					</div>
				</div>

				<!-- Remember Me & Forgot Password -->
				<div class="flex items-center justify-between">
					<label class="flex items-center cursor-pointer">
						<input
							type="checkbox"
							bind:checked={formData.rememberMe}
							disabled={isLoading}
							class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500 disabled:opacity-50"
						/>
						<span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
					</label>
					<a href="/forgot-password" class="text-sm text-blue-500 hover:text-blue-600 transition-colors">
						Forgot password?
					</a>
				</div>

				<!-- Sign In Button -->
				<button
					type="submit"
					disabled={isLoading}
					class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
				>
					{#if isLoading}
						<span class="flex items-center justify-center gap-2">
							<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
							Signing in...
						</span>
					{:else}
						Sign In
					{/if}
				</button>
			</form>

			<!-- Sign Up Link -->
			<div class="mt-6 sm:mt-8 text-center">
				<p class="text-sm text-gray-600 dark:text-gray-400">
					Don't have an account?
					<a href="/signup" class="text-blue-500 font-semibold hover:text-blue-600 transition-colors">Sign up</a>
				</p>
			</div>
		</div>
	</div>
</div>
