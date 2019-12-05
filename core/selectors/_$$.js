import toArray from '../converters/toArray'

export default function _$$(selector) {
	var elements = document.querySelectorAll(selector)
	return toArray(elements)
}
