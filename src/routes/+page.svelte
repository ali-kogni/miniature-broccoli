<script>
	let files = [];

	const digestMessage = async (message) => {
		const msgUint8 = new TextEncoder().encode(message);
		const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
		return hashHex;
	};

	const fileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onloadend = function () {
				resolve(reader.result);
			};

			reader.onerror = function (error) {
				reject(error);
			};

			reader.readAsDataURL(file);
		});
	};

	const submitFile = async () => {
		const url = '/api/test';

		const fileEncoded = await fileToBase64(files[0]);
		const hash = await digestMessage(fileEncoded);

		console.log('LOCAL', hash);

		const response = await fetch(url, {
			method: 'POST',
			body: fileEncoded
		});

		if (response.ok) {
      const remoteHash = await response.text()
			console.log('REMOTE', remoteHash);

      if (hash === remoteHash)
        console.log('Son iguales')
      else
        console.error('Hay diferencia')
		} else {
			console.error('No jalo');
		}
	};
</script>

<div>
	<input type="file" bind:files />
</div>
<div>
	<button on:click={submitFile}>Enviar</button>
</div>
