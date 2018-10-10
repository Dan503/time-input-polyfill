
module.exports = function traverse (direction) {
	var segment = get_current_segment();

	var modifier = direction === 'next' ? 1 : -1;
	var next_segment_index = segments.indexOf(segment) + modifier;

	var next_segment = {
		next: segments[next_segment_index] || 'mode',
		prev: next_segment_index < 0 ? 'hrs' : segments[next_segment_index],
	}[direction];

	select_segment(next_segment);
	clear_manual_entry_log();
}
