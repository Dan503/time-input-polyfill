import apply_default from './apply_default.js'
import select_segment from '../selectors/select_segment.js'

export default function reset($input) {
	apply_default($input)
	select_segment($input, 'hrs')
}
