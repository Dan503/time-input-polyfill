var apply_default = require('./apply_default')
var select_segment = require('../selectors/select_segment')

module.exports = function reset($input) {
	apply_default($input)
	select_segment($input, 'hrs')
}
