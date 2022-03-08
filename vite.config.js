import legacy from '@vitejs/plugin-legacy'
import pugPlugin from 'vite-plugin-pug'
import pkg from './package.json'

/** variables you want to make available to your pug files */
const locals = {
	version: pkg.version,
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
