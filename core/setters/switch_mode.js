
var get_values = require('../getters/get_values');
var set_value = require('../setters/set_value');

module.exports = function switch_mode ($input, default_mode) {
	default_mode = default_mode || 'AM';
	var current_mode = get_values($input).mode;
	var new_mode = {
		'--' : default_mode,
		'AM' : 'PM',
		'PM' : 'AM',
	}[current_mode];
	set_value($input, 'mode', new_mode);
}
