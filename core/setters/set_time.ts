import { convertString24hr } from '@time-input-polyfill/utils'
import { PolyfillInput } from '../../index'
import set_data_attribute from '../setters/set_data_attribute'

export default function set_time($input: PolyfillInput, time_string_24hr: string) {
	var twelveHr = convertString24hr(time_string_24hr).to12hr()
	$input.value = twelveHr
	set_data_attribute($input, time_string_24hr)
}
