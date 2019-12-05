module.exports = function create_event(eventName) {
	var event = document.createEvent('Event')
	event.initEvent(eventName, true, true)
	return event
}
