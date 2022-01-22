export default function create_event(eventName: string) {
	var event = document.createEvent('Event')
	event.initEvent(eventName, true, true)
	return event
}
