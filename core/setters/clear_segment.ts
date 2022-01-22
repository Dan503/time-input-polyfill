import set_segment from './set_segment'
import { a11yUpdate, Segment } from '@time-input-polyfill/utils'
import { PolyfillInput } from '../..'

export default function clear_segment($input: PolyfillInput, segment: Segment) {
	set_segment($input, segment, null)
	a11yUpdate($input, ['update'])
}
