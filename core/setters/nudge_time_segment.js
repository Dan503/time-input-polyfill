var get_values = require('../getters/get_values')
var convert_hours_to_12hr_time = require('../converters/convert_hours_to_12hr_time')
var leading_zero = require('../converters/leading_zero')
var set_segment = require('./set_segment')

module.exports = function nudge_time_segment($input, segment, direction) {
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
