// Needed for compiling into a single file
import 'requirejs'

import apply_default from './core/setters/apply_default'
import update_time from './core/setters/update_time'
import set_data_attribute from './core/setters/set_data_attribute'
import bind_events from './core/events/bind_events'
import switch_times from './core/setters/switch_times'

import { a11yCreate, getInputValue, ManualEntryLog, selectNextSegment, getLabelTextOf } from '@time-input-polyfill/utils'
import { extendedWindow } from './Window'

export interface InputPolyfillProp {
	$a11y: HTMLDivElement,
	label: string,
	autoSwap: boolean,
	update: () => void,
	swap: (format: 12 | 24) => void,
	manualEntryLog: ManualEntryLog
}

export interface PolyfillInput extends HTMLInputElement {
	polyfill?: InputPolyfillProp
}

export type TimePolyfillFn = ($input: PolyfillInput, document?: Document) => void

let accessibility_block_created = false
let $a11y: HTMLDivElement

const TimePolyfill = function ($input: PolyfillInput, document?: Document): void {
	$input.setAttribute('autocomplete', 'off')

	// Prevent screen reader from announcing the default stuff
	$input.setAttribute('aria-hidden', 'true')

	if (!accessibility_block_created) {
		$a11y = a11yCreate()
		accessibility_block_created = true
	}

	const label = getLabelTextOf($input, document)

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
		manualEntryLog: new ManualEntryLog({
			timeObject: getInputValue($input).asTimeObject(),
			onUpdate(entryLog) {
				$input.value = entryLog.fullValue12hr
			},
			onLimitHit() {
				selectNextSegment($input)
			}
		})
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

if (extendedWindow) {
	extendedWindow.TimePolyfill = TimePolyfill
}

export default TimePolyfill
