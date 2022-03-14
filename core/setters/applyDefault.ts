// I need to keep this separate from reset so that
// I can reset without attracting focus
import { triggerInputAndChangeEvents } from '../events/triggerInputAndChange'
import { setTime } from '../setters/setTime'
import { PolyfillInput } from '../types'
import { setDataAttribute } from './setDataAttribute'

export function applyDefault($input: PolyfillInput) {
	setTime($input, '')
	setDataAttribute($input, '')
	triggerInputAndChangeEvents($input)
}
