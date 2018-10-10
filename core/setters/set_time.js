
module.exports = function set_time(time_string_24hr) {
	var twelveHr = convert_to_12hr_time(time_string_24hr);
	$input.value = twelveHr;
	set_data_attribute(time_string_24hr);
}

