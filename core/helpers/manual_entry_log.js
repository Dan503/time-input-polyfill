
var manual_entry_log = [];

function clear () {
	manual_entry_log = [];
}

function add (entry) {
	manual_entry_log.push(entry);
}

module.exports = {
	items: manual_entry_log,
	clear: clear,
	add: add,
}
