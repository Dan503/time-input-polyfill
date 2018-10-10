
var prevent_user_select = require('./core/helpers/prevent_user_select');
var apply_default = require('./core/setters/apply_default');
var update_time = require('./core/setters/update_time');
var set_data_attribute = require('./core/setters/set_data_attribute');
var bind_events = require('./core/events/bind_events');

function TimePolyfill($input) {

	prevent_user_select();

	if ($input.value === '' || /--/.test($input.value)) {
		apply_default();
	} else {
		update_time($input);
	}

	set_data_attribute('');

	bind_events($input);

	$input.updatePolyfill = function() {
		update_time($input);
	};
}

if (module) {
	module.exports = TimePolyfill;
} else {
	window.TimePolyfill = TimePolyfill;
}
