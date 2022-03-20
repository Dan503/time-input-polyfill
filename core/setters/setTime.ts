import type { String12hr, String24hr } from '@time-input-polyfill/utils'
import { PolyfillInput } from '../types'
import { setDataAttribute } from '../setters/setDataAttribute'
import { provideTimeString } from '../helpers/provideTimeStringAs'
import { getCursorSegment, selectSegment } from '@time-input-polyfill/utils'

export function setTime($input: PolyfillInput, timeString: String12hr | String24hr) {
	if ($input.polyfill?.isEnabled) {
		const hasFocus = document.activeElement === $input
		const cursorSegment = hasFocus ? getCursorSegment($input) : null
		const string12hr = provideTimeString(timeString).as12hr()
		$input.value = string12hr
		setDataAttribute($input, timeString)

		if (cursorSegment) {
			selectSegment($input, cursorSegment)
		}
	}
}
