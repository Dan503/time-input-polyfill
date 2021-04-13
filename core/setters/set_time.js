import convert_to_12hr_time from '../converters/convert_to_12hr_time'
import set_data_attribute from '../setters/set_data_attribute'

export default function set_time($input, time_string_24hr) {
	var twelveHr = convert_to_12hr_time(time_string_24hr)
	$input.value = twelveHr
	set_data_attribute($input, time_string_24hr)
}
