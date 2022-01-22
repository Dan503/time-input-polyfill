import { PolyfillInput } from '../../index'
import set_time from '../setters/set_time'

export default function update_time($input: PolyfillInput): PolyfillInput {
	set_time($input, $input.value)
	return $input
}
