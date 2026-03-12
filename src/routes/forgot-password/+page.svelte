<script lang="ts">
	import { ArrowLeft, Mail, CheckCircle } from 'lucide-svelte';

	let email = $state('');
	let isSubmitted = $state(false);

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		console.log('Password reset requested for:', email);
		isSubmitted = true;
	};
</script>

<svelte:head>
	<title>Forgot Password - SavFi</title>
	<meta name="description" content="Reset your SavFi password" />
</svelte:head>

<div class="min-h-screen bg-background flex items-center justify-center pt-20 pb-12 px-4">
	<div class="w-full max-w-md">
		<a href="/login" class="inline-flex items-center text-foreground/80 hover:text-foreground mb-6 transition-colors">
			<ArrowLeft class="w-4 h-4 mr-2" />
			Back to Login
		</a>

		<div class="bg-card rounded-3xl shadow-lg p-8">
			{#if !isSubmitted}
				<div class="text-center mb-8">
					<div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
						<Mail class="w-8 h-8 text-blue-500" />
					</div>
					<h1 class="text-3xl font-bold text-foreground mb-2">Forgot Password?</h1>
					<p class="text-muted-foreground">
						No worries! Enter your email and we'll send you a reset link
					</p>
				</div>

				<form onsubmit={handleSubmit} class="space-y-6">
					<div>
						<label for="email" class="block text-sm font-medium text-foreground mb-2">
							Email Address
						</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							placeholder="you@example.com"
							required
							class="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
						/>
					</div>

					<button
						type="submit"
						class="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity cursor-pointer">
						Send Reset Link
					</button>
				</form>

				<div class="mt-8 text-center">
					<p class="text-foreground/80">
						Remember your password?
						<a href="/login" class="text-primary font-semibold hover:text-primary-dark transition-colors">Sign in</a>
					</p>
				</div>
			{:else}
				<div class="text-center">
					<div class="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
						<CheckCircle class="w-10 h-10 text-green-500" />
					</div>
					<h1 class="text-2xl font-bold text-foreground mb-3">Check Your Email</h1>
					<p class="text-muted-foreground mb-6">
						We've sent a password reset link to <strong>{email}</strong>
					</p>
					<p class="text-sm text-muted-foreground mb-8">
						Please check your inbox and follow the instructions to reset your password.
						The link will expire in 24 hours.
					</p>

					<div class="space-y-3">
						<button
							onclick={() => isSubmitted = false}
							class="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity cursor-pointer">
							Resend Email
						</button>
						<a href="/login">
							<button class="w-full bg-transparent border-2 border-border text-foreground py-3 rounded-xl font-semibold hover:bg-muted transition-colors cursor-pointer">
								Back to Login
							</button>
						</a>
					</div>

					<p class="text-xs text-muted-foreground mt-6">
						Didn't receive the email? Check your spam folder or
						<a href="/support" class="text-primary hover:underline">contact support</a>
					</p>
				</div>
			{/if}
		</div>

		<div class="mt-6 text-center">
			<p class="text-sm text-muted-foreground">
				Need help? <a href="/support" class="text-primary hover:underline">Contact Support</a>
			</p>
		</div>
	</div>
</div>
