export function createEvent(eventName: string) {
	var event = document.createEvent('Event')
	event.initEvent(eventName, true, true)
	return event
}
