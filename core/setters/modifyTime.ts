import { convertTimeObject, getCursorSegment, getInputValue, modifyTimeObject, Segment } from "@time-input-polyfill/utils";
import { PolyfillInput } from "../..";
import set_time from "./set_time";

const getNew24hrTime = ($input: PolyfillInput, direction: 'increment' | 'decrement') => {
	const currentTimeObject = getInputValue($input).asTimeObject()
	const newTimeObject = modifyTimeObject(currentTimeObject)[direction].cursorSegment($input).isolated()
	return convertTimeObject(newTimeObject).to24hr()
}

export const increment = {
	cursorSegment($input: PolyfillInput) {
		const new24hrTime = getNew24hrTime($input, 'increment')
		set_time($input, new24hrTime)
	}
}

export const decrement = {
	cursorSegment($input: PolyfillInput) {
		const new24hrTime = getNew24hrTime($input, 'decrement')
		set_time($input, new24hrTime)
	}
}