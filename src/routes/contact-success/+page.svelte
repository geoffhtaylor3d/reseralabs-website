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
	<title>Message Sent | ReseraLabs</title>
	<meta name="description" content="Thanks for reaching out to ReseraLabs." />
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

	<main class="relative z-10 text-center px-6 max-w-3xl mx-auto">
		<div 
			class="transition-all duration-1000 ease-out"
			class:opacity-0={!mounted}
			class:translate-y-8={!mounted}
			class:opacity-100={mounted}
			class:translate-y-0={mounted}
		>
			<div class="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			</div>
		</div>

		<h1 
			class="transition-all duration-1000 delay-150 ease-out"
			class:opacity-0={!mounted}
			class:translate-y-8={!mounted}
			class:opacity-100={mounted}
			class:translate-y-0={mounted}
		>
			<span class="block text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
				Message Sent
			</span>
		</h1>

		<p 
			class="mt-6 text-xl sm:text-2xl text-zinc-400 font-light transition-all duration-1000 delay-300 ease-out"
			class:opacity-0={!mounted}
			class:translate-y-8={!mounted}
			class:opacity-100={mounted}
			class:translate-y-0={mounted}
		>
			Thanks for reaching out. We'll get back to you <span class="text-white font-medium">soon</span>.
		</p>

		<div 
			class="mt-12 transition-all duration-1000 delay-700 ease-out"
			class:opacity-0={!mounted}
			class:translate-y-8={!mounted}
			class:opacity-100={mounted}
			class:translate-y-0={mounted}
		>
			<a 
				href="/"
				class="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Back to home
			</a>
		</div>
	</main>
</div>
