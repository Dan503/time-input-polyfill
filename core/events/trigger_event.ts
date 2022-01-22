import { PolyfillInput } from '../..'
import create_event from './create_event'

var inputEvent = create_event('input')
var changeEvent = create_event('change')

export default function trigger_event($input: PolyfillInput, eventName: 'input' | 'change') {
	var event = {
		input: inputEvent,
		change: changeEvent,
	}[eventName]

	if (can_trigger_change($input)) {
		$input.dispatchEvent(event)
	}
}

// Browsers only send out input and change events if the time element has a full valid value
function can_trigger_change($input: PolyfillInput) {
	return !/--/.test($input.value)
}
