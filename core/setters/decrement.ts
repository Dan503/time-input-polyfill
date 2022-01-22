import switch_mode from './switch_mode.js'
import nudge_time_segment from './nudge_time_segment.js'
import update_a11y from '../accessibility/update_a11y.js'

export default function decrement($input, segment) {
	if (segment === 'mode') {
		switch_mode($input, 'PM')
	} else {
		nudge_time_segment($input, segment, 'down')
	}
	update_a11y($input, ['update'])
}
