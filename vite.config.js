import legacy from '@vitejs/plugin-legacy'
import pugPlugin from 'vite-plugin-pug'
import pkg from './package.json'

import { getIDsAndLabels } from './node_modules/@time-input-polyfill/tests/dist/mjs/src/core/IDs-and-labels'

export const testIdsAndLabels = getIDsAndLabels()

/** variables you want to make available to your pug files */
const locals = {
	version: pkg.version,
	testIdsAndLabels,
}

/**
 * @type {import('vite').UserConfig}
 */
const config = {
	build: {
		outDir: 'docs',
	},
	plugins: [
		legacy({
			targets: ['ie >= 11'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
		}),
		pugPlugin({ pretty: true }, locals),
	],
}

export default config
