import legacy from '@vitejs/plugin-legacy'
import pugPlugin from 'vite-plugin-pug'
import pkg from './package.json'

import { getIDsAndLabels } from './node_modules/@time-input-polyfill/tests/dist/mjs/src/core/IDs-and-labels'
import { staticValues } from './node_modules/@time-input-polyfill/tests/dist/mjs/src/core/static-values'

export var testIdsAndLabels = getIDsAndLabels()

/** variables you want to make available to your pug files */
var locals = {
	version: pkg.version,
	testIdsAndLabels,
	staticValues,
}

/**
 * @type {import('vite').UserConfig}
 */
var config = {
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
