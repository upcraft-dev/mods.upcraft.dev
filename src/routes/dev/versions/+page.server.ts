import { MavenResolver } from "$lib/server/maven";
import type { PageServerLoad } from "./$types";

const fabricMaven = new MavenResolver('https://maven.fabricmc.net');
const neoForgedReleases = new MavenResolver('https://maven.neoforged.net/releases');
const parchmentMaven = new MavenResolver('https://maven.parchmentmc.org');
const quiltMavenReleases = new MavenResolver('https://maven.quiltmc.org/repository/release');

export const load: PageServerLoad = async () => {

    const versions = new Map<string, Promise<string | null>>();

    const mcPromise = fetch('https://piston-meta.mojang.com/mc/game/version_manifest_v2.json').then(res => res.json()).then(data => data.latest.release);

    const minecraftVersion: string = await mcPromise;

    versions.set('minecraft', mcPromise);

    versions.set('parchment', parchmentMaven.getLatestVersion('org.parchmentmc.data', `parchment-${minecraftVersion}`));

    versions.set('neogradle', neoForgedReleases.getLatestVersion('net.neoforged.gradle', 'userdev'));
    versions.set('neoforge', neoForgedReleases.getLatestVersion('net.neoforged', 'neoforge'));

    versions.set('fabric_loom', fabricMaven.getLatestVersion('net.fabricmc', 'fabric-loom'));
    versions.set('fabric_loader', fabricMaven.getLatestVersion('net.fabricmc', 'fabric-loader'));
    versions.set('fabric_api', fabricMaven.getLatestVersion('net.fabricmc.fabric-api', 'fabric-api'));

    versions.set('quilt_loom', quiltMavenReleases.getLatestVersion('org.quiltmc', 'loom'));
    versions.set('quilt_loader', quiltMavenReleases.getLatestVersion('org.quiltmc', 'quilt-loader'));
    versions.set('quilt_standard_libraries', quiltMavenReleases.getLatestVersion('org.quiltmc', 'qsl'));
    versions.set('quilted_fabric_api', quiltMavenReleases.getLatestVersion('org.quiltmc.quilted-fabric-api', 'quilted-fabric-api'));

    const data: Record<string, string | null> = {};

    for (const [key, value] of versions) {
        data[key] = await value;
    }

    data.minecraft_version = minecraftVersion;

    return data;
};