var get_ancestors = require('./get_ancestors')

module.exports = function get_label($input) {
	var labelText =
		aria_labelledby($input) ||
		aria_label($input) ||
		for_attribute($input) ||
		label_wrapper_element($input) ||
		title_attribute($input)

	if (labelText) return labelText

	console.error('Label text for input not found.', $input)
	throw new Error('Cannot polyfill time input due to a missing label.')
}

function aria_labelledby($input) {
	var ariaLabelByID = $input.getAttribute('aria-labelledby')
	if (ariaLabelByID) {
		var $ariaLabelBy = document.getElementById(ariaLabelByID)
		if ($ariaLabelBy) return $ariaLabelBy.textContent
	}
	return false
}

function aria_label($input) {
	var ariaLabel = $input.getAttribute('aria-label')
	if (ariaLabel) return ariaLabel
	return false
}

function for_attribute($input) {
	if ($input.id) {
		var $forLabel = document.querySelector('label[for="' + $input.id + '"]')
		if ($forLabel) return $forLabel.textContent
	}
	return false
}

function label_wrapper_element($input) {
	var ancestors = get_ancestors($input, 'label')
	var $parentLabel = ancestors[ancestors.length - 1]
	if ($parentLabel.nodeName == 'LABEL') return $parentLabel.textContent
	return false
}

function title_attribute($input) {
	var titleLabel = $input.getAttribute('title')
	if (titleLabel) return titleLabel
	return false
}
