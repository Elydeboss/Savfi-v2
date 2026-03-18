import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			runtime: 'nodejs20.x',
			regions: ['fra1']  // Match backend region (Frankfurt, good for Nigeria/Europe)
		})
	}
};

export default config;
