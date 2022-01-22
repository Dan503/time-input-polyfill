import { convertString12hr } from '@time-input-polyfill/utils'
import { PolyfillInput } from '../../index'

export default function set_data_attribute($input: PolyfillInput, timeString_12hr: string) {
	var filteredString =
		timeString_12hr.indexOf('-') > -1 ? '' : timeString_12hr
	var time24hr = convertString12hr(filteredString).to24hr()
	$input.setAttribute('data-value', time24hr)
}
