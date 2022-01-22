import { sorted_number_keys } from '../static-values/sorted_number_keys'
import { PolyfillInput } from '../..'
import { getCursorSegment } from '@time-input-polyfill/utils'

export default function manual_number_entry($input: PolyfillInput, key: number) {
	var key_value = sorted_number_keys[key]
	var segment = getCursorSegment($input)
	$input.polyfill?.manualEntryLog[segment].add(key_value.toString())
}
