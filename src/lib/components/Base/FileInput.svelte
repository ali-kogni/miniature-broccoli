<script>
	export let id;
	export let files;
	export let accept;
	export let additional;
	export let capture;
	export let required;
	export let disabled;
</script>

<label for={id} class="relative">
	<div class="ml-3 mb-2">
		<slot />
	</div>
	<div
		class={`${
			disabled ? 'bg-gray-100' : 'bg-white'
		} text-pruebaPurple font-bold w-full py-2 border border-gray-300 rounded-md select-none shadow-lg cursor-pointer`}
	>
		<div class="flex items-center justify-center">
			<span class="block mr-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="3"
					stroke="currentColor"
					class="w-4 h-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
					/>
				</svg>
			</span>
			Subir archivo {additional ? `(${additional})` : ''}
		</div>
		{#if files && files.length > 0}
			<p class="text-center text-sm font-normal">{files[0].name}</p>
		{/if}
	</div>
	<input
		class="input-hidden"
		{id}
		{accept}
		{capture}
		type="file"
		bind:files
		{required}
		{disabled}
	/>
</label>

<style>
	.input-hidden {
		position: absolute;
		opacity: 0;
		height: 0;
		margin: 0;
		padding: 0;
	}
</style>
