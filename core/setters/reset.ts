import { selectSegment } from '@time-input-polyfill/utils'
import { applyDefault } from './applyDefault'
import { PolyfillInput } from '../types'

export function reset($input: PolyfillInput) {
	if ($input.polyfill?.isEnabled) {
		applyDefault($input)
		selectSegment($input, 'hrs12')
	}
}
