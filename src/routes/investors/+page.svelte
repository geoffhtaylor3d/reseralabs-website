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
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<svelte:head>
	<title>Investors | ReseraLabs™</title>
	<meta name="description" content="Invest in the future of data. ReseraLabs is revolutionizing petabyte-scale data access with 99% cost reduction and 4.6x faster AI training." />
</svelte:head>

<div class="relative min-h-screen overflow-hidden">
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

	<div class="relative z-10 px-6 py-20">
		<div class="max-w-6xl mx-auto">
			<a 
				href="/" 
				class="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12 transition-all duration-700 ease-out"
				class:opacity-0={!mounted}
				class:translate-y-4={!mounted}
				class:opacity-100={mounted}
				class:translate-y-0={mounted}
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Back
			</a>

			<header 
				class="text-center mb-20 transition-all duration-1000 ease-out"
				class:opacity-0={!mounted}
				class:translate-y-8={!mounted}
				class:opacity-100={mounted}
				class:translate-y-0={mounted}
			>
				<div class="mb-8 flex items-center justify-center gap-1">
					<img src="/reseralabs-icon.png" alt="ReseraLabs" class="h-12 sm:h-14 w-auto" />
					<span class="text-3xl sm:text-4xl font-bold tracking-tight">
						<span class="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Resera</span><span class="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">Labs</span><span class="text-zinc-500 text-sm sm:text-base inline-block translate-y-2">™</span>
					</span>
				</div>
				<div class="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-zinc-400">
					<span class="relative flex h-2 w-2">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
					</span>
					Actively Raising
				</div>
				<h1 class="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
					<span class="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Invest in the</span>
					<br />
					<span class="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent animate-gradient">Future of Data</span>
				</h1>
				<p class="text-xl text-zinc-400 max-w-2xl mx-auto">
					We're building the infrastructure layer that makes petabyte-scale data as easy to use as local files.
				</p>
			</header>

			<div 
				class="grid md:grid-cols-3 gap-6 mb-20 transition-all duration-1000 delay-200 ease-out"
				class:opacity-0={!mounted}
				class:translate-y-8={!mounted}
				class:opacity-100={mounted}
				class:translate-y-0={mounted}
			>
				<div class="glass rounded-2xl p-8 text-center">
					<div class="text-4xl font-bold text-white mb-2">99%</div>
					<div class="text-zinc-400">Lower infrastructure costs</div>
				</div>
				<div class="glass rounded-2xl p-8 text-center">
					<div class="text-4xl font-bold text-white mb-2">4.6x</div>
					<div class="text-zinc-400">Faster AI/ML training</div>
				</div>
				<div class="glass rounded-2xl p-8 text-center">
					<div class="text-4xl font-bold text-white mb-2">&lt;1ms</div>
					<div class="text-zinc-400">Query latency at scale</div>
				</div>
			</div>

			<p 
				class="text-center text-lg text-zinc-500 mb-20 transition-all duration-1000 delay-300 ease-out"
				class:opacity-0={!mounted}
				class:translate-y-8={!mounted}
				class:opacity-100={mounted}
				class:translate-y-0={mounted}
			>
				Irreduce™ data preserves only the essential — everything else is overhead.
			</p>

			<div 
				class="glass rounded-3xl p-8 sm:p-12 mb-20 transition-all duration-1000 delay-300 ease-out"
				class:opacity-0={!mounted}
				class:translate-y-8={!mounted}
				class:opacity-100={mounted}
				class:translate-y-0={mounted}
			>
				<h2 class="text-3xl font-bold text-white mb-8">The Opportunity</h2>
				<div class="grid md:grid-cols-2 gap-12">
					<div class="space-y-6">
						<div>
							<h3 class="text-xl font-semibold text-white mb-2">The Problem</h3>
							<p class="text-zinc-400">
								Organizations pay six figures annually for databases that still deliver tens to hundreds of milliseconds per query. Data is fragmented across incompatible formats. AI teams often see only 17-43% GPU utilization, with data access frequently cited as a primary bottleneck.
							</p>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-white mb-2">Our Solution</h3>
							<p class="text-zinc-400">
								A proprietary data architecture that eliminates the need for traditional database infrastructure. Works everywhere: cloud, edge devices, air-gapped environments. No infrastructure required.
							</p>
						</div>
					</div>
					<div class="space-y-6">
						<div>
							<h3 class="text-xl font-semibold text-white mb-2">Market Timing</h3>
							<p class="text-zinc-400">
								AI is driving unprecedented demand for fast, scalable data access. Cloud storage is cheap; databases are expensive. The $100B+ data infrastructure market is ready for disruption.
							</p>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-white mb-2">Competitive Moat</h3>
							<p class="text-zinc-400">
								Legacy systems weren't designed for modern compute requirements. Incumbents would face multi-year rewrites to match our performance without breaking compatibility.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div 
				class="glass rounded-3xl p-8 sm:p-12 mb-20 transition-all duration-1000 delay-400 ease-out"
				class:opacity-0={!mounted}
				class:translate-y-8={!mounted}
				class:opacity-100={mounted}
				class:translate-y-0={mounted}
			>
				<h2 class="text-3xl font-bold text-white mb-4">Measured Results</h2>
				<p class="text-zinc-400 mb-8">From production deployments and benchmarks</p>
				<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div class="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
						<div class="text-3xl font-bold text-indigo-400 mb-1">$750</div>
						<div class="text-sm text-zinc-500 mb-2">per year</div>
						<div class="text-zinc-300">vs $76,850/yr traditional</div>
					</div>
					<div class="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
						<div class="text-3xl font-bold text-violet-400 mb-1">90-98%</div>
						<div class="text-sm text-zinc-500 mb-2">GPU utilization</div>
						<div class="text-zinc-300">vs 17-43% typical</div>
					</div>
					<div class="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
						<div class="text-3xl font-bold text-purple-400 mb-1">Up to 656x</div>
						<div class="text-sm text-zinc-500 mb-2">faster queries</div>
						<div class="text-zinc-300">on representative workloads</div>
					</div>
					<div class="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
						<div class="text-3xl font-bold text-pink-400 mb-1">42 hrs</div>
						<div class="text-sm text-zinc-500 mb-2">saved per 1M records</div>
						<div class="text-zinc-300">in ML training time</div>
					</div>
				</div>
			</div>

			<div 
				class="glass rounded-3xl p-8 sm:p-12 mb-20 transition-all duration-1000 delay-500 ease-out"
				class:opacity-0={!mounted}
				class:translate-y-8={!mounted}
				class:opacity-100={mounted}
				class:translate-y-0={mounted}
			>
				<h2 class="text-3xl font-bold text-white mb-4">Why This Can't Be Retrofitted</h2>
				<p class="text-zinc-400 mb-12">
					ReseraLabs is built on assumptions that differ fundamentally from legacy data systems. Retrofitting these capabilities would require breaking long-standing compatibility guarantees across storage, APIs, and execution layers — an impractical path for incumbent platforms.
				</p>

				<h2 class="text-3xl font-bold text-white mb-4">Intellectual Property</h2>
				<p class="text-zinc-400 mb-12">
					ReseraLabs is pursuing patent protection covering core aspects of its data representation and execution model. Additional protection comes from proprietary formats, internal tooling, and accumulated systems know-how.
				</p>

				<h2 class="text-3xl font-bold text-white mb-8">Target Markets</h2>
				<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
					<div class="flex gap-4">
						<div class="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-white mb-1">Government</h3>
							<p class="text-sm text-zinc-400">90% IT cost reduction for federal, state, and local agencies</p>
						</div>
					</div>
					<div class="flex gap-4">
						<div class="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-white mb-1">Defense & Intelligence</h3>
							<p class="text-sm text-zinc-400">Air-gapped, offline-first, peer-to-peer capable</p>
						</div>
					</div>
					<div class="flex gap-4">
						<div class="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-white mb-1">AI/ML & Autonomous Systems</h3>
							<p class="text-sm text-zinc-400">Unified training data, 4.6x faster pipelines</p>
						</div>
					</div>
					<div class="flex gap-4">
						<div class="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-white mb-1">Real Estate & Insurance</h3>
							<p class="text-sm text-zinc-400">150M+ records queryable in milliseconds</p>
						</div>
					</div>
					<div class="flex gap-4">
						<div class="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-white mb-1">Healthcare & Life Sciences</h3>
							<p class="text-sm text-zinc-400">Multi-modal data, compliance-ready architecture</p>
						</div>
					</div>
					<div class="flex gap-4">
						<div class="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-white mb-1">Enterprise & Logistics</h3>
							<p class="text-sm text-zinc-400">Cloud-to-edge deployment, offline operation</p>
						</div>
					</div>
					<div class="flex gap-4">
						<div class="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-white mb-1">Architecture, Engineering & Construction</h3>
							<p class="text-sm text-zinc-400">Large-scale project data, field-to-office workflows</p>
						</div>
					</div>
				</div>
			</div>

			<div 
				class="glass rounded-3xl p-8 sm:p-12 mb-20 transition-all duration-1000 delay-600 ease-out"
				class:opacity-0={!mounted}
				class:translate-y-8={!mounted}
				class:opacity-100={mounted}
				class:translate-y-0={mounted}
			>
				<h2 class="text-3xl font-bold text-white mb-8">Why Now</h2>
				<div class="grid md:grid-cols-2 gap-8">
					<div class="space-y-4">
						<div class="flex gap-3">
							<div class="w-6 h-6 shrink-0 rounded-full bg-indigo-500/20 flex items-center justify-center mt-0.5">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<p class="text-zinc-300">Cloud storage is cheap. Databases are expensive. The economics have flipped.</p>
						</div>
						<div class="flex gap-3">
							<div class="w-6 h-6 shrink-0 rounded-full bg-indigo-500/20 flex items-center justify-center mt-0.5">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<p class="text-zinc-300">AI/ML workloads demand massive datasets with fast, random access.</p>
						</div>
						<div class="flex gap-3">
							<div class="w-6 h-6 shrink-0 rounded-full bg-indigo-500/20 flex items-center justify-center mt-0.5">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<p class="text-zinc-300">Edge computing requires efficient systems that work offline.</p>
						</div>
					</div>
					<div class="space-y-4">
						<div class="flex gap-3">
							<div class="w-6 h-6 shrink-0 rounded-full bg-violet-500/20 flex items-center justify-center mt-0.5">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<p class="text-zinc-300">GPUs need direct data access. SQL adds latency AI can't afford.</p>
						</div>
						<div class="flex gap-3">
							<div class="w-6 h-6 shrink-0 rounded-full bg-violet-500/20 flex items-center justify-center mt-0.5">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<p class="text-zinc-300">Legacy vendors can't retrofit without breaking compatibility.</p>
						</div>
						<div class="flex gap-3">
							<div class="w-6 h-6 shrink-0 rounded-full bg-violet-500/20 flex items-center justify-center mt-0.5">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<p class="text-zinc-300">Customers are locked into painful, expensive migrations.</p>
						</div>
					</div>
				</div>
			</div>

			<div 
				class="text-center transition-all duration-1000 delay-700 ease-out"
				class:opacity-0={!mounted}
				class:translate-y-8={!mounted}
				class:opacity-100={mounted}
				class:translate-y-0={mounted}
			>
				<h2 class="text-3xl font-bold text-white mb-4">Request Investor Materials</h2>
				<p class="text-zinc-400 mb-4 max-w-xl mx-auto">
					Built by practitioners with deep experience in large-scale data systems and cloud infrastructure.
				</p>
				<p class="text-zinc-400 mb-8 max-w-xl mx-auto">
					We're looking for investors who understand infrastructure and want to be part of the next platform shift.
				</p>
				<div class="group relative inline-block">
					<div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
					<a
						href="mailto:contact@reseralabs.com?subject=Investment%20Inquiry"
						class="relative flex items-center gap-2 px-8 py-4 bg-zinc-950 rounded-lg font-medium text-white hover:bg-zinc-900 transition-colors"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
						</svg>
						Request Materials
					</a>
				</div>
			</div>
		</div>
	</div>

	<footer 
		class="relative z-10 py-8 text-center text-sm transition-all duration-1000 delay-900 ease-out"
		class:opacity-0={!mounted}
		class:opacity-100={mounted}
	>
		<p class="text-zinc-600">&copy; {new Date().getFullYear()} ReseraLabs™. All rights reserved.</p>
		<div class="mt-2 flex justify-center gap-4">
			<a href="/privacy" class="text-zinc-500 hover:text-zinc-300 transition-colors">Privacy</a>
			<a href="/terms" class="text-zinc-500 hover:text-zinc-300 transition-colors">Terms</a>
		</div>
	</footer>
</div>
