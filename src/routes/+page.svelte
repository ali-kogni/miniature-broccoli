<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Landing from '$lib/components/Landing/Landing.svelte';

	export let data;
</script>

<Navbar {data} desktopDisplay={true} />
<Landing {data} />
