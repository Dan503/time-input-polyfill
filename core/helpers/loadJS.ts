export default function loadJS(src, callback) {
	var script = document.createElement('script')
	script.src = src
	script.onload = callback
	document.head.appendChild(script)
}
