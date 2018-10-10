
var get_current_segment = require('../getters/get_current_segment');
var set_value = require('../setters/set_value');

module.exports = function set_mode ($input, type) {
	var segment = get_current_segment($input);
	if (segment === 'mode') {
		set_value($input, segment, type);
	}
}
