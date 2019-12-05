import set_segment from './set_segment'
import update_a11y from '../accessibility/update_a11y'

export default function clear_segment($input, segment) {
	set_segment($input, segment, '--')
	update_a11y($input, ['update'])
}
