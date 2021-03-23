import apply_default from './core/setters/apply_default'
import update_time from './core/setters/update_time'
import set_data_attribute from './core/setters/set_data_attribute'
import bind_events from './core/events/bind_events'
import switch_times from './core/setters/switch_times'
import get_label from './core/getters/get_label'

import create_a11y_block from './core/accessibility/create_a11y_block'

var accessibility_block_created = false
var $a11y

function TimePolyfill($input, $label) {
	$input.setAttribute('autocomplete', 'off')

	// Prevent screen reader from announcing the default stuff
	$input.setAttribute('aria-hidden', true)

	if (!accessibility_block_created) {
		$a11y = create_a11y_block()
		accessibility_block_created = true
	}

	const label = $label ? $label.textContent : get_label($input)

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

if (window) {
	window.TimePolyfill = TimePolyfill
}

export default TimePolyfill
