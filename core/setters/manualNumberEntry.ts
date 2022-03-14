import { getCursorSegment } from '@time-input-polyfill/utils'
import { sortedNumberKeys } from '../staticValues/sortedNumberKeys'
import { PolyfillInput } from '../types'

export function manualNumberEntry($input: PolyfillInput, key: number) {
	var key_value = sortedNumberKeys[key]
	var segment = getCursorSegment($input)
	$input.polyfill?.manualEntryLog[segment].add(key_value.toString())
}
