import toArray from '../converters/toArray.js'

export default function _$$(selector) {
	var elements = document.querySelectorAll(selector)
	return toArray(elements)
}
