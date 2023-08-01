<script>
	import RequestClientFE from '$lib/clients/frontend.js';
	let files = [];

	const fileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onloadend = function () {
				// remove the 'data:file/type;base64,' part from the beginning of the string
				const base64String = reader.result.split(',')[1];
				resolve(base64String);
			};

			reader.onerror = function (error) {
				reject(error);
			};

			reader.readAsDataURL(file);
		});
	}

	const submitFile = async () => {
		const url = '';

		const fileEncoded = await fileToBase64(files[0]);

    console.log(fileEncoded)

		const requestClient = new RequestClientFE({
			fetch,
			url,
			method: 'POST',
			body: fileEncoded
		});
	};
</script>

<div>
	<input type="file" bind:files />
</div>
<div>
	<button on:click={submitFile}>Enviar</button>
</div>
