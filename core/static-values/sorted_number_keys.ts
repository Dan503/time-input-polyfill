import { all_number_keys, ZeroToNine } from './all_number_keys'

export { ZeroToNine }

// { 48: 0, 49: 1, 96: 0, 97: 1, ... };
export type SortedNumberKeys = Record<number, ZeroToNine>

let sorted_number_keys = {} as SortedNumberKeys

all_number_keys.forEach(function (key: number, index): void {
	var number_val = (index > 9 ? index - 10 : index) as ZeroToNine
	sorted_number_keys[key] = number_val
})

export { sorted_number_keys }
