import all_number_keys from './all_number_keys.js'

var sorted_number_keys = {}
// sorted_number_keys = { 48: 0, 49: 1, 96: 0, 97: 1, ... };
all_number_keys.forEach(function (key, index) {
	var number_val = index > 9 ? index - 10 : index
	sorted_number_keys[key] = number_val
})

export default sorted_number_keys
