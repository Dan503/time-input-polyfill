import legacy from '@vitejs/plugin-legacy'

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
	],
}

export default config
