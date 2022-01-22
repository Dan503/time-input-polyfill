//Code for tracking Google Analytics events
export default function GA_trackEvent(action, categoryLabelValue) {
	if (typeof gtag !== 'undefined') {
		if (categoryLabelValue) {
			gtag('event', action, {
				event_category: categoryLabelValue[0],
				event_label: categoryLabelValue[1],
				value: categoryLabelValue[2],
			})
		} else {
			gtag('event', action)
		}
	} else {
		categoryLabelValue = {}
		var data = {
			action: action,
			event_category: categoryLabelValue.category || 'general',
			event_label: categoryLabelValue.label || '(not set)',
			value: categoryLabelValue.value,
		}

		console.log('GA event =', data, '* = required')
	}
}
