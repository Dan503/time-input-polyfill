var get_values = require('../getters/get_values')
var leading_zero = require('../converters/leading_zero')
var select_segment = require('../selectors/select_segment')
var set_data_attribute = require('./set_data_attribute')
var trigger_both_events = require('../events/trigger_both_events')

module.exports = function set_segment($input, segment, value) {
	var values = get_values($input)
	values[segment] = value
	var newInputVal = [
		leading_zero(values.hrs),
		':',
		leading_zero(values.min),
		' ',
		values.mode,
	].join('')
	$input.value = newInputVal
	select_segment($input, segment)
	set_data_attribute($input, newInputVal)
	trigger_both_events($input)
}
