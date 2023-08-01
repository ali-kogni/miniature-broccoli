<script>
	import RequestClientFE from '$lib/clients/frontend.js';
	import FileInput from '$lib/components/Base/FileInput.svelte';
	let filesIdentificationFront = [];
	const submitFile = () => {};
</script>

<div>
	<FileInput
		id="identificationFront"
		additional="JPG o PNG"
		accept="image/jpeg,image/png"
		capture="environment"
		bind:files={filesIdentificationFront}
	>
		archivo
	</FileInput>
	<button on:click={submitFile}>Enviar</button>
</div>
