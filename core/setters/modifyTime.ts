import { convertTimeObject, getInputValue, modifyTimeObject } from "@time-input-polyfill/utils";
import { PolyfillInput } from "../types";
import { setTime } from "./setTime";

const getNew12hrTime = ($input: PolyfillInput, direction: 'increment' | 'decrement') => {
	const currentTimeObject = getInputValue($input).asTimeObject()
	const newTimeObject = modifyTimeObject(currentTimeObject)[direction].cursorSegment($input).isolated()
	return convertTimeObject(newTimeObject).to12hr()
}

// Using an object incase I want to increment individual segments at same stage
export const increment = {
	cursorSegment($input: PolyfillInput) {
		if ($input.polyfill?.isPolyfillEnabled) {
			const new12hrTime = getNew12hrTime($input, 'increment')
			setTime($input, new12hrTime)
		}
	}
}

export const decrement = {
	cursorSegment($input: PolyfillInput) {
		if ($input.polyfill?.isPolyfillEnabled) {
			const new12hrTime = getNew12hrTime($input, 'decrement')
			setTime($input, new12hrTime)
		}
	}
}