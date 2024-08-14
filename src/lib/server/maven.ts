import { XMLElement, parseXmlAsync } from "libxmljs";
import flexVerCompare from 'flexver';

export class MavenResolver {

    public readonly url: string;

    constructor(url: string) {
        this.url = url.endsWith('/') ? url : `${url}/`; // ensure trailing slash so we can pass it to the URL constructor
    }

    public async getMetadata(groupId: string, artifactId: string): Promise<XMLElement> {

        const mavenMetadataUrl = new URL(`${groupId.replace(/\./g, '/')}/${artifactId}/maven-metadata.xml`, this.url);

        const response = await fetch(mavenMetadataUrl);
        const text = await response.text();

        const doc = await parseXmlAsync(text);

        const metadata = doc.root() as XMLElement;

        return metadata;
    }

    public async getLatestVersion(groupId: string, artifactId: string): Promise<string | null> {
        try {
            const metadata = await this.getMetadata(groupId, artifactId);

            const versioning = metadata.get('versioning') as XMLElement;
            const versions = versioning.get('versions') as XMLElement;

            //TODO figure out why this includes newlines as elements
            const sorted = versions.childNodes().map(it => it.text()).filter(it => !it.startsWith('\n')).sort(flexVerCompare);

            return sorted.length > 0 ? sorted[sorted.length - 1] : null;
        }
        catch {
            return null;
        }
    }
}

export interface MavenVersion {
    id: string,
    downloadUrl?: string,
}