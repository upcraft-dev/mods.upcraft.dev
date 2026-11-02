import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tailwindcss from "@tailwindcss/vite";

const env = process.env;

function firstDefined<T>(...params: Array<T | undefined>) {
  for (const p of params) {
    if (p !== undefined) {
      return p;
    }
  }

  throw new Error("All elements were undefined!");
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			// Consult https://kit.svelte.dev/docs/integrations#preprocessors
			// for more information about preprocessors
			preprocess: vitePreprocess(),

			// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://kit.svelte.dev/docs/adapters for more information about adapters.
			adapter: adapter(),
			paths: {
				origin: firstDefined(
					env.FRONTEND_URL,
					env.CF_PAGES_URL,
					"https://mods.upcraft.dev",
        		),
			}
		})
	],
	test: { include: ['src/**/*.{test,spec}.{js,ts}'] }
});
