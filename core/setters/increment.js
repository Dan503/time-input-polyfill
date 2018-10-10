
module.exports = function increment (segment) {
	if (segment === 'mode') {
		switch_mode('AM')
	} else {
		nudge_time_segment(segment, 'up');
	}
}

