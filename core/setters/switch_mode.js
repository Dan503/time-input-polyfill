var get_values = require('../getters/get_values')
var set_segment = require('./set_segment')

module.exports = function switch_mode($input, default_mode) {
	default_mode = default_mode || 'AM'
	var current_mode = get_values($input).mode
	var new_mode = {
		'--': default_mode,
		AM: 'PM',
		PM: 'AM',
	}[current_mode]
	set_segment($input, 'mode', new_mode)
}
