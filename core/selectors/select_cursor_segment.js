import get_current_segment from '../getters/get_current_segment'
import select_segment from './select_segment'

export default function select_cursor_segment($input) {
	var current_segment = get_current_segment($input)
	select_segment($input, current_segment)
}
