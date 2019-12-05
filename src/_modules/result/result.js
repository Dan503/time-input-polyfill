export default function($result, values) {
	var $list = $result.querySelector('.result__list')
	var $close = $result.querySelector('.result__close')

	var html = ''
	for (var label in values) {
		var value = values[label].replace(
			/^$/,
			'<span class="visually-hidden">blank</span>',
		)
		html =
			html +
			[
				'<div class="result__item">',
				'<dt class="result__label">',
				label,
				'</dt>',
				'<dd class="result__value">"',
				value,
				'"</dd>',
				'</div>',
			].join('')
	}
	$list.innerHTML = html
	$result.classList.add('-visible')

	$close.onclick = function() {
		$result.classList.remove('-visible')
	}
}
