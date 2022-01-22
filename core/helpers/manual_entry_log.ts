var manual_entry_log = []

function clear() {
	manual_entry_log = []
}

function add(entry) {
	manual_entry_log.push(entry)
}

function items() {
	return manual_entry_log
}

export default {
	items: items,
	clear: clear,
	add: add,
}
