import { getCursorSegment, selectNextSegment, selectPrevSegment } from '@time-input-polyfill/utils'
import { PolyfillInput } from '../types'

export function handleTab($input: PolyfillInput, e: KeyboardEvent) {
	if ($input.polyfill?.isPolyfillEnabled) {
		var current_segment = getCursorSegment($input)
		var backwards_and_first = e.shiftKey && current_segment === 'hrs12'
		var forwards_and_last = !e.shiftKey && current_segment === 'mode'

		if (!backwards_and_first && !forwards_and_last) {
			e.preventDefault()
			if (e.shiftKey) {
				selectPrevSegment($input)
			} else {
				selectNextSegment($input)
			}
		}
	}
}
