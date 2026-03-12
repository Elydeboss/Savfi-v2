<script lang="ts">
	import { User, Mail, Phone, ShieldCheck, Camera, Edit, Lock, Bell, CreditCard } from 'lucide-svelte';

	let isEditing = $state(false);
	let showToast = $state(false);

	let userProfile = $state({
		firstName: 'John',
		lastName: 'Doe',
		email: 'john.doe@example.com',
		phone: '+234 812 345 6789',
		username: 'johndoe',
		dateOfBirth: '1990-01-01',
		address: '123 Main Street, Lagos, Nigeria',
		nin: '12345678901',
		bvn: '12345678901',
		kycVerified: false,
		kycLevel: 'Not Verified'
	});

	const kycLevels = [
		{ level: 1, name: 'Basic', requirements: 'Email verification', status: 'completed' },
		{ level: 2, name: 'Intermediate', requirements: 'Phone verification', status: 'completed' },
		{ level: 3, name: 'Advanced', requirements: 'NIN verification', status: 'pending' }
	];

	const handleEdit = () => {
		isEditing = true;
	};

	const handleSave = () => {
		isEditing = false;
		showToast = true;
		setTimeout(() => (showToast = false), 3000);
	};

	const handleCancel = () => {
		isEditing = false;
	};
</script>

<svelte:head>
	<title>Profile - SavFi</title>
	<meta name="description" content="Manage your profile settings" />
</svelte:head>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="mb-6">
		<h2 class="text-2xl font-semibold text-gray-900 mb-2">Profile</h2>
		<p class="text-gray-600">Manage your account information</p>
	</div>

	<!-- KYC Banner -->
	{#if !userProfile.kycVerified}
		<div class="mb-6 p-4 bg-[#FFF7EE] border border-[#FFAE58] rounded-xl flex items-center justify-between">
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-full bg-[#ffead4] flex items-center justify-center">
					<ShieldCheck class="w-5 h-5 text-[#FFAE58]" />
				</div>
				<div>
					<p class="text-sm font-semibold text-gray-700">Complete your KYC</p>
					<p class="text-xs text-gray-600">Verify your identity to unlock full access</p>
				</div>
			</div>
			<button
				class="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
			>
				Start Verification
			</button>
		</div>
	{/if}

	<!-- Profile Card -->
	<div class="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
		<div class="flex items-start justify-between mb-6">
			<div class="flex items-center gap-4">
				<div class="relative">
					<div
						class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold"
					>
						{userProfile.firstName[0]}{userProfile.lastName[0]}
					</div>
					<button
						class="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 cursor-pointer"
					>
						<Camera class="w-4 h-4 text-gray-600" />
					</button>
				</div>
				<div>
					<h3 class="text-xl font-bold text-gray-900">
						{userProfile.firstName} {userProfile.lastName}
					</h3>
					<p class="text-gray-600">@{userProfile.username}</p>
					<span
						class="inline-block mt-1 text-xs font-medium px-2 py-1 rounded-full {userProfile.kycVerified
							? 'bg-green-100 text-green-700'
							: 'bg-yellow-100 text-yellow-700'}"
					>
						{userProfile.kycVerified ? 'Verified' : 'Unverified'}
					</span>
				</div>
			</div>

			{#if !isEditing}
				<button
					onclick={handleEdit}
					class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
				>
					<Edit class="w-4 h-4" />
					<span class="text-sm font-medium">Edit</span>
				</button>
			{/if}
		</div>

		<div class="grid md:grid-cols-2 gap-6">
			{#if isEditing}
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
					<input
						type="text"
						bind:value={userProfile.firstName}
						class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
					<input
						type="text"
						bind:value={userProfile.lastName}
						class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			{:else}
				<div>
					<p class="text-xs text-gray-600 mb-1">First Name</p>
					<p class="text-gray-900 font-medium">{userProfile.firstName}</p>
				</div>
				<div>
					<p class="text-xs text-gray-600 mb-1">Last Name</p>
					<p class="text-gray-900 font-medium">{userProfile.lastName}</p>
				</div>
			{/if}
		</div>

		<div class="mt-6 space-y-4">
			<div class="flex items-center gap-3">
				<Mail class="w-5 h-5 text-gray-400" />
				{#if isEditing}
					<input
						type="email"
						bind:value={userProfile.email}
						class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				{:else}
					<div>
						<p class="text-xs text-gray-600 mb-1">Email Address</p>
						<p class="text-gray-900">{userProfile.email}</p>
					</div>
				{/if}
			</div>

			<div class="flex items-center gap-3">
				<Phone class="w-5 h-5 text-gray-400" />
				{#if isEditing}
					<input
						type="tel"
						bind:value={userProfile.phone}
						class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				{:else}
					<div>
						<p class="text-xs text-gray-600 mb-1">Phone Number</p>
						<p class="text-gray-900">{userProfile.phone}</p>
					</div>
				{/if}
			</div>
		</div>

		{#if isEditing}
			<div class="mt-6 flex gap-3">
				<button
					onclick={handleSave}
					class="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
				>
					Save Changes
				</button>
				<button
					onclick={handleCancel}
					class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
				>
					Cancel
				</button>
			</div>
		{/if}
	</div>

	<!-- KYC Progress -->
	<div class="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
		<h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
			<ShieldCheck class="w-5 h-5 text-blue-500" />
			KYC Verification
		</h3>

		<div class="space-y-4">
			{#each kycLevels as kyc}
				<div
					class="flex items-center gap-4 p-4 rounded-xl {kyc.status ===
						'completed'
						? 'bg-green-50'
						: 'bg-gray-50'}"
				>
					<div
						class="w-10 h-10 rounded-full flex items-center justify-center {kyc.status ===
							'completed'
							? 'bg-green-500'
							: 'bg-gray-300'}"
					>
						<span class="text-white font-bold">{kyc.level}</span>
					</div>
					<div class="flex-1">
						<p class="font-medium text-gray-900">{kyc.name}</p>
						<p class="text-sm text-gray-600">{kyc.requirements}</p>
					</div>
					<span
						class="text-xs font-medium px-3 py-1 rounded-full {kyc.status ===
							'completed'
							? 'bg-green-100 text-green-700'
							: 'bg-yellow-100 text-yellow-700'}"
					>
						{kyc.status}
					</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Quick Actions -->
	<div class="grid md:grid-cols-3 gap-4">
		<a
			href="#"
			class="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
		>
			<Lock class="w-8 h-8 text-blue-500 mb-3" />
			<h4 class="font-semibold text-gray-900 mb-1">Change Password</h4>
			<p class="text-sm text-gray-600">Update your password</p>
		</a>

		<a
			href="#"
			class="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
		>
			<Bell class="w-8 h-8 text-blue-500 mb-3" />
			<h4 class="font-semibold text-gray-900 mb-1">Notifications</h4>
			<p class="text-sm text-gray-600">Manage notification preferences</p>
		</a>

		<a
			href="#"
			class="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
		>
			<CreditCard class="w-8 h-8 text-blue-500 mb-3" />
			<h4 class="font-semibold text-gray-900 mb-1">Payment Methods</h4>
			<p class="text-sm text-gray-600">Manage payment options</p>
		</a>
	</div>
</div>

<!-- Toast -->
{#if showToast}
	<div class="fixed bottom-4 right-4 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg z-50 animate-fade-in">
		Profile updated successfully!
	</div>
{/if}
