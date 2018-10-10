
module.exports = function set_value (segment, value) {
	var values = get_values();
	values[segment] = value;
	var newInputVal = [
		leading_zero(values.hrs),':',
		leading_zero(values.min),' ',
		values.mode
	].join('');
	$input.value = newInputVal;
	select_segment(segment);
	set_data_attribute(newInputVal);
	trigger_both_events();
}
