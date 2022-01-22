// I need to keep this separate from reset so that
// I can reset without attracting focus
import set_data_attribute from '../setters/set_data_attribute'
import trigger_both_events from '../events/trigger_both_events'
import { PolyfillInput } from '../../index'

export default function apply_default($input: PolyfillInput) {
	$input.value = '--:-- --'
	set_data_attribute($input, '')
	trigger_both_events($input)
}
