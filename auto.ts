import supports_time from './core/helpers/supportsTime.js'
import loadJS from './core/helpers/loadJS.js'

document.addEventListener('DOMContentLoaded', () => {
	if (!supports_time) {
		loadJS(
			'https://cdn.jsdelivr.net/npm/time-input-polyfill@1.0.11/dist/time-input-polyfill.min.js',
			() => {
				var $inputs = [].slice.call(
					document.querySelectorAll('input[type="time"]')
				)
				$inputs.forEach(($input) => {
					new TimePolyfill($input)
				})
			}
		)
	}
})
