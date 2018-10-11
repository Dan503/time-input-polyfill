
var toArray = require('../converters/toArray');

module.exports = function _$$ (selector) {
	var elements = document.querySelectorAll(selector);
	return toArray(elements);
}
