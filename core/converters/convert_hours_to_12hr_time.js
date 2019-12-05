module.exports = function convert_hours_to_12hr_time(hours) {
	return hours <= 12 ? (hours === 0 ? 12 : hours) : hours - 12
}
