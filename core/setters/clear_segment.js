
var set_value = require('./set_value');

module.exports = function clear_segment ($input, segment) {
	set_value($input, segment, '--');
}
