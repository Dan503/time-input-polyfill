import trigger_event from './trigger_event.js'

// It seems that oninput and onchange are treated the same way by browsers :/
export default function trigger_both_events($input) {
	// the event only ever fires if there is a full valid value available
	trigger_event($input, 'input')
	trigger_event($input, 'change')
}
