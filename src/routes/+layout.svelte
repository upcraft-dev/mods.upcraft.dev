<script lang="ts">
	import "#css/app";
	let { children } = $props();
</script>

<div class="m-6">
	{@render children?.()}
</div>
