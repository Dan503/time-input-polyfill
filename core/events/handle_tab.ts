import get_current_segment from '../getters/get_current_segment.js'
import prev_segment from '../selectors/prev_segment.js'
import next_segment from '../selectors/next_segment.js'

export default function handle_tab($input, e) {
	var current_segment = get_current_segment($input)
	var backwards_and_first = e.shiftKey && current_segment === 'hrs'
	var forwards_and_last = !e.shiftKey && current_segment === 'mode'

	if (!backwards_and_first && !forwards_and_last) {
		e.preventDefault()
		if (e.shiftKey) {
			prev_segment($input)
		} else {
			next_segment($input)
		}
	}
}
