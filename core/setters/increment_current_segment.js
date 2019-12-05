var get_current_segment = require('../getters/get_current_segment')
var increment = require('../setters/increment')

module.exports = function increment_current_segment($input) {
	var current_segment = get_current_segment($input)
	increment($input, current_segment)
}
