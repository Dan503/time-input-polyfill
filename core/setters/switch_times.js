import switch_to_data_value from './switch_to_data_value.js'
import set_time from './set_time.js'

export default function switch_times($input, format) {
	var is12hr = /\s/.test($input.value)

	if (format != 12 && format != 24) {
		format = is12hr ? 24 : 12
	}

	var actions = {
		12: function () {
			if (!is12hr) {
				set_time($input, $input.dataset.value)
			}
		},
		24: function () {
			if (is12hr) {
				switch_to_data_value($input)
			}
		},
	}
	actions[format]()
}
