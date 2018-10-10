
module.exports = function decrement (segment) {
	if (segment === 'mode') {
		switch_mode('PM')
	} else {
		nudge_time_segment(segment, 'down');
	}
}
