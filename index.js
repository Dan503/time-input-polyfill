
var prevent_user_select = require('./core/helpers/prevent_user_select');
var apply_default = require('./core/setters/apply_default');
var update_time = require('./core/setters/update_time');
var set_data_attribute = require('./core/setters/set_data_attribute');
var bind_events = require('./core/events/bind_events');
var switch_times = require('./core/setters/switch_times');

function TimePolyfill($input) {

	prevent_user_select($input);

	if ($input.value === '' || /--/.test($input.value)) {
		apply_default($input);
		set_data_attribute($input, '');
	} else {
		update_time($input);
		set_data_attribute($input, $input.value);
	}

	bind_events($input);

	$input.polyfill = {
		update: function() {
			update_time($input);
		},
		swap: function(forcedFormat) {
			switch_times($input, forcedFormat);
		}
	}
}

if (module) {
	module.exports = TimePolyfill;
} else {
	window.TimePolyfill = TimePolyfill;
}
