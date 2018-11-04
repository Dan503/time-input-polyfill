
var supports_time = require('./core/helpers/supportsTime');
var loadJS = require('./core/helpers/loadJS');

document.addEventListener("DOMContentLoaded", function() {
	if (!supports_time) {
		loadJS('https://cdn.jsdelivr.net/npm/time-input-polyfill@0.1.2/dist/time-input-polyfill.min.js', function(){
			var $inputs = [].slice.call(document.querySelectorAll('input[type="time"]'));
			$inputs.forEach(function($input) {
				new TimePolyfill($input);
			});
		});
	}
});
