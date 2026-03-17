<script lang="ts">
	import { goto } from '$app/navigation';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { authService } from '$lib/services/auth.service';

	// Step management: 1 = registration form, 2 = OTP verification
	let currentStep = $state(1);
	let registrationEmail = $state('');

	let formData = $state({
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
		referralCode: ''
	});

	// OTP state
	let otp = $state('');
	let otpInputs = $state(['', '', '', '', '', '']);
	let isLoading = $state(false);
	let isVerifying = $state(false);
	let isResending = $state(false);
	let countdown = $state(0);
	let error = $state('');
	let success = $state(false);
	let otpError = $state('');
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);

	// Field-specific errors
	let emailError = $state('');
	let usernameError = $state('');
	let passwordError = $state('');

	const validateEmail = (email: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const validatePassword = (password: string) => {
		// Password must be at least 8 characters with uppercase, lowercase, and number
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
	};

	const handleRegistrationSubmit = async (e: Event) => {
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
			const result = await authService.register({
				email: formData.email,
				username: formData.username,
				password: formData.password,
				referralCode: formData.referralCode || undefined
			});

			// Check if OTP is required
			if ('requiresOTP' in result && result.requiresOTP) {
				registrationEmail = formData.email;
				currentStep = 2;
				// Start countdown for resend button
				countdown = 60;
				const countdownInterval = setInterval(() => {
					countdown--;
					if (countdown <= 0) {
						clearInterval(countdownInterval);
					}
				}, 1000);
			} else {
				// Registration complete (shouldn't happen with OTP)
				success = true;
				setTimeout(() => {
					goto('/dashboard');
				}, 1000);
			}
		} catch (err: any) {
			const errorMsg = err.response?.data?.error || err.message || 'An error occurred during registration';
			const field = err.response?.data?.field;

			// Check for password-related validation errors
			if (errorMsg.toLowerCase().includes('password')) {
				passwordError = errorMsg;
			} else if (field === 'email') {
				emailError = errorMsg;
			} else if (field === 'username') {
				usernameError = errorMsg;
			} else {
				error = errorMsg;
			}
		} finally {
			isLoading = false;
		}
	};

	const handleOTPSubmit = async (e: Event) => {
		e.preventDefault();
		otpError = '';
		isVerifying = true;

		try {
			const otpCode = otpInputs.join('');
			if (otpCode.length !== 6) {
				otpError = 'Please enter the complete 6-digit OTP code';
				isVerifying = false;
				return;
			}

			await authService.verifyOTP({
				email: registrationEmail,
				otp: otpCode
			});

			success = true;
			setTimeout(() => {
				goto('/dashboard');
			}, 1000);
		} catch (err: any) {
			const errorMsg = err.response?.data?.error || err.message || 'OTP verification failed';
			otpError = errorMsg;
			// Clear OTP inputs on error
			otpInputs = ['', '', '', '', '', ''];
			otp = '';
		} finally {
			isVerifying = false;
		}
	};

	const handleResendOTP = async () => {
		if (countdown > 0) return;

		isResending = true;
		otpError = '';

		try {
			await authService.resendOTP({ email: registrationEmail });

			// Reset countdown
			countdown = 60;
			const countdownInterval = setInterval(() => {
				countdown--;
				if (countdown <= 0) {
					clearInterval(countdownInterval);
				}
			}, 1000);

			error = '';
		} catch (err: any) {
			const errorMsg = err.response?.data?.error || err.message || 'Failed to resend OTP';
			error = errorMsg;
		} finally {
			isResending = false;
		}
	};

	const handleOTPInput = (index: number, value: string) => {
		// Only allow numbers
		if (!/^\d*$/.test(value)) return;

		otpInputs[index] = value;
		otp = otpInputs.join('');

		// Auto-focus next input
		if (value && index < 5) {
			const inputs = document.querySelectorAll('.otp-input');
			const nextInput = inputs[index + 1] as HTMLInputElement | undefined;
			nextInput?.focus();
		}
	};

	const handleOTPKeyDown = (index: number, e: KeyboardEvent) => {
		// Handle backspace - move to previous input
		if (e.key === 'Backspace' && !otpInputs[index] && index > 0) {
			const inputs = document.querySelectorAll('.otp-input');
			(inputs[index - 1] as HTMLInputElement)?.focus();
		}
	};

	const handlePaste = (e: ClipboardEvent) => {
		e.preventDefault();
		const pastedData = e.clipboardData?.getData('text') || '';
		const digits = pastedData.replace(/\D/g, '').slice(0, 6);

		for (let i = 0; i < digits.length; i++) {
			otpInputs[i] = digits[i];
		}

		// Focus the next empty input or the last one
		const nextEmptyIndex = otpInputs.findIndex(val => !val);
		const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
		const inputs = document.querySelectorAll('.otp-input');
		(inputs[focusIndex] as HTMLInputElement)?.focus();

		otp = otpInputs.join('');
	};

	const goBack = () => {
		currentStep = 1;
		registrationEmail = '';
		otpInputs = ['', '', '', '', '', ''];
		otp = '';
		otpError = '';
		countdown = 0;
	};

	// Clear field errors when user types
	const clearEmailError = () => { emailError = ''; };
	const clearUsernameError = () => { usernameError = ''; };
	const clearPasswordError = () => { passwordError = ''; };
	const clearOTPError = () => { otpError = ''; };

	const handleGoogleSignup = () => {
		authService.loginWithGoogle();
	};
</script>

<svelte:head>
	<title>Sign Up - SavFi</title>
	<meta name="description" content="Create your SavFi account and start earning interest on your savings" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">

	<!-- Main Content -->
	<main class="flex-1 flex items-center justify-center py-6 sm:py-8 px-4 sm:px-6">
		<div class="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
			<!-- Left: Hero Image (Hidden on mobile) -->
			<div class="hidden lg:block">
				<img
					src="/images/Frame-1.svg"
					alt="Person using SavFi app"
					class="w-full max-w-[400px] sm:max-w-[600px] h-auto object-contain rounded-2xl"
				/>
			</div>

			<!-- Right: Sign Up Form -->
			<div class="w-full max-w-md mx-auto lg:mx-0">
				<div class="text-center mb-6 sm:mb-8">
					<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mb-2">
						{currentStep === 1 ? 'Jump right in' : 'Verify Your Email'}
					</h1>
					<p class="text-base sm:text-lg text-gray-600 dark:text-gray-400">
						{currentStep === 1
							? 'Sign Up/Log in to access SavFi benefits'
							: `We've sent a 6-digit code to ${registrationEmail}`}
					</p>
				</div>

				<!-- Progress Indicator -->
				<div class="flex items-center justify-center gap-2 mb-6">
					<div class="h-1 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
						<div
							class="h-full bg-blue-500 transition-all duration-300"
							style="width: {currentStep === 1 ? '50%' : '100%'}"
						></div>
					</div>
					<div class="h-1 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
						<div
							class="h-full bg-blue-500 transition-all duration-300"
							style="width: {currentStep === 2 ? '100%' : '0%'}"
						></div>
					</div>
				</div>

				{#if error}
					<div class="mb-4 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
						<p class="text-sm text-red-600 dark:text-red-400">{error}</p>
					</div>
				{/if}

				{#if emailError}
					<div class="mb-4 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
						<p class="text-sm text-red-600 dark:text-red-400">{emailError}</p>
					</div>
				{/if}

				{#if usernameError}
					<div class="mb-4 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
						<p class="text-sm text-red-600 dark:text-red-400">{usernameError}</p>
					</div>
				{/if}

				{#if passwordError}
					<div class="mb-4 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
						<p class="text-sm text-red-600 dark:text-red-400">{passwordError}</p>
					</div>
				{/if}

				{#if otpError}
					<div class="mb-4 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
						<p class="text-sm text-red-600 dark:text-red-400">{otpError}</p>
					</div>
				{/if}

				{#if success}
					<div class="mb-4 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
						<p class="text-sm text-green-600 dark:text-green-400">
							{currentStep === 2
								? 'Email verified successfully! Redirecting to dashboard...'
								: 'Registration successful! Redirecting to dashboard...'}
						</p>
					</div>
				{/if}

				{#if currentStep === 1}
					<!-- Step 1: Registration Form -->
					<form onsubmit={handleRegistrationSubmit} class="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg space-y-4 sm:space-y-4">
						<!-- Continue with Google Button -->
						<button
							type="button"
							disabled={isLoading}
							onclick={handleGoogleSignup}
							class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
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
								type="email"
								id="email"
								bind:value={formData.email}
								oninput={clearEmailError}
								placeholder="Enter email address"
								required
								disabled={isLoading}
								class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border {emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
							/>
							{#if emailError}
								<p class="text-xs text-red-500 mt-1">{emailError}</p>
							{/if}
						</div>

						<!-- Username Input -->
						<div>
							<label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Username
							</label>
							<input
								type="text"
								id="username"
								bind:value={formData.username}
								oninput={clearUsernameError}
								placeholder="Choose a username"
								required
								disabled={isLoading}
								class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border {usernameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
							/>
							{#if usernameError}
								<p class="text-xs text-red-500 mt-1">{usernameError}</p>
							{/if}
						</div>

						<!-- Password Input -->
						<div>
							<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Password
							</label>
							<div class="relative">
								<input
									type={showPassword ? 'text' : 'password'}
									id="password"
									bind:value={formData.password}
									oninput={clearPasswordError}
									placeholder="Create a password"
									required
									disabled={isLoading}
									class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border {passwordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
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
							<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">8+ chars with uppercase, lowercase & number</p>
							{#if passwordError}
								<p class="text-xs text-red-500 mt-1">{passwordError}</p>
							{/if}
						</div>

						<!-- Confirm Password Input -->
						<div>
							<label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Confirm Password
							</label>
							<div class="relative">
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									id="confirmPassword"
									bind:value={formData.confirmPassword}
									placeholder="Confirm your password"
									required
									disabled={isLoading}
									class="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
								/>
								<button
									type="button"
									onclick={() => showConfirmPassword = !showConfirmPassword}
									disabled={isLoading}
									class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors disabled:opacity-50 cursor-pointer"
								>
									{#if showConfirmPassword}
										<EyeOff class="w-5 h-5" />
									{:else}
										<Eye class="w-5 h-5" />
									{/if}
								</button>
							</div>
						</div>

						<!-- Referral Code Input -->
						<div>
							<label for="referralCode" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Gift Code (Optional)
							</label>
							<input
								type="text"
								id="referralCode"
								bind:value={formData.referralCode}
								placeholder="Gift Code"
								disabled={isLoading}
								class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
							/>
						</div>

						<!-- Submit Button -->
						<button
							type="submit"
							disabled={isLoading}
							class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
						>
							{isLoading ? 'Creating account...' : 'Continue'}
						</button>
					</form>
				{:else}
					<!-- Step 2: OTP Verification Form -->
					<form onsubmit={handleOTPSubmit} class="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg space-y-6">
						<!-- Instructions -->
						<div class="text-center">
							<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
								Enter the 6-digit code sent to your email
							</p>
						</div>

						<!-- OTP Input Fields -->
						<div class="flex justify-center gap-2">
							{#each Array(6) as _, i}
								<input
									type="text"
									inputmode="numeric"
									maxlength="1"
									class="otp-input w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold border {otpError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
									bind:value={otpInputs[i]}
									oninput={(e) => handleOTPInput(i, (e.target as HTMLInputElement)?.value || '')}
									onkeydown={(e) => handleOTPKeyDown(i, e)}
									onpaste={handlePaste}
									disabled={isVerifying}
								/>
							{/each}
						</div>

						<!-- Verify Button -->
						<button
							type="submit"
							disabled={isVerifying || otpInputs.join('').length !== 6}
							class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
						>
							{isVerifying ? 'Verifying...' : 'Verify & Create Account'}
						</button>

						<!-- Resend OTP -->
						<div class="text-center">
							<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
								Didn't receive the code?
							</p>
							<button
								type="button"
								onclick={handleResendOTP}
								disabled={countdown > 0 || isResending}
								class="text-blue-500 hover:text-blue-600 font-medium text-sm disabled:text-gray-400 disabled:cursor-not-allowed"
							>
								{isResending
									? 'Sending...'
									: countdown > 0
										? `Resend in ${countdown}s`
										: 'Resend Code'}
							</button>
						</div>

						<!-- Back Button -->
						<div class="text-center">
							<button
								type="button"
								onclick={goBack}
								class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
							>
								← Back to registration
							</button>
						</div>
					</form>
				{/if}

				<!-- Terms -->
				<p class="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-4 sm:mt-6">
					By signing up, you agree to our
					<a href="/terms-of-service" class="text-blue-500 hover:underline">Terms of Service</a>
					and
					<a href="/privacy-policy" class="text-blue-500 hover:underline">Privacy Policy</a>
				</p>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<footer class="bg-white dark:bg-gray-800 py-4 px-4 sm:px-6 border-t border-gray-200 dark:border-gray-700">
		<div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 gap-2 sm:gap-0">
			<p>© 2025 SavFi</p>
			<div class="flex gap-4 sm:gap-6">
				<a href="/privacy-policy" class="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Privacy policy</a>
				<a href="/terms-of-service" class="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Terms of Service</a>
			</div>
		</div>
	</footer>
</div>
