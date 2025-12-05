<script lang="ts">
	import { onMount } from 'svelte';
	let mounted = $state(false);
	onMount(() => mounted = true);
</script>

<svelte:head>
	<title>Terms of Service | ReseraLabs</title>
	<meta name="description" content="ReseraLabs Terms of Service" />
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

		<h1 class="text-4xl font-bold text-white mb-8">Terms of Service</h1>
		
		<div class="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-300">
			<p class="text-sm text-zinc-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

			<h2 class="text-xl font-semibold text-white mt-8">1. Acceptance of Terms</h2>
			<p>By accessing or using the ReseraLabs website, you agree to be bound by these Terms of Service.</p>

			<h2 class="text-xl font-semibold text-white mt-8">2. Use of Service</h2>
			<p>You agree to use this website only for lawful purposes. You may not use this site in any way that could damage, disable, or impair the service.</p>

			<h2 class="text-xl font-semibold text-white mt-8">3. Intellectual Property</h2>
			<p>All content on this website, including text, graphics, logos, and software, is the property of ReseraLabs and is protected by intellectual property laws.</p>

			<h2 class="text-xl font-semibold text-white mt-8">4. Newsletter Subscription</h2>
			<p>By subscribing to our newsletter, you consent to receive emails from ReseraLabs. You may unsubscribe at any time using the link provided in each email.</p>

			<h2 class="text-xl font-semibold text-white mt-8">5. Disclaimer</h2>
			<p>This website and its content are provided "as is" without warranties of any kind. ReseraLabs does not guarantee the accuracy or completeness of any information on this site.</p>

			<h2 class="text-xl font-semibold text-white mt-8">6. Limitation of Liability</h2>
			<p>ReseraLabs shall not be liable for any damages arising from the use or inability to use this website or its services.</p>

			<h2 class="text-xl font-semibold text-white mt-8">7. Changes to Terms</h2>
			<p>We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of any changes.</p>

			<h2 class="text-xl font-semibold text-white mt-8">8. Contact</h2>
			<p>For questions about these terms, contact us at <a href="mailto:josh.budinger@reseralabs.com" class="text-indigo-400 hover:text-indigo-300">josh.budinger@reseralabs.com</a></p>
		</div>
	</div>
</div>
