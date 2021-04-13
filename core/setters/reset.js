import apply_default from './apply_default'
import select_segment from '../selectors/select_segment'

export default function reset($input) {
	apply_default($input)
	select_segment($input, 'hrs')
}
