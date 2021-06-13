import get_current_segment from '../getters/get_current_segment.js'
import increment from '../setters/increment.js'

export default function increment_current_segment($input) {
	var current_segment = get_current_segment($input)
	increment($input, current_segment)
}
