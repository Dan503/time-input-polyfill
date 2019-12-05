var get_current_segment = require('../getters/get_current_segment')
var select_segment = require('./select_segment')

module.exports = function select_cursor_segment($input) {
	var current_segment = get_current_segment($input)
	select_segment($input, current_segment)
}
