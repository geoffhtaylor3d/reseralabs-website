<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		label: string;
		placeholder: string;
		options: string[];
		value: string;
		onchange: (value: string) => void;
		required?: boolean;
	}

	let { label, placeholder, options, value, onchange, required = false }: Props = $props();
	
	let open = $state(false);
	let dropdownRef: HTMLDivElement;

	onMount(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
				open = false;
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	function toggle() {
		open = !open;
	}

	function select(opt: string) {
		onchange(opt);
		open = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			open = false;
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggle();
		}
	}

	function handleOptionKeydown(e: KeyboardEvent, opt: string) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			select(opt);
		}
	}
</script>

<div class="relative" bind:this={dropdownRef}>
	<span class="block text-sm text-zinc-400 mb-1.5">{label}{#if required}<span class="text-red-400/70 ml-0.5">*</span>{/if}</span>
	<button
		type="button"
		onclick={toggle}
		onkeydown={handleKeydown}
		class="w-full px-4 py-3 bg-zinc-900 border rounded-lg text-left flex items-center justify-between transition-all cursor-pointer {open ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-zinc-800'} {value ? 'text-white' : 'text-zinc-500'}"
		aria-haspopup="listbox"
		aria-expanded={open}
	>
		<span>{value || placeholder}</span>
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			class="h-5 w-5 text-zinc-500 transition-transform {open ? 'rotate-180' : ''}" 
			fill="none" 
			viewBox="0 0 24 24" 
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if open}
		<div 
			class="absolute z-50 w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden"
			role="listbox"
		>
			<div class="max-h-60 overflow-y-auto">
				{#each options as opt}
					<button
						type="button"
						onclick={() => select(opt)}
						onkeydown={(e) => handleOptionKeydown(e, opt)}
						class="w-full px-4 py-3 text-left transition-colors hover:bg-zinc-800 focus:bg-zinc-800 focus:outline-none {value === opt ? 'text-indigo-400 bg-zinc-800/50' : 'text-white'}"
						role="option"
						aria-selected={value === opt}
					>
						{opt}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	{#if required}
		<input type="hidden" {required} value={value} />
	{/if}
</div>
