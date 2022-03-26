import type { PolyfillInput } from '../types'
import { setTime } from './setTime'

export function updateTime($input: PolyfillInput): PolyfillInput {
	if ($input.polyfill?.isPolyfillEnabled) {
		setTime($input, $input.value)
	}
	return $input
}
