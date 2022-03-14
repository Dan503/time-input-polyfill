import { allNumberKeys } from './allNumberKeys'
import type { ZeroToNine } from './allNumberKeys'

export { ZeroToNine }

// { 48: 0, 49: 1, 96: 0, 97: 1, ... };
export type SortedNumberKeys = Record<number, ZeroToNine>

export let sortedNumberKeys = {} as SortedNumberKeys

allNumberKeys.forEach((key: number, index): void => {
	var number_val = (index > 9 ? index - 10 : index) as ZeroToNine
	sortedNumberKeys[key] = number_val
})
