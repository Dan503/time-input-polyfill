import type { String12hr, String24hr } from '@time-input-polyfill/utils'
import { getCursorSegment, selectSegment, provideTimeString } from '@time-input-polyfill/utils'
import type { PolyfillInput } from '../types'
import { setDataAttribute } from '../setters/setDataAttribute'

export function setTime($input: PolyfillInput, timeString: String12hr | String24hr) {
	if ($input.polyfill?.isPolyfillEnabled) {
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
