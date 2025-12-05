<script lang="ts">
	import { onMount } from 'svelte';
	let mounted = $state(false);
	onMount(() => mounted = true);
</script>

<svelte:head>
	<title>Privacy Policy | ReseraLabs</title>
	<meta name="description" content="ReseraLabs Privacy Policy" />
</svelte:head>

<div class="min-h-screen py-20 px-6">
	<div 
		class="max-w-3xl mx-auto transition-all duration-700 ease-out"
		class:opacity-0={!mounted}
		class:translate-y-4={!mounted}
		class:opacity-100={mounted}
		class:translate-y-0={mounted}
	>
		<a href="/" class="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Back
		</a>

		<h1 class="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
		
		<div class="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-300">
			<p class="text-sm text-zinc-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

			<h2 class="text-xl font-semibold text-white mt-8">1. Information We Collect</h2>
			<p>When you sign up for updates, we collect:</p>
			<ul class="list-disc list-inside space-y-1 text-zinc-400">
				<li>Email address</li>
				<li>Industry/sector information</li>
			</ul>

			<h2 class="text-xl font-semibold text-white mt-8">2. How We Use Your Information</h2>
			<p>We use your information to:</p>
			<ul class="list-disc list-inside space-y-1 text-zinc-400">
				<li>Send product updates and announcements</li>
				<li>Provide relevant content based on your industry</li>
				<li>Improve our services</li>
			</ul>

			<h2 class="text-xl font-semibold text-white mt-8">3. Data Storage</h2>
			<p>Your data is stored securely with our email service provider, EmailOctopus. We do not sell or share your personal information with third parties for marketing purposes.</p>

			<h2 class="text-xl font-semibold text-white mt-8">4. Your Rights</h2>
			<p>You can:</p>
			<ul class="list-disc list-inside space-y-1 text-zinc-400">
				<li>Unsubscribe from emails at any time</li>
				<li>Request deletion of your data</li>
				<li>Request a copy of your data</li>
			</ul>

			<h2 class="text-xl font-semibold text-white mt-8">5. Contact</h2>
			<p>For privacy-related inquiries, contact us at <a href="mailto:josh.budinger@reseralabs.com" class="text-indigo-400 hover:text-indigo-300">josh.budinger@reseralabs.com</a></p>
		</div>
	</div>
</div>
