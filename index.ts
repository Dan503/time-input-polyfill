import apply_default from './core/setters/apply_default.js'
import update_time from './core/setters/update_time.js'
import set_data_attribute from './core/setters/set_data_attribute.js'
import bind_events from './core/events/bind_events.js'
import switch_times from './core/setters/switch_times.js'
import get_label from './core/getters/get_label.js'

import create_a11y_block from './core/accessibility/create_a11y_block.js'

export interface InputPolyfillProp {
	$a11y: HTMLDivElement,
	label: string,
	autoSwap: boolean,
	update: () => void,
	swap: (format: 12 | 24) => void,
}

export interface PolyfillInput extends HTMLInputElement {
	polyfill: InputPolyfillProp
}

let accessibility_block_created = false
let $a11y: HTMLDivElement

function TimePolyfill($input: PolyfillInput, $label: HTMLLabelElement) {
	$input.setAttribute('autocomplete', 'off')

	// Prevent screen reader from announcing the default stuff
	$input.setAttribute('aria-hidden', 'true')

	if (!accessibility_block_created) {
		$a11y = create_a11y_block()
		accessibility_block_created = true
	}

	const label = $label ? $label.textContent : get_label($input)

	$input.polyfill = {
		$a11y: $a11y,
		label: label,
		autoSwap: true,
		update: function () {
			update_time($input)
		},
		swap: function (forcedFormat) {
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
	(window as any).TimePolyfill = TimePolyfill
}

export default TimePolyfill
