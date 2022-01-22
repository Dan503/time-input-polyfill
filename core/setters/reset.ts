import { selectSegment } from '@time-input-polyfill/utils'
import apply_default from './apply_default'
import { PolyfillInput } from '../..'

export default function reset($input: PolyfillInput) {
	apply_default($input)
	selectSegment($input, 'hrs12')
}
