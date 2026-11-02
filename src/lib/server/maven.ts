import { XMLParser } from 'fast-xml-parser';
import flexVerCompare from 'flexver';

const parser = new XMLParser();

export interface MavenMetadataRoot {
	metadata: MavenMetadata
}

export interface MavenMetadata {
	groupId: string,
	artifactId: string,
	versioning: MavenMetadataVersioning,
}

export interface MavenMetadataVersioning {
	latest?: string,
	release?: string,
	lastUpdated?: Date
	versions?: {
		version?: Array<string>
	}
}

export class MavenResolver {
	public readonly url: string;

	constructor(url: string) {
		this.url = url.endsWith('/') ? url : `${url}/`; // ensure trailing slash so we can pass it to the URL constructor
	}

	public async getMetadata(groupId: string, artifactId: string): Promise<MavenMetadata> {
		const mavenMetadataUrl = new URL(
			`${groupId.replace(/\./g, '/')}/${artifactId}/maven-metadata.xml`,
			this.url
		);

		const response = await fetch(mavenMetadataUrl);
		const text = await response.text();

		const doc = parser.parse(text) as MavenMetadataRoot;

		return doc.metadata;
	}

	public async getLatestVersion(groupId: string, artifactId: string): Promise<string | null> {
		try {
			const metadata = await this.getMetadata(groupId, artifactId);

			const versioning = metadata.versioning;
			const versions = versioning.versions?.version || [];

			//TODO figure out why this includes newlines as elements
			const sorted = versions
				.sort(flexVerCompare);

			return sorted.length > 0 ? sorted[sorted.length - 1] : null;
		} catch {
			return null;
		}
	}
}

export interface MavenVersion {
	id: string;
	downloadUrl?: string;
}
