import supports_time from './core/helpers/supportsTime'
import loadJS from './core/helpers/loadJS'

document.addEventListener('DOMContentLoaded', function() {
	if (!supports_time) {
		loadJS(
			'https://cdn.jsdelivr.net/npm/time-input-polyfill@1.0.9/dist/time-input-polyfill.min.js',
			function() {
				var $inputs = [].slice.call(
					document.querySelectorAll('input[type="time"]')
				)
				$inputs.forEach(function($input) {
					new TimePolyfill($input)
				})
			}
		)
	}
})
