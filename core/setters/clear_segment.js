
var set_value = require('./set_value');

module.exports = function clear_segment (segment) {
	set_value(segment, '--');
}
