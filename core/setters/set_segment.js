import get_values from '../getters/get_values'
import leading_zero from '../converters/leading_zero'
import select_segment from '../selectors/select_segment'
import set_data_attribute from './set_data_attribute'
import trigger_both_events from '../events/trigger_both_events'

export default function set_segment($input, segment, value) {
	var values = get_values($input)
	values[segment] = value
	var newInputVal = [
		leading_zero(values.hrs),
		':',
		leading_zero(values.min),
		' ',
		values.mode,
	].join('')
	$input.value = newInputVal
	select_segment($input, segment)
	set_data_attribute($input, newInputVal)
	trigger_both_events($input)
}
