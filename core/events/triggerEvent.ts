import { PolyfillInput } from '../types'
import { createEvent } from './createEvent'

var inputEvent = createEvent('input')
var changeEvent = createEvent('change')

export function triggerEvent($input: PolyfillInput, eventName: 'input' | 'change') {
	var event = {
		input: inputEvent,
		change: changeEvent,
	}[eventName]

	if (canTriggerChange($input)) {
		$input.dispatchEvent(event)
	}
}

/** Browsers only send out input and change events if the time element has a full valid value */
function canTriggerChange($input: PolyfillInput) {
	return !/--/.test($input.polyfill?.proxy.value || '') && $input.polyfill?.isEnabled
}
