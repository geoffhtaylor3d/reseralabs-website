<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);

	onMount(() => {
		mounted = true;
		
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};
		
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});
</script>

<svelte:head>
	<title>ReseraLabs | Something Big is Coming</title>
	<meta name="description" content="ReseraLabs - Pioneering the next generation of technology. Coming soon." />
</svelte:head>

<div class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
	<div 
		class="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
		style="background: radial-gradient(600px circle at {mouseX}px {mouseY}px, rgba(99, 102, 241, 0.08), transparent 40%)"
	></div>

	<div class="absolute inset-0 z-0">
		<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-glow"></div>
		<div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl animate-pulse-glow" style="animation-delay: 2s;"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl"></div>
	</div>

	<div class="absolute inset-0 z-0 opacity-30">
		<div class="absolute inset-0" style="background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
	</div>

	<main class="relative z-10 text-center px-6 max-w-5xl mx-auto">
		<div 
			class="transition-all duration-1000 ease-out"
			class:opacity-0={!mounted}
			class:translate-y-8={!mounted}
			class:opacity-100={mounted}
			class:translate-y-0={mounted}
		>
			<div class="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-zinc-400">
				<span class="relative flex h-2 w-2">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
					<span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
				</span>
				In Development
			</div>
		</div>

		<h1 
			class="transition-all duration-1000 delay-150 ease-out"
			class:opacity-0={!mounted}
			class:translate-y-8={!mounted}
			class:opacity-100={mounted}
			class:translate-y-0={mounted}
		>
			<span class="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
				<span class="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Resera</span><span class="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent animate-gradient">Labs</span>
			</span>
		</h1>

		<p 
			class="mt-8 text-xl sm:text-2xl md:text-3xl text-zinc-400 font-light max-w-2xl mx-auto transition-all duration-1000 delay-300 ease-out"
			class:opacity-0={!mounted}
			class:translate-y-8={!mounted}
			class:opacity-100={mounted}
			class:translate-y-0={mounted}
		>
			Something <span class="text-white font-medium">big</span> is coming.
		</p>

		<div 
			class="mt-16 transition-all duration-1000 delay-500 ease-out"
			class:opacity-0={!mounted}
			class:translate-y-8={!mounted}
			class:opacity-100={mounted}
			class:translate-y-0={mounted}
		>
			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
				<div class="group relative">
					<div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
					<a 
						href="mailto:josh.budinger@reseralabs.com" 
						class="relative flex items-center gap-2 px-8 py-4 bg-zinc-950 rounded-lg font-medium text-white hover:bg-zinc-900 transition-colors"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
						</svg>
						Get Notified
					</a>
				</div>
			</div>
		</div>

		<div 
			class="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto transition-all duration-1000 delay-700 ease-out"
			class:opacity-0={!mounted}
			class:translate-y-8={!mounted}
			class:opacity-100={mounted}
			class:translate-y-0={mounted}
		>
			<div class="glass rounded-2xl p-6 hover:bg-white/5 transition-colors flex flex-col items-center text-center">
				<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-white mb-2">100x Faster</h3>
				<p class="text-zinc-500 text-sm">Sub-millisecond queries on petabyte-scale data.</p>
			</div>

			<div class="glass rounded-2xl p-6 hover:bg-white/5 transition-colors flex flex-col items-center text-center">
				<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-white mb-2">No Database</h3>
				<p class="text-zinc-500 text-sm">Intelligent files replace complex infrastructure.</p>
			</div>

			<div class="glass rounded-2xl p-6 hover:bg-white/5 transition-colors flex flex-col items-center text-center">
				<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
					</svg>
				</div>
				<h3 class="text-lg font-semibold text-white mb-2">GPU Native</h3>
				<p class="text-zinc-500 text-sm">Built for AI/ML workloads from the ground up.</p>
			</div>
		</div>
	</main>

	<footer 
		class="absolute bottom-8 text-center text-zinc-600 text-sm transition-all duration-1000 delay-1000 ease-out"
		class:opacity-0={!mounted}
		class:opacity-100={mounted}
	>
		<p>&copy; {new Date().getFullYear()} ReseraLabs. All rights reserved.</p>
	</footer>
</div>
