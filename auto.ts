import { supportsTime } from '@time-input-polyfill/utils/common/supportsTime'
import loadJS from '@dan503/load-js'
import { extendedWindow } from './Window'

document.addEventListener('DOMContentLoaded', () => {
	if (!supportsTime) {
		loadJS(
			'https://cdn.jsdelivr.net/npm/time-input-polyfill@2.0.0/dist/time-input-polyfill.min.js',
			() => {
				var $inputs = [].slice.call(
					document.querySelectorAll('input[type="time"]')
				)
				$inputs.forEach(($input) => {
					extendedWindow?.TimePolyfill?.($input)
				})
			}
		)
	}
})
