
module.exports = function _$$ (selector) {
	var elements = document.querySelectorAll(selector);
	return Array.prototype.slice.call(elements, 0);
}
