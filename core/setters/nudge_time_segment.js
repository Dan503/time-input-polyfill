import get_values from '../getters/get_values'
import convert_hours_to_12hr_time from '../converters/convert_hours_to_12hr_time'
import leading_zero from '../converters/leading_zero'
import set_segment from './set_segment'

export default function nudge_time_segment($input, segment, direction) {
	var current_values = get_values($input)
	var time

	var modifier = direction === 'up' ? 1 : -1

	if (current_values[segment] === '--') {
		var current_time = new Date()
		time = {
			hrs: convert_hours_to_12hr_time(current_time.getHours()),
			min: current_time.getMinutes(),
		}
	} else {
		var minutes = {
			up: current_values.min < 59 ? current_values.min + modifier : 0,
			down: current_values.min === 0 ? 59 : current_values.min + modifier,
		}
		time = {
			hrs: convert_hours_to_12hr_time(current_values.hrs + modifier),
			min: minutes[direction],
		}
	}

	set_segment($input, segment, leading_zero(time[segment]))
}
