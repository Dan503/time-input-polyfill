import switch_mode from './switch_mode'
import nudge_time_segment from './nudge_time_segment'
import update_a11y from '../accessibility/update_a11y'

export default function decrement($input, segment) {
	if (segment === 'mode') {
		switch_mode($input, 'PM')
	} else {
		nudge_time_segment($input, segment, 'down')
	}
	update_a11y($input, ['update'])
}
