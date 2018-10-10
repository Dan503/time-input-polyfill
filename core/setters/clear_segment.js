
var set_segment = require('./set_segment');

module.exports = function clear_segment ($input, segment) {
	set_segment($input, segment, '--');
}
