
module.exports = function set_data_attribute(timeString_12hr){
	var filteredString = timeString_12hr.indexOf('-') > -1 ? '' : timeString_12hr;
	var time24hr = convert_to_24hr_time(filteredString);
	$input.setAttribute('data-value', time24hr);
}
