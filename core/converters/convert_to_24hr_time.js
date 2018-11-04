
var leading_zero = require('./leading_zero');

module.exports = function convert_to_24hr_time (timeString_12hr) {
	if (/-/.test(timeString_12hr)) return '';
	var isPM = timeString_12hr.indexOf('PM') > -1;
	var timeResult = /^([0-9]{2})/.exec(timeString_12hr);
	var hrs = timeResult ? parseInt(timeResult[1]) : '';
	var newHrs;
	if (hrs === 12) {
		newHrs = isPM ? 12 : 00;
	} else {
		newHrs = isPM ? hrs + 12 : hrs;
	}
	var finalHrs = newHrs === 24 ? 0 : newHrs;
	var timeRegEx = /^[0-9]{2}:([0-9]{2}) (AM|PM)/;
	return timeString_12hr.replace(timeRegEx, leading_zero(finalHrs)+':$1');
}
