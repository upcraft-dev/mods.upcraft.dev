<script lang="ts">
	import VersionCard from '$components/VersionCard.svelte';
	import type { PageData } from './$types';

    export let data: PageData;

    type DependencyMap = Record<string, DependencyData>;

    interface DependencyData {
        title: string;
        url: string;
        group?: string;
        artifact?: string;
        version: string | null;
    }

    export const dependencies: DependencyMap = {
        'minecraft': {
            title: 'Minecraft',
            url: 'https://minecraft.net',
            group: 'com.mojang',
            artifact: 'minecraft',
            version: data.minecraft
        },
        'parchment': {
            title: 'Parchment Mappings',
            url: 'https://parchmentmc.org',
            group: 'org.parchmentmc.data',
            artifact: `parchment-${data.minecraft_version}`,
            version: data.parchment
        },
        'neogradle': {
            title: 'NeoGradle',
            url: 'https://projects.neoforged.net/neoforged/neogradle',
            group: 'net.neoforged.gradle.userdev',
            version: data.neogradle
        },
        'neoforge': {
            title: 'NeoForge',
            url: 'https://projects.neoforged.net/neoforged/neoforge',
            group: 'net.neoforged',
            artifact: 'neoforge',
            version: data.neoforge
        },
        'fabric-loom': {
            title: 'Fabric Loom',
            url: 'https://github.com/FabricMC/fabric-loom',
            group: 'fabric-loom',
            version: data.fabric_loom
        },
        'fabric-loader': {
            title: 'Fabric Loader',
            url: 'https://github.com/FabricMC/fabric-loader',
            group: 'net.fabricmc',
            artifact: 'fabric-loader',
            version: data.fabric_loader
        },
        'fabric-api': {
            title: 'Fabric API',
            url: 'https://github.com/FabricMC/fabric',
            group: 'net.fabricmc.fabric-api',
            artifact: 'fabric-api',
            version: data.fabric_api
        },
        'quilt-loom': {
            title: 'Quilt Loom',
            url: 'https://github.com/QuiltMC/quilt-loom',
            group: 'org.quiltmc.loom',
            version: data.quilt_loom
        },
        'quilt-loader': {
            title: 'Quilt Loader',
            url: 'https://github.com/QuiltMC/quilt-loader',
            group: 'org.quiltmc',
            artifact: 'quilt-loader',
            version: data.quilt_loader
        },
        'quilted-fabric-api': {
            title: 'Quilted Fabric API (QFAPI)',
            url: 'https://github.com/QuiltMC/quilted-fabric-api',
            group: 'org.quiltmc.quilted-fabric-api',
            artifact: 'quilted-fabric-api',
            version: data.quilted_fabric_api
        },
        'qsl': {
            title: 'Quilt Standard Libraries (QSL)',
            url: 'https://github.com/QuiltMC/quilt-standard-libraries',
            group: 'org.quiltmc',
            artifact: 'qsl',
            version: data.quilt_standard_libraries
        },
    }
</script>

<svelte:head>
	<title>Latest Versions</title>
</svelte:head>

<h1>Latest Versions</h1>

<ul class="grid w-7/12 grid-flow-row grid-cols-1 gap-4 p-4 m-auto min-w-max md:grid-cols-2 xl:grid-cols-3">
    {#each Object.entries(dependencies) as [key, dep]}
    <li id={`dependency-${key}`}>
		<VersionCard
			title={dep.title}
			url={dep.url}
			group={dep.group}
			artifact={dep.artifact}
            version={dep.version}
		/>
	</li>
    {/each}
</ul>
