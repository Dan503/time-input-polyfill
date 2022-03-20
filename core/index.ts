import { applyDefault, setTime, swapToTimeFormat, updateTime } from './setters'
import { bindEvents } from './events'
// import set_data_attribute from './core/setters/set_data_attribute'
// import bind_events from './core/events/bind_events'
// import switch_times from './core/setters/switch_times'

import { a11yCreate, getInputValue, ManualEntryLog, selectNextSegment, getLabelTextOf, convertString12hr, convertString24hr, convertTimeObject } from '@time-input-polyfill/utils'
import { extendedWindow } from './helpers/Window'
import type { PolyfillInput } from './types'
import { provideTimeString } from './helpers/provideTimeStringAs'

let isA11yBlockCreated = false
let $a11y: HTMLDivElement

const CLASS_NAME = 'time-input-polyfill-applied'

const styleTag = document.createElement('style')
styleTag.innerHTML = `.${CLASS_NAME} { font-family: monospace; }`
document.head.appendChild(styleTag)

function TimeInputPolyfill($input: PolyfillInput, document?: Document, proxyHandler: ProxyHandler<PolyfillInput> = {}): void {
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
		proxy: new Proxy($input, proxyHandler),
		enable() {
			if ($input.polyfill) {
				$input.polyfill.isEnabled = true
				$input.type = 'text'
				$input.polyfill.proxy.value = convertString24hr($input.polyfill.proxy.value).to12hr()
			}
		},
		disable() {
			if ($input.polyfill) {
				$input.polyfill.isEnabled = false
				$input.polyfill.proxy.value = convertString12hr($input.polyfill.proxy.value).to24hr()
				$input.type = 'time'
			}
		},
		$a11y: $a11y,
		label: label,
		autoSwap: true,
		update() {
			updateTime($input)
		},
		onUpdate(callback) {
			const string12hr = provideTimeString($input.value).as12hr()

			const timeObject = convertString12hr(string12hr).toTimeObject()
			// converting from time objects is slightly more efficient
			const string24hr = convertTimeObject(timeObject).to24hr()

			callback({ string12hr, string24hr, timeObject, })
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

	if ($input.polyfill.proxy.value === '' || /--/.test($input.polyfill.proxy.value)) {
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
