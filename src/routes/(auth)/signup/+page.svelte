<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/auth.service';

	// Type declaration for window.ethereum
declare global {
	interface Window {
		ethereum?: {
			request: (args: { method: string }) => Promise<string[]>;
		};
	}
}

	let formData = $state({
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
		referralCode: ''
	});

	let isLoading = $state(false);
	let error = $state('');
	let success = $state(false);

	const validateEmail = (email: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const validatePassword = (password: string) => {
		// Password must be at least 8 characters with uppercase, lowercase, and number
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		error = '';
		success = false;

		// Validate email
		if (!validateEmail(formData.email)) {
			error = 'Please enter a valid email address';
			return;
		}

		// Validate username
		if (formData.username.length < 3) {
			error = 'Username must be at least 3 characters';
			return;
		}

		// Validate password
		if (!validatePassword(formData.password)) {
			error = 'Password must be at least 8 characters with uppercase, lowercase, and number';
			return;
		}

		// Validate confirm password
		if (formData.password !== formData.confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		isLoading = true;

		try {
			await authService.register({
				email: formData.email,
				username: formData.username,
				password: formData.password,
				referralCode: formData.referralCode || undefined
			});

			success = true;

			// Redirect to dashboard after a short delay
			setTimeout(() => {
				goto('/dashboard');
			}, 1000);
		} catch (err: any) {
			error = err.response?.data?.error || err.message || 'An error occurred during registration';
		} finally {
			isLoading = false;
		}
	};

	const handleGoogleSignup = () => {
		console.log('Google signup clicked');
		// TODO: Implement Google OAuth flow
		// This would typically redirect to your backend's OAuth endpoint
		window.location.href = '/api/auth/google';
	};

	const handleMetamaskSignup = async () => {
		console.log('Metamask signup clicked');
		// TODO: Implement Metamask wallet connection
		if (typeof window.ethereum !== 'undefined') {
			try {
				const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
				console.log('Connected account:', accounts[0]);
				// Handle wallet connection
			} catch (error) {
				console.error('User rejected connection', error);
			}
		} else {
			alert('Please install MetaMask to use this feature');
		}
	};
</script>

<svelte:head>
	<title>Sign Up - SavFi</title>
	<meta name="description" content="Create your SavFi account and start earning interest on your savings" />
</svelte:head>

<div class="min-h-screen bg-[#F8F9FA] flex flex-col">

	<!-- Main Content -->
	<main class="flex-1 flex items-center justify-center py-8 px-6">
		<div class="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
			<!-- Left: Hero Image -->
			<div class="hidden md:block">
				<img
					src="/images/Frame-1.svg"
					alt="Person using SavFi app"
					class="w-[700px] max-h-[500px] object-contain rounded-2xl"
				/>
			</div>

			<!-- Right: Sign Up Form -->
			<div class="w-full max-w-md">
				<h1 class="text-4xl font-bold text-[#007BFF] mb-2">Jump right in</h1>
				<p class="text-lg text-[#6C757D] mb-8">Sign Up/Log in to access SavFi benefits</p>

				{#if error}
					<div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
						<p class="text-sm text-red-600">{error}</p>
					</div>
				{/if}

				{#if success}
					<div class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
						<p class="text-sm text-green-600">Registration successful! Redirecting to dashboard...</p>
					</div>
				{/if}

				<form onsubmit={handleSubmit} class="bg-[#F8F9FA] rounded-2xl p-6 space-y-4">
					<!-- Continue with Google Button -->
					<button
						type="button"
						disabled={isLoading}
						onclick={handleGoogleSignup}
						class="w-full bg-[#007BFF] text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-[#0056B3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
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
							<div class="w-full border-t border-gray-300"></div>
						</div>
						<div class="relative flex justify-center text-sm">
							<span class="px-2 bg-[#F8F9FA] text-[#6C757D]">or</span>
						</div>
					</div>

					<!-- Email Input -->
					<div>
						<label for="email" class="block text-sm font-medium text-[#212529] mb-2">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							placeholder="Enter email address"
							required
							disabled={isLoading}
							class="w-full px-4 py-3 border border-[#DEE2E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent disabled:opacity-50"
						/>
					</div>

					<!-- Username Input -->
					<div>
						<label for="username" class="block text-sm font-medium text-[#212529] mb-2">
							Username
						</label>
						<input
							type="text"
							id="username"
							bind:value={formData.username}
							placeholder="Choose a username"
							required
							disabled={isLoading}
							class="w-full px-4 py-3 border border-[#DEE2E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent disabled:opacity-50"
						/>
					</div>

					<!-- Password Input -->
					<div>
						<label for="password" class="block text-sm font-medium text-[#212529] mb-2">
							Password
						</label>
						<input
							type="password"
							id="password"
							bind:value={formData.password}
							placeholder="Create a password"
							required
							disabled={isLoading}
							class="w-full px-4 py-3 border border-[#DEE2E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent disabled:opacity-50"
						/>
						<p class="text-xs text-[#6C757D] mt-1">Must be at least 8 characters with uppercase, lowercase, and number</p>
					</div>

					<!-- Confirm Password Input -->
					<div>
						<label for="confirmPassword" class="block text-sm font-medium text-[#212529] mb-2">
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							bind:value={formData.confirmPassword}
							placeholder="Confirm your password"
							required
							disabled={isLoading}
							class="w-full px-4 py-3 border border-[#DEE2E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent disabled:opacity-50"
						/>
					</div>

					<!-- Referral Code Input -->
					<div>
						<label for="referralCode" class="block text-sm font-medium text-[#212529] mb-2">
							Gift Code (Optional)
						</label>
						<input
							type="text"
							id="referralCode"
							bind:value={formData.referralCode}
							placeholder="Gift Code"
							disabled={isLoading}
							class="w-full px-4 py-3 border border-[#DEE2E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent disabled:opacity-50"
						/>
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						disabled={isLoading}
						class="w-full bg-[#007BFF] text-white py-3 px-4 rounded-lg font-bold hover:bg-[#0056B3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
						{isLoading ? 'Creating account...' : 'Sign Up'}
					</button>

					<!-- Continue with Metamask Button -->
					<button
						type="button"
						disabled={isLoading}
						onclick={handleMetamaskSignup}
						class="w-full bg-white text-[#007BFF] py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-3 border-2 border-[#007BFF] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
						<!-- Metamask Icon (Orange Fox) -->
						<svg class="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M36.5 19.5C36.5 28.6 29.1 36 20 36C10.9 36 3.5 28.6 3.5 19.5C3.5 10.4 10.9 3 20 3C29.1 3 36.5 10.4 36.5 19.5Z" fill="#E2761B" stroke="#E2761B"/>
							<path d="M20 10L24 15L27 13L20 10Z" fill="#E4761B"/>
							<path d="M16 15L20 10L13 13L16 15Z" fill="#E4761B"/>
							<path d="M27 13L24 15L27 20L27 13Z" fill="#E4761B"/>
							<path d="M13 13L13 20L16 15L13 13Z" fill="#E4761B"/>
							<path d="M16 15L20 18L24 15L20 10L16 15Z" fill="#E4761B"/>
							<path d="M24 15L20 18L16 15L13 13L13 20L16 22L20 25L24 22L27 20L24 15Z" fill="#E4761B"/>
							<path d="M20 18L24 22L27 20L24 15L20 18Z" fill="#D7C1B3"/>
							<path d="M16 15L20 18L16 22L13 20L16 15Z" fill="#D7C1B3"/>
							<path d="M24 22L27 28L24 25L20 25L20 28L24 22Z" fill="#C6AD8F"/>
							<path d="M16 22L20 28L20 25L16 25L13 28L16 22Z" fill="#C6AD8F"/>
							<path d="M24 22L20 18L24 15L27 20L24 22Z" fill="#233447"/>
							<path d="M16 22L13 20L16 15L20 18L16 22Z" fill="#233447"/>
						</svg>
						Continue with Metamask
					</button>
				</form>

				<!-- Terms -->
				<p class="text-center text-sm text-[#6C757D] mt-6">
					By signing up, you agree to our
					<a href="/terms-of-service" class="text-[#007BFF] hover:underline">Terms of Service</a>
					and
					<a href="/privacy-policy" class="text-[#007BFF] hover:underline">Privacy Policy</a>
				</p>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<footer class="bg-white py-4 px-6 border-t border-gray-200">
		<div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-[#6C757D]">
			<p>© 2025 SavFi</p>
			<div class="flex gap-6">
				<a href="/privacy-policy" class="hover:text-[#343A40] transition-colors">Privacy policy</a>
				<a href="/terms-of-service" class="hover:text-[#343A40] transition-colors">Terms of Service</a>
			</div>
		</div>
	</footer>
</div>
