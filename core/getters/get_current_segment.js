
module.exports = function get_current_segment () {
	var selection = get_selected_range();
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
