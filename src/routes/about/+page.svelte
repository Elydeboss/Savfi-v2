<script lang="ts">

	// Data for "What defines us" section
	const values = [
		{
			title: 'Customer First',
			desc: 'Our customers are the heart of everything we do. We build products that solve their real-world problems and prioritize their financial well-being above all else.',
			img: '/images/about/value-1.jpg'
		},
		{
			title: 'Better Together',
			desc: 'We believe in the power of collaboration. By working together with our users and partners, we create a stronger financial ecosystem for everyone.',
			img: '/images/about/value-2.jpg'
		},
		{
			title: 'Transparency Always',
			desc: 'We operate with complete openness. No hidden fees, no complex jargon—just clear, honest financial services you can understand.',
			img: '/images/about/value-3.jpg'
		},
		{
			title: 'Security You Can Trust',
			desc: 'Your asset security is our top priority. We employ bank-grade security measures and cutting-edge technology to keep your funds safe.',
			img: '/images/about/value-4.jpg'
		},
		{
			title: 'Innovation That Never Stops',
			desc: 'The financial world is evolving, and so are we. We constantly innovate to bring you the best tools for wealth management in the digital age.',
			img: '/images/about/value-5.jpg'
		}
	];

	// Data for Team section
	const team = [
		{ name: 'Elijah Tom', role: 'Founder / frontend dev', img: '/images/about/team-1.png' },
		{ name: 'Kelly Mbaga', role: 'Product Manager', img: '/images/about/team-2.png' },
		{ name: 'Solomon Odunayo', role: 'Engineering Lead', img: '/images/about/team-3.png' },
		{ name: 'Abolaji Oladokun', role: 'Legal & Compliance', img: '/images/about/team-4.png' },
		{ name: 'Bianca Onwa', role: 'Growth & Marketing', img: '/images/about/team-5.png' },
		{ name: 'Chima Umeji', role: 'Product Design', img: '/images/about/team-6.png' },
		{ name: 'Isaac Asuquo', role: 'Backend Engineer', img: '/images/about/team-7.png' },
		{ name: 'Abas Nwachukwu', role: 'Frontend Engineer', img: '/images/about/team-8.png' }
	];
</script>

<svelte:head>
	<title>About Us - SavFi</title>
	<meta name="description" content="Learn about SavFi - Nigeria's modern savings platform powered by blockchain technology" />
</svelte:head>

<div class="min-h-screen bg-white font-sans">
	<!-- Hero Section -->
	<header class="px-6 py-12 md:py-20 max-w-7xl mx-auto text-center">
		<h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-500 leading-tight mb-8 max-w-4xl mx-auto">
			Reinventing wealth management for Africans with stablecoins.
		</h1>
		<p class="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-16">
			We are building a financial ecosystem that empowers individuals to
			grow their wealth through secure, automated, and high-yield savings
			opportunities.
		</p>

		<!-- Image Grid - Stack/Tall/Stack/Tall Pattern -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:h-[600px] mb-20 mt-20">
			<!-- Column 1: Stacked Images -->
			<div class="flex flex-col gap-4 h-full">
				<div class="h-48 md:h-auto md:flex-1 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-blue-200">
					<img
						src="/images/about/grid-1.jpg"
						alt="Team working"
						class="w-full h-full object-cover hover:scale-105 transition duration-500"
					/>
				</div>
				<div class="h-48 md:h-auto md:flex-1 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-blue-200">
					<img
						src="/images/about/grid-2.jpg"
						alt="Professional woman"
						class="w-full h-full object-cover hover:scale-105 transition duration-500"
					/>
				</div>
			</div>

			<!-- Column 2: Tall Image -->
			<div class="rounded-2xl overflow-hidden shadow-lg h-full bg-gradient-to-br from-blue-200 to-blue-300">
				<img
					src="/images/about/grid-3.jpg"
					alt="Modern Office"
					class="w-full h-full object-cover hover:scale-105 transition duration-500"
				/>
			</div>

			<!-- Column 3: Stacked Images -->
			<div class="flex flex-col gap-4 h-full">
				<div class="h-48 md:h-auto md:flex-1 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-blue-200">
					<img
						src="/images/about/grid-4.jpg"
						alt="Meeting"
						class="w-full h-full object-cover hover:scale-105 transition duration-500"
					/>
				</div>
				<div class="h-48 md:h-auto md:flex-1 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-blue-200">
					<img
						src="/images/about/grid-5.jpg"
						alt="Office discussion"
						class="w-full h-full object-cover hover:scale-105 transition duration-500"
					/>
				</div>
			</div>

			<!-- Column 4: Tall Image -->
			<div class="rounded-2xl overflow-hidden shadow-lg h-full bg-gradient-to-br from-blue-200 to-blue-300">
				<img
					src="/images/about/grid-6.jpg"
					alt="Handshake"
					class="w-full h-full object-cover hover:scale-105 transition duration-500"
				/>
			</div>
		</div>
	</header>

	<!-- About Us Text -->
	<section class="py-16 px-6 max-w-4xl mx-auto text-center">
		<h2 class="text-3xl md:text-4xl font-bold text-blue-500 mb-8">About us.</h2>
		<div class="space-y-6 text-gray-600 text-lg leading-relaxed">
			<p>
				We are on a mission to bring financial freedom to everyone. By
				leveraging the power of stablecoins and decentralized finance, we
				provide tools that were previously accessible only to the wealthy.
			</p>
			<p>
				Our platform is designed to be simple, secure, and transparent,
				ensuring that you can focus on what matters most—living your
				life—while your money works for you.
			</p>
		</div>
	</section>

	<!-- What defines us (Values) -->
	<section class="py-20 px-6 bg-blue-50/50">
		<div class="max-w-7xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-center text-blue-500 mb-16">
				What defines us.
			</h2>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-36">
				{#each values as val}
					<div class="bg-blue-50 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col group">
						<div class="h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
							<img
								src={val.img}
								alt={val.title}
								class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
							/>
						</div>
						<div class="p-8">
							<h3 class="text-xl font-bold text-blue-500 mb-3">{val.title}</h3>
							<p class="text-gray-600 text-sm leading-relaxed">{val.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Team Section -->
	<section class="py-20 px-6 max-w-4xl mx-auto">
		<h2 class="text-3xl md:text-6xl font-bold text-center text-blue-500 mb-16">
			The right talents, the perfect team.
		</h2>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 justify-items-center">
			{#each team as member}
				<div class="flex flex-col items-center text-center w-full max-w-xs">
					<!-- Circle Image Container with Gradient Border Effect -->
					<div class="relative p-1 rounded-full bg-gradient-to-tr from-blue-400 to-blue-200 mb-6">
						<div class="p-1 bg-white rounded-full">
							<img
								src={member.img}
								alt={member.name}
								class="w-32 h-32 rounded-full object-cover transition duration-300 bg-gradient-to-br from-blue-100 to-blue-200"
							/>
						</div>
					</div>

					<h3 class="text-xl font-bold text-blue-600">{member.name}</h3>
					<p class="text-gray-500 text-sm mt-1">{member.role}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Newsletter Section -->
	<section class="bg-blue-500 py-12 px-6">
		<div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
			<h3 class="text-2xl font-bold text-white max-w-xs text-center md:text-left">
				Subscribe to our newsletter today.
			</h3>
			<div class="flex w-full md:w-auto bg-white/20 p-2 rounded-full backdrop-blur-sm">
				<input
					type="email"
					placeholder="Email Address"
					class="bg-transparent border-none text-white placeholder-blue-100 px-4 py-2 outline-none flex-grow w-full md:w-64"
				/>
				<button
					class="bg-white text-blue-500 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition cursor-pointer">
					Join
				</button>
			</div>
		</div>
	</section>
</div>
