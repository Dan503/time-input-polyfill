interface ResultValues {
	[label: string]: string
}

export default function ($result: HTMLDivElement | null, values: ResultValues): void {
	var $list = $result?.querySelector<HTMLDListElement>('.result__list')
	var $close = $result?.querySelector<HTMLButtonElement>('.result__close')

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
	if ($list) $list.innerHTML = html

	$result?.classList.add('-visible')

	if ($close) {
		$close.onclick = function () {
			$result?.classList.remove('-visible')
		}
	}
}
