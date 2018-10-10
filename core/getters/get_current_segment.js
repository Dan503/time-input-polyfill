
var ranges = require('../static-values/ranges');
var get_selected_range = require('./get_selected_range');

module.exports = function get_current_segment ($input) {
	var selection = get_selected_range($input);
	for (var segment in ranges) {
		var range = ranges[segment];
		var aboveMin = range.start <= selection.start;
		var belowMax = range.end >= selection.end;
		if (aboveMin && belowMax) {
			return segment;
		}
	}
	return 'hrs';
}
