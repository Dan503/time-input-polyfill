import get_current_segment from '../getters/get_current_segment'
import set_segment from './set_segment'
import next_segment from '../selectors/next_segment'

import manual_entry_log from '../helpers/manual_entry_log'
import sorted_number_keys from '../static-values/sorted_number_keys'

export default function manual_number_entry($input, key) {
	var key_value = sorted_number_keys[key]
	var segment = get_current_segment($input)

	if (segment !== 'mode') {
		var entry_count = manual_entry_log.items().length

		var upper_limits = {
			hrs: [1, 2],
			min: [5, 9],
		}
		var limit = upper_limits[segment][entry_count]

		if (entry_count < 2) {
			manual_entry_log.add(key_value)
		}

		var full_limit = parseInt(upper_limits[segment].join(''))
		var full_entry = parseInt(manual_entry_log.items().join(''))

		if (full_limit >= full_entry) {
			set_segment($input, segment, full_entry)
		}

		var at_limit =
			key_value > limit || manual_entry_log.items().length === 2

		if (at_limit) {
			next_segment($input)
		}
	}
}
