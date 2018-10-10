
var switch_mode = require('./switch_mode');
var nudge_time_segment = require('./nudge_time_segment');

module.exports = function increment ($input, segment) {
	if (segment === 'mode') {
		switch_mode($input, 'AM')
	} else {
		nudge_time_segment($input, segment, 'up');
	}
}

