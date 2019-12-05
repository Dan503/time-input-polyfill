module.exports = function convert_number(number) {
	return isNaN(number) ? number : parseInt(number)
}
