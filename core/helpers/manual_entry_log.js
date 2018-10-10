
var manual_entry_log = [];

function clear_manual_entry_log () {
	manual_entry_log = [];
}

function add_manual_entry_log(entry) {
	manual_entry_log.push(entry);
}

module.exports = {
	manual_entry_log: manual_entry_log,
	clear_manual_entry_log: clear_manual_entry_log,
	add_manual_entry_log: add_manual_entry_log,
}
