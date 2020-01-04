export default function create_accessibility_block() {
	var $block = document.createElement('div')
	$block.setAttribute('aria-live', 'assertive')
	$block.setAttribute(
		'style',
		'position: absolute; opacity: 0; height: 0; width: 0; overflow: hidden; pointer-events: none;'
	)
	$block.classList.add('time-input-polyfill-accessibility-block')
	document.querySelector('body').appendChild($block)
	return $block
}
