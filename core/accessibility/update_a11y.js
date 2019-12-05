var get_current_segment = require('../getters/get_current_segment')
var get_values = require('../getters/get_values')

module.exports = function update_a11y($input, announcementArray) {
	// Timeout helps ensure that the input has stabilized
	setTimeout(function() {
		var current_segment = get_current_segment($input)
		var values = get_values($input)
		var value = values[current_segment]
		var finalValue = value == '--' ? 'blank' : value

		var segmentName = {
			hrs: 'Hours',
			min: 'Minutes',
			mode: 'AM/PM',
		}[current_segment]

		var announcements = {
			initial: '$label grouping $fullValue.',
			select: '$segmentName spin button $segmentValue.',
			update: '$segmentValue.',
		}

		var textArray = announcementArray.map(function(providedString) {
			if (announcements[providedString]) {
				return announcements[providedString]
			}
			return providedString
		})

		var fullValue = $input.value.replace(/--/g, 'blank')

		var html = '<p>' + textArray.join('</p><p>') + '</p>'
		html = html.replace(/\$label/g, $input.polyfill.label)
		html = html.replace(/\$segmentName/g, segmentName)
		html = html.replace(/\$segmentValue/g, finalValue)
		html = html.replace(/\$fullValue/g, fullValue)

		$input.polyfill.$a11y.innerHTML = html
	}, 1)
}
