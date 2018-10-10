
module.exports = function switch_mode (default_mode) {
	default_mode = default_mode || 'AM';
	var current_mode = get_values().mode;
	var new_mode = {
		'--' : default_mode,
		'AM' : 'PM',
		'PM' : 'AM',
	}[current_mode];
	set_value('mode', new_mode);
}
