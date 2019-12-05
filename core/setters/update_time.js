import set_time from '../setters/set_time'

export default function update_time($input) {
	set_time($input, $input.value)
	return $input
}
