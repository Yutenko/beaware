import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit({
		onwarn(warning, defaultHandler) {
			// don't warn on <marquee> elements, cos they're cool
			console.log(warning.code);
			if (warning.code.startsWith('a11y-')) return;

			// handle all other warnings normally
			defaultHandler(warning);
		}
	})]
});
