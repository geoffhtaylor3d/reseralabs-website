<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import config from '$lib/emailoctopus-config.json';
	import Dropdown from '$lib/components/Dropdown.svelte';

	let mounted = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let showModal = $state(false);
	let showContactModal = $state(false);
	
	let email = $state('');
	let firstName = $state('');
	let lastName = $state('');
	let company = $state('');
	let jobTitle = $state('');
	let organizationType = $state('');
	let industry = $state('');
	let contactPermission = $state('');
	let submitting = $state(false);
	let error = $state('');

	let contactName = $state('');
	let contactEmail = $state('');
	let contactCompany = $state('');
	let contactJobTitle = $state('');
	let contactOrgType = $state('');
	let contactIndustry = $state('');
	let contactMessage = $state('');
	let contactSubmitting = $state(false);
	let contactError = $state('');

	const orgTypes = config.fields.find(f => f.tag === 'OrganizationType')?.choices || [];
	const industries = config.fields.find(f => f.tag === 'Industry')?.choices || [];

	const STORAGE_KEY = 'reseralabs-signup-form';

	function saveFormState() {
		const data = { email, firstName, lastName, company, jobTitle, organizationType, industry, contactPermission, showModal };
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	}

	function loadFormState() {
		const saved = sessionStorage.getItem(STORAGE_KEY);
		if (saved) {
			const data = JSON.parse(saved);
			email = data.email || '';
			firstName = data.firstName || '';
			lastName = data.lastName || '';
			company = data.company || '';
			jobTitle = data.jobTitle || '';
			organizationType = data.organizationType || '';
			industry = data.industry || '';
			contactPermission = data.contactPermission || '';
			showModal = data.showModal || false;
		}
	}

	function clearFormState() {
		sessionStorage.removeItem(STORAGE_KEY);
	}

	onMount(() => {
		mounted = true;
		loadFormState();
		
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	function openModal() {
		showModal = true;
		saveFormState();
	}

	function closeModal() {
		showModal = false;
		clearFormState();
	}

	function openContactModal() {
		showContactModal = true;
	}

	function closeContactModal() {
		showContactModal = false;
	}

	async function handleContactSubmit(e: Event) {
		e.preventDefault();
		contactSubmitting = true;
		contactError = '';

		try {
			const res = await fetch(import.meta.env.VITE_CONTACT_API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: contactName,
					email: contactEmail,
					company: contactCompany,
					jobTitle: contactJobTitle,
					organizationType: contactOrgType,
					industry: contactIndustry,
					message: contactMessage
				})
			});

			const data = await res.json();

			if (!res.ok) {
				contactError = data.error || 'Something went wrong. Please try again.';
				contactSubmitting = false;
				return;
			}

			goto('/contact-success');
		} catch {
			contactError = 'Something went wrong. Please try again.';
		} finally {
			contactSubmitting = false;
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		submitting = true;
		error = '';

		try {
			const res = await fetch(import.meta.env.VITE_SUBSCRIBE_API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					firstName,
					lastName,
					company,
					jobTitle,
					organizationType,
					industry,
					contactPermission
				})
			});

			const data = await res.json();

			if (!res.ok) {
				error = data.error || 'Something went wrong. Please try again.';
				submitting = false;
				return;
			}

			clearFormState();
			goto('/thank-you');
		} catch {
			error = 'Something went wrong. Please try again.';
			submitting = false;
		}
	}
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
			class="mt-12 transition-all duration-1000 delay-500 ease-out"
			class:opacity-0={!mounted}
			class:translate-y-8={!mounted}
			class:opacity-100={mounted}
			class:translate-y-0={mounted}
		>
			<div class="group relative inline-block">
				<div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
				<button
					onclick={openModal}
					class="relative flex items-center gap-2 px-8 py-4 bg-zinc-950 rounded-lg font-medium text-white hover:bg-zinc-900 transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
						<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
					</svg>
					Get Notified
				</button>
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
		class="absolute bottom-8 text-center text-sm transition-all duration-1000 delay-1000 ease-out"
		class:opacity-0={!mounted}
		class:opacity-100={mounted}
	>
		<p class="text-zinc-600">&copy; {new Date().getFullYear()} ReseraLabs. All rights reserved.</p>
		<div class="mt-2 flex justify-center gap-4">
			<a href="/privacy" class="text-zinc-500 hover:text-zinc-300 transition-colors">Privacy</a>
			<a href="/terms" class="text-zinc-500 hover:text-zinc-300 transition-colors">Terms</a>
			<button onclick={openContactModal} class="text-zinc-500 hover:text-zinc-300 transition-colors">Contact</button>
			<a href="/investors" class="text-zinc-500 hover:text-zinc-300 transition-colors">Investors</a>
		</div>
	</footer>
</div>

{#if showModal}
	<div 
		class="fixed inset-0 z-50 overflow-y-auto"
		role="dialog"
		aria-modal="true"
	>
		<div class="min-h-full flex items-center justify-center p-4">
			<div 
				class="fixed inset-0 bg-black/80 backdrop-blur-sm"
			></div>
			
			<div class="relative w-full max-w-lg transform transition-all my-8">
				<div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-2xl blur-lg opacity-40"></div>
				
				<div class="relative bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8">
				<button
					onclick={closeModal}
					class="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
					aria-label="Close"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				<h2 class="text-2xl font-bold text-white mb-2">Stay in the loop</h2>
				<p class="text-zinc-400 mb-6">Be the first to know when we launch.</p>

				<form onsubmit={handleSubmit} class="space-y-4">
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label for="firstName" class="block text-sm text-zinc-400 mb-1.5">First name<span class="text-red-400/70 ml-0.5">*</span></label>
							<input
								id="firstName"
								type="text"
								bind:value={firstName}
								required
								class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
							/>
						</div>
						<div>
							<label for="lastName" class="block text-sm text-zinc-400 mb-1.5">Last name<span class="text-red-400/70 ml-0.5">*</span></label>
							<input
								id="lastName"
								type="text"
								bind:value={lastName}
								required
								class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
							/>
						</div>
					</div>
					
					<div>
						<label for="email" class="block text-sm text-zinc-400 mb-1.5">Email address<span class="text-red-400/70 ml-0.5">*</span></label>
						<input
							id="email"
							type="email"
							bind:value={email}
							required
							class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
						/>
					</div>

					<div>
						<label for="company" class="block text-sm text-zinc-400 mb-1.5">Company<span class="text-red-400/70 ml-0.5">*</span></label>
						<input
							id="company"
							type="text"
							bind:value={company}
							required
							class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
						/>
					</div>

					<div>
						<label for="jobTitle" class="block text-sm text-zinc-400 mb-1.5">Job Title<span class="text-red-400/70 ml-0.5">*</span></label>
						<input
							id="jobTitle"
							type="text"
							bind:value={jobTitle}
							required
							class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
						/>
					</div>

					<Dropdown
						label="Organization Type"
						placeholder="Select organization type"
						options={orgTypes}
						value={organizationType}
						onchange={(v) => organizationType = v}
						required
					/>

					<Dropdown
						label="Industry"
						placeholder="Select industry"
						options={industries}
						value={industry}
						onchange={(v) => industry = v}
						required
					/>

					<Dropdown
						label="Would you like us to contact you?"
						placeholder="Select an option"
						options={['Yes, please', 'No, thank you']}
						value={contactPermission}
						onchange={(v) => contactPermission = v}
						required
					/>

					{#if error}
						<p class="text-red-400 text-sm">{error}</p>
					{/if}

					<div class="pt-2">
						<div class="group relative">
							<div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
							<button
								type="submit"
								disabled={submitting}
								class="relative w-full flex items-center justify-center gap-2 px-8 py-4 bg-zinc-950 rounded-lg font-medium text-white hover:bg-zinc-900 transition-colors disabled:opacity-50"
							>
								{#if submitting}
									<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Subscribing...
								{:else}
									Get Notified
								{/if}
							</button>
						</div>
					</div>

					<p class="text-xs text-zinc-500 text-center pt-2">
						By subscribing, you agree to our <a href="/privacy" onclick={saveFormState} class="text-indigo-400 hover:underline">Privacy Policy</a> and <a href="/terms" onclick={saveFormState} class="text-indigo-400 hover:underline">Terms</a>.
					</p>
				</form>
				</div>
			</div>
		</div>
	</div>
{/if}

{#if showContactModal}
	<div 
		class="fixed inset-0 z-50 overflow-y-auto"
		role="dialog"
		aria-modal="true"
	>
		<div class="min-h-full flex items-center justify-center p-4">
			<div 
				class="fixed inset-0 bg-black/80 backdrop-blur-sm"
			></div>
			
			<div class="relative w-full max-w-2xl transform transition-all my-8">
				<div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-2xl blur-lg opacity-40"></div>
				
				<div class="relative bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8">
				<button
					onclick={closeContactModal}
					class="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
					aria-label="Close"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				<h2 class="text-2xl font-bold text-white mb-2">Get in Touch</h2>
				<p class="text-zinc-400 mb-6">Have a question? We'd love to hear from you.</p>

				<form onsubmit={handleContactSubmit} class="space-y-4">
					<div>
						<label for="contactName" class="block text-sm text-zinc-400 mb-1.5">Name<span class="text-red-400/70 ml-0.5">*</span></label>
						<input
							id="contactName"
							type="text"
							bind:value={contactName}
							required
							class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
						/>
					</div>

					<div>
						<label for="contactEmail" class="block text-sm text-zinc-400 mb-1.5">Email address<span class="text-red-400/70 ml-0.5">*</span></label>
						<input
							id="contactEmail"
							type="email"
							bind:value={contactEmail}
							required
							class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
						/>
					</div>

					<div>
						<label for="contactCompany" class="block text-sm text-zinc-400 mb-1.5">Company<span class="text-red-400/70 ml-0.5">*</span></label>
						<input
							id="contactCompany"
							type="text"
							bind:value={contactCompany}
							required
							class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
						/>
					</div>

					<div>
						<label for="contactJobTitle" class="block text-sm text-zinc-400 mb-1.5">Job Title<span class="text-red-400/70 ml-0.5">*</span></label>
						<input
							id="contactJobTitle"
							type="text"
							bind:value={contactJobTitle}
							required
							class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
						/>
					</div>

					<Dropdown
						label="Organization Type"
						placeholder="Select organization type"
						options={orgTypes}
						value={contactOrgType}
						onchange={(v) => contactOrgType = v}
						required
					/>

					<Dropdown
						label="Industry"
						placeholder="Select industry"
						options={industries}
						value={contactIndustry}
						onchange={(v) => contactIndustry = v}
						required
					/>

					<div>
						<label for="contactMessage" class="block text-sm text-zinc-400 mb-1.5">Message<span class="text-red-400/70 ml-0.5">*</span></label>
						<textarea
							id="contactMessage"
							bind:value={contactMessage}
							required
							rows="6"
							class="w-full min-h-[150px] px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
						></textarea>
					</div>

					{#if contactError}
						<p class="text-red-400 text-sm">{contactError}</p>
					{/if}

					<div class="pt-2">
						<div class="group relative">
							<div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
							<button
								type="submit"
								disabled={contactSubmitting}
								class="relative w-full flex items-center justify-center gap-2 px-8 py-4 bg-zinc-950 rounded-lg font-medium text-white hover:bg-zinc-900 transition-colors disabled:opacity-50"
							>
								{#if contactSubmitting}
									<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Sending...
								{:else}
									Send Message
								{/if}
							</button>
						</div>
					</div>
				</form>
				</div>
			</div>
		</div>
	</div>
{/if}
