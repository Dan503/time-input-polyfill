import set_time from '../setters/set_time.js'

export default function update_time($input) {
	set_time($input, $input.value)
	return $input
}
