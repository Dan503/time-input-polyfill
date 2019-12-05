// IE11 doesn't support Object.values()
export default function values(obj) {
	var key_values = []
	for (var key in obj) {
		key_values.push(obj[key])
	}
	return key_values
}
