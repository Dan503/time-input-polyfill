import type { PolyfillInput } from '../types'
import { setTime } from './setTime'

export function updateTime($input: PolyfillInput): PolyfillInput {
	setTime($input, $input.value)
	return $input
}
