module.exports = function leading_zero(number) {
	if (isNaN(number)) return number
	var purified = parseInt(number)
	return purified < 10 ? '0' + purified : number
}
