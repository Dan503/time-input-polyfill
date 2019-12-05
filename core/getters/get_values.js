import convert_number from '../converters/convert_number'

export default function get_values($input, timeString) {
	var value = timeString ? timeString : $input.value
	var regEx = /([0-9-]{1,2})\:([0-9-]{1,2})\s?(AM|PM|\-\-)?/
	var result = regEx.exec(value)

	return {
		hrs: convert_number(result[1]),
		min: convert_number(result[2]),
		mode: result[3],
	}
}
