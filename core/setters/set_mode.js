import get_current_segment from '../getters/get_current_segment.js'
import set_segment from './set_segment.js'

export default function set_mode($input, type) {
	var segment = get_current_segment($input)
	if (segment === 'mode') {
		set_segment($input, segment, type)
	}
}
