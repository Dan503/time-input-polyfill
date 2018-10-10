// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

// Time input polyfill
var TimePolyfill = require('../../index');
var _$$ = require('../../core/selectors/_$$');

// if (supportsTime()) {
	document.addEventListener("DOMContentLoaded", function() {
		// var $$timeInputs = _$$('input[type="time"]');
		var $$timeInputs = _$$('input.time');
		$$timeInputs.forEach(function (element) {
			new TimePolyfill(element);

			element.oninput = function(){
				console.log('input', element.dataset.value);
			}
			element.onchange = function(){
				console.log('change', element.dataset.value);
			}

			element.addEventListener('change',  function(){
				console.log('listener change');
			});
			element.addEventListener('input', function(){
				console.log('listener input');
			});
		});
	});
// }
