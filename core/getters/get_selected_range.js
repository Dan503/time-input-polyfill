export default function get_selected_range($input) {
	return { start: $input.selectionStart, end: $input.selectionEnd }
}
