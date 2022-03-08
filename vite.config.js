import legacy from '@vitejs/plugin-legacy'
import pugPlugin from 'vite-plugin-pug'
import pkg from './package.json'

// TODO: currently not Vite compatible, need to do the complicated packaging stuff so that it exports hybrid CommonJS/ESM modules
import { getIDsAndLabels } from '@time-input-polyfill/tests/src/core/IDs-and-labels'

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
