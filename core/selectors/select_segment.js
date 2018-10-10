
module.exports = function select_segment (segment) {
	var actions = {
		hrs:  select_hrs,
		min:  select_min,
		mode: select_mode,
	};
	actions[segment]();
}
