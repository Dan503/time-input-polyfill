import { convertString12hr, convertString24hr, isString12hr, isString24hr } from "@time-input-polyfill/utils";
import type { String12hr, String24hr } from "@time-input-polyfill/utils";

// TODO: Add this to @time-input-polyfill/utils
export const provideTimeString = (timeString: String12hr | String24hr) => {
	const is12hr = isString12hr(timeString)
	const is24hr = isString24hr(timeString)

	if (!is12hr && !is24hr) {
		throw new Error(`"${timeString}" is not a valid time string. Must be either in either 12 or 24 hour time format.`)
	}

	return ({
		as24hr(): string {
			if (is12hr) {
				return convertString12hr(timeString).to24hr()
			}
			return timeString
		},
		as12hr(): string {
			if (is24hr) {
				return convertString24hr(timeString).to12hr()
			}
			return timeString
		}
	})
}