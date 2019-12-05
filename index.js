var apply_default = require('./core/setters/apply_default')
var update_time = require('./core/setters/update_time')
var set_data_attribute = require('./core/setters/set_data_attribute')
var bind_events = require('./core/events/bind_events')
var switch_times = require('./core/setters/switch_times')
var get_label = require('./core/getters/get_label')

var create_a11y_block = require('./core/accessibility/create_a11y_block')

var accessibility_block_created = false
var $a11y

function TimePolyfill($input) {
	$input.setAttribute('autocomplete', 'off')

	// Prevent screen reader from announcing the default stuff
	$input.setAttribute('aria-hidden', true)

	if (!accessibility_block_created) {
		$a11y = create_a11y_block()
		accessibility_block_created = true
	}

	var label = get_label($input)

	$input.polyfill = {
		$a11y: $a11y,
		label: label,
		autoSwap: true,
		update: function() {
			update_time($input)
		},
		swap: function(forcedFormat) {
			switch_times($input, forcedFormat)
		},
	}

	if ($input.value === '' || /--/.test($input.value)) {
		apply_default($input)
		set_data_attribute($input, '')
	} else {
		update_time($input)
		set_data_attribute($input, $input.value)
	}

	bind_events($input)
}

if (window) window.TimePolyfill = TimePolyfill
if (module) module.exports = TimePolyfill
