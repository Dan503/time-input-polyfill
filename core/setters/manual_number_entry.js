
module.exports = function manual_number_entry(key) {
	var key_value = sorted_number_keys[key];
	var segment = get_current_segment();

	if (segment !== 'mode') {
		var entry_count = manual_entry_log.length;

		var upper_limits = {
			hrs: [1,2],
			min: [5,9],
		}
		var limit = upper_limits[segment][entry_count];

		if (entry_count < 2) {
			manual_entry_log.push(key_value);
		}

		var full_limit = parseInt(upper_limits[segment].join(''));
		var full_entry = parseInt(manual_entry_log.join(''));

		if (full_limit >= full_entry) {
			set_value(segment, full_entry);
		}

		var at_limit = key_value > limit || manual_entry_log.length === 2;

		if (at_limit) {
			next_segment();
		}
	}
}
