import get_current_segment from '../getters/get_current_segment'
import select_segment from '../selectors/select_segment'

import manual_entry_log from '../helpers/manual_entry_log'
import segments from '../static-values/segments'

import update_a11y from '../accessibility/update_a11y'

export default function traverse($input, direction) {
	var segment = get_current_segment($input)

	var modifier = direction === 'next' ? 1 : -1
	var next_segment_index = segments.indexOf(segment) + modifier

	var next_segment = {
		next: segments[next_segment_index] || 'mode',
		prev: next_segment_index < 0 ? 'hrs' : segments[next_segment_index],
	}[direction]

	select_segment($input, next_segment)
	manual_entry_log.clear()
	update_a11y($input, ['select'])
}
