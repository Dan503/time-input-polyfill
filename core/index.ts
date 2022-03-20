import { applyDefault, setTime, swapToTimeFormat, updateTime } from './setters'
import { bindEvents } from './events'
// import set_data_attribute from './core/setters/set_data_attribute'
// import bind_events from './core/events/bind_events'
// import switch_times from './core/setters/switch_times'

import { a11yCreate, getInputValue, ManualEntryLog, selectNextSegment, getLabelTextOf, convertString12hr, convertString24hr } from '@time-input-polyfill/utils'
import { extendedWindow } from './helpers/Window'
import type { PolyfillInput } from './types'

let isA11yBlockCreated = false
let $a11y: HTMLDivElement

const CLASS_NAME = 'time-input-polyfill-applied'

const styleTag = document.createElement('style')
styleTag.innerHTML = `.${CLASS_NAME} { font-family: monospace; }`
document.head.appendChild(styleTag)

function TimeInputPolyfill($input: PolyfillInput, document?: Document): void {
	$input.setAttribute('autocomplete', 'off')

	// Prevent screen reader from announcing the default stuff
	$input.setAttribute('aria-hidden', 'true')

	// Applies the monospace font styling without being too hard to overwrite
	$input.className += ` ${CLASS_NAME}`

	if (!isA11yBlockCreated) {
		$a11y = a11yCreate()
		isA11yBlockCreated = true
	}

	const label = getLabelTextOf($input, document)

	$input.polyfill = {
		isEnabled: true,
		enable() {
			if ($input.polyfill) {
				$input.polyfill.isEnabled = true
				const currentValue = $input.value
				$input.value = convertString24hr(currentValue).to12hr()
			}
		},
		disable() {
			if ($input.polyfill) {
				$input.polyfill.isEnabled = false
				const currentValue = $input.value
				$input.value = convertString12hr(currentValue).to24hr()
			}
		},
		$a11y: $a11y,
		label: label,
		autoSwap: true,
		update() {
			updateTime($input)
		},
		swap(forcedFormat) {
			swapToTimeFormat($input, forcedFormat)
		},
		manualEntryLog: new ManualEntryLog({
			timeObject: getInputValue($input).asTimeObject(),
			onUpdate(entryLog) {
				setTime($input, entryLog.fullValue12hr)
			},
			onLimitHit() {
				selectNextSegment($input)
			}
		})
	}

	if ($input.value === '' || /--/.test($input.value)) {
		applyDefault($input)
	} else {
		updateTime($input)
	}

	bindEvents($input)
}

if (extendedWindow) {
	extendedWindow.TimePolyfill = TimeInputPolyfill
}

export default TimeInputPolyfill

export { TimeInputPolyfill }
