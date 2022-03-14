import { convertString12hr, convertString24hr, isString12hr } from '@time-input-polyfill/utils'
import { setTime } from './setTime'
import { PolyfillInput } from '../types'

export function swapToTimeFormat($input: PolyfillInput, format: 12 | 24) {
	var is12hr = format === 12 || isString12hr($input.value)
	const swappedTimeString = is12hr ? convertString12hr($input.value).to24hr() : convertString24hr($input.value).to12hr()
	setTime($input, swappedTimeString)
}
