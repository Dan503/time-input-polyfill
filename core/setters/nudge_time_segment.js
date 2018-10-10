
module.exports = function nudge_time_segment (segment, direction) {
	var current_values = get_values();
	var time;

	var modifier = direction === 'up' ? 1 : -1;

	if (current_values[segment] === '--') {
		var current_time = new Date();
		time = {
			hrs: convert_hours_to_12hr_time(current_time.getHours()),
			min: current_time.getMinutes(),
		}
	} else {
		var minutes = {
			up : current_values.min < 59 ? current_values.min + modifier : 0,
			down : current_values.min === 0 ? 59 : current_values.min + modifier,
		}
		time = {
			hrs: convert_hours_to_12hr_time(current_values.hrs + modifier),
			min: minutes[direction],
		}
	}

	set_value(segment, leading_zero(time[segment]) );
}
