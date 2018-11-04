
module.exports = function select_segment ($input, segment) {

	set_input_type();

	var actions = {
		hrs:  select(0, 2),
		min:  select(3, 5),
		mode: select(6, 8),
	};

	actions[segment]($input);

	function set_input_type() {
		var type = segment === 'mode' ? 'text' : 'tel';
		$input.setAttribute('type', type);
	}

	function select (start, end) {
		return function () {
			$input.setSelectionRange(start, end);
		}
	}
}
