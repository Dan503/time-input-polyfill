import get_values from '../getters/get_values.js'
import set_segment from './set_segment.js'

export default function switch_mode($input, default_mode) {
	default_mode = default_mode || 'AM'
	var current_mode = get_values($input).mode
	var new_mode = {
		'--': default_mode,
		AM: 'PM',
		PM: 'AM',
	}[current_mode]
	set_segment($input, 'mode', new_mode)
}
