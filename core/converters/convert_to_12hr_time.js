
module.exports = function convert_to_12hr_time (timeString_24hr) {
	var twentyFour_regex = /([0-9]{2})\:([0-9]{2})/;
	var result = twentyFour_regex.exec(timeString_24hr);
	var hrs_24 = convert_number(result[1]);
	var min = result[2];
	var hrs_12 = convert_hours_to_12hr_time(hrs_24);
	var isPM = hrs_24 > 12;
	var mode = isPM ? 'PM' : 'AM';
	return [leading_zero(hrs_12), ':', min, ' ', mode].join('');
}
