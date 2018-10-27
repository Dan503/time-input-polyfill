
var supports_time = require('./core/helpers/supportsTime');

function loadJS (src, callback) {
	var script = document.createElement('script');
	script.src = src;
	script.onload = callback;
	document.head.appendChild(script);
};

document.addEventListener("DOMContentLoaded", function() {
	if (!supports_time) {
		loadJS('https://cdn.jsdelivr.net/npm/time-input-polyfill@1.0.0/dist/time-input-polyfill.min.js', function(){
			var $inputs = [].slice.call(document.querySelectorAll('input[type="time"]'));
			$inputs.forEach(function($input) {
				new TimePolyfill($input);
			});
		});
	}
});
