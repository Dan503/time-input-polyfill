export default function convert_number(number) {
	return isNaN(number) ? number : parseInt(number)
}
