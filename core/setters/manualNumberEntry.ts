import { getCursorSegment } from '@time-input-polyfill/utils'
import { PolyfillInput } from '../types'

export function manualNumberEntry($input: PolyfillInput, key: string) {
	if ($input.polyfill?.isPolyfillEnabled) {
		var key_value = key.replace(/Digit|Numpad/i, '')
		var segment = getCursorSegment($input)
		$input.polyfill?.manualEntryLog[segment].add(key_value)
	}
}
