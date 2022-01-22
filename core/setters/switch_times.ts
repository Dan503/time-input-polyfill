import set_time from './set_time'
import { PolyfillInput } from '../..'
import { convertString12hr, convertString24hr, isString12hr } from '@time-input-polyfill/utils'

export default function switch_times($input: PolyfillInput, format: 12 | 24) {
	var is12hr = format === 12 || isString12hr($input.value)
	const swappedTimeString = is12hr ? convertString12hr($input.value).to24hr() : convertString24hr($input.value).to12hr()
	set_time($input, swappedTimeString)
}
