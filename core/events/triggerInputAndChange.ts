import { PolyfillInput } from '../types'
import { triggerEvent } from './triggerEvent'

// It seems that oninput and onchange are treated the same way by browsers :/
export function triggerInputAndChangeEvents($input: PolyfillInput) {
	// the event only ever fires if there is a full valid value available
	triggerEvent($input, 'input')
	triggerEvent($input, 'change')
}
