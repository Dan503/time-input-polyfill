
var select_hrs = require('./select_hrs');
var select_min = require('./select_min');
var select_mode = require('./select_mode');

module.exports = function select_segment ($input, segment) {
	var actions = {
		hrs:  select_hrs,
		min:  select_min,
		mode: select_mode,
	};
	actions[segment]($input);
}
