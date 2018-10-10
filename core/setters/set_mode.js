
module.exports = function set_mode (type) {
	var segment = get_current_segment();
	if (segment === 'mode') {
		set_value(segment, type);
	}
}
