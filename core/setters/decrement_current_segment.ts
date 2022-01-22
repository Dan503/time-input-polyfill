import get_current_segment from '../getters/get_current_segment.js'
import decrement from '../setters/decrement.js'

export default function decrement_current_segment($input) {
	var current_segment = get_current_segment($input)
	decrement($input, current_segment)
}
