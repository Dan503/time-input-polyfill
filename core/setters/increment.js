import switch_mode from './switch_mode'
import nudge_time_segment from './nudge_time_segment'
import update_a11y from '../accessibility/update_a11y'

export default function increment($input, segment) {
	if (segment === 'mode') {
		switch_mode($input, 'AM')
	} else {
		nudge_time_segment($input, segment, 'up')
	}
	update_a11y($input, ['update'])
}
