import { a11yUpdate, Segment } from '@time-input-polyfill/utils'
import { setSegment } from './setSegment'
import { PolyfillInput } from '../types'

export function clearSegment($input: PolyfillInput, segment: Segment) {
	setSegment($input, segment, null)
	a11yUpdate($input, ['update'])
}
