<script lang="ts">
    import { copy } from 'svelte-copy';

	export let title: string;
	export let url: string;
	export let version: string | null;

	export let group: string | undefined = undefined;
	export let artifact: string | undefined = undefined;

	// export let type: 'maven' = 'maven'; //TODO icon?

    if(version === null) {
        version = 'unknown';
    }

</script>

<div class="flex flex-col flex-grow h-full gap-2 p-2 text-center rounded-lg min-h-40 bg-slate-700 place-content-evenly min-w-max">
	<div class="flex flex-col">
		<h2>{title}</h2>
		{#if group}
			<code class="px-1 text-gray-300 bg-gray-900 rounded-md">
				{group}{artifact ? `:${artifact}` : ''}
			</code>
		{/if}
		<a
			href={url}
			rel="noreferrer"
			target="_blank"
			class="mx-auto text-sm italic text-blue-300 no-underline hover:text-indigo-200 focus:text-indigo-200"
		>
			{url}
		</a>
	</div>
	<button class="flex flex-row w-full gap-2 px-4 py-1 text-left text-white bg-gray-800 rounded-lg min-w-fit" use:copy={version}>
        <samp class="min-w-fit">{version ?? 'unable to load'}</samp>
        <p class="m-auto mr-0 font-mono text-xs min-w-fit">(click to copy)</p>
    </button>
</div>
