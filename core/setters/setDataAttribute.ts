import type { String12hr, String24hr } from '@time-input-polyfill/utils'
import { provideTimeString } from '../helpers/provideTimeStringAs'
import type { PolyfillInput } from '../types'

export function setDataAttribute($input: PolyfillInput, timeString: String12hr | String24hr) {
	if ($input.polyfill?.isEnabled) {
		$input.setAttribute('data-value', provideTimeString(timeString).as24hr())
	}
}
