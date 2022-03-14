import { convertString12hr, convertString24hr, isString12hr, isString24hr } from "@time-input-polyfill/utils";
import type { String12hr, String24hr } from "@time-input-polyfill/utils";

const errorMessage = (timeString: String12hr | String24hr): never => {
	throw new Error(`"${timeString}" is not a valid time string. Must be either in either 12 or 24 hour time format.`)
}

// TODO: Add this to @time-input-polyfill/utils
export const provideTimeString = {
	as24hr(timeString: String12hr | String24hr): string {
		if (isString12hr(timeString)) {
			return convertString12hr(timeString).to24hr()
		}
		if (isString24hr(timeString)) {
			return timeString
		}
		return errorMessage(timeString)
	},
	as12hr(timeString: String12hr | String24hr): string {
		if (isString12hr(timeString)) {
			return timeString
		}
		if (isString24hr(timeString)) {
			return convertString24hr(timeString).to12hr()
		}
		return errorMessage(timeString)
	}
}