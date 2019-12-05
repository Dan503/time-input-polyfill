var trigger_event = require('./trigger_event')

// It seems that oninput and onchange are treated the same way by browsers :/
module.exports = function trigger_both_events($input) {
	// the event only ever fires if there is a full valid value available
	trigger_event($input, 'input')
	trigger_event($input, 'change')
}
