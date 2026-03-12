<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/auth.service';

	let formData = $state({
		email: '',
		password: '',
		rememberMe: false
	});

	let isLoading = $state(false);
	let error = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		isLoading = true;

		try {
			await authService.login({
				email: formData.email,
				password: formData.password
			});

			// Redirect to dashboard
			await goto('/dashboard');
		} catch (err: any) {
			error = err.response?.data?.error || err.message || 'An error occurred during login';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Login - SavFi</title>
	<meta name="description" content="Sign in to your SavFi account to manage your savings" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
	<div class="w-full max-w-md">
		<a href="/" class="inline-flex items-center text-foreground/80 hover:text-foreground mb-6 transition-colors">
			<ArrowLeft class="w-4 h-4 mr-2" />
			Back to Home
		</a>

		<div class="bg-card rounded-3xl shadow-lg p-8">
			<div class="text-center mb-8">
				<h1 class="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
				<p class="text-muted-foreground">Sign in to your SavFi account</p>
			</div>

			{#if error}
				<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
					<p class="text-sm text-red-600">{error}</p>
				</div>
			{/if}

			<form onsubmit={handleSubmit} class="space-y-6">
				<div>
					<label for="email" class="block text-sm font-medium text-foreground mb-2">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						bind:value={formData.email}
						placeholder="you@example.com"
						required
						disabled={isLoading}
						class="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-foreground mb-2">
						Password
					</label>
					<input
						id="password"
						type="password"
						bind:value={formData.password}
						placeholder="••••••••"
						required
						disabled={isLoading}
						class="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
					/>
				</div>

				<div class="flex items-center justify-between">
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={formData.rememberMe}
							disabled={isLoading}
							class="w-4 h-4 rounded border-border text-primary focus:ring-primary disabled:opacity-50"
						/>
						<span class="ml-2 text-sm text-foreground/80">Remember me</span>
					</label>
					<a href="/forgot-password" class="text-sm text-primary hover:text-primary-dark transition-colors">
						Forgot password?
					</a>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					class="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
					{isLoading ? 'Signing in...' : 'Sign In'}
				</button>
			</form>

			<div class="mt-8 text-center">
				<p class="text-foreground/80">
					Don't have an account?
					<a href="/signup" class="text-primary font-semibold hover:text-primary-dark transition-colors">Sign up</a>
				</p>
			</div>
		</div>
	</div>
</div>
