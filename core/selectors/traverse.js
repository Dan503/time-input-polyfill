
var get_current_segment = require('../getters/get_current_segment');
var select_segment = require('../selectors/select_segment');

var manual_entry_log = require('../helpers/manual_entry_log');
var segments = require('../static-values/segments');

module.exports = function traverse ($input, direction) {
	var segment = get_current_segment($input);

	var modifier = direction === 'next' ? 1 : -1;
	var next_segment_index = segments.indexOf(segment) + modifier;

	var next_segment = {
		next: segments[next_segment_index] || 'mode',
		prev: next_segment_index < 0 ? 'hrs' : segments[next_segment_index],
	}[direction];

	select_segment($input, next_segment);
	manual_entry_log.clear();
}
