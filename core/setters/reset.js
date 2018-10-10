
var apply_default = require('./apply_default');
var select_hrs = require('../selectors/select_hrs');

module.exports = function reset ($input) {
	apply_default($input);
	select_hrs($input);
}
