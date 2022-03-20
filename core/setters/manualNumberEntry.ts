import { getCursorSegment } from '@time-input-polyfill/utils'
import { PolyfillInput } from '../types'

export function manualNumberEntry($input: PolyfillInput, key: string) {
	if ($input.polyfill?.isEnabled) {
		var key_value = key.replace(/Digit|Numpad/i, '')
		var segment = getCursorSegment($input)
		// TODO: manualEntryLog should be updated to work better with `event.code` values
		$input.polyfill?.manualEntryLog[segment].add(key_value)
	}
}
