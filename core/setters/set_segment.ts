import set_data_attribute from './set_data_attribute'
import trigger_both_events from '../events/trigger_both_events'
import { PolyfillInput } from '../..'
import { getInputValue, Segment, Hour12, Minute, Mode, convertTimeObject, selectSegment } from '@time-input-polyfill/utils'

type Value<SegType extends Segment> = SegType extends 'mode' ? Mode : SegType extends 'hrs12' ? Hour12 : Minute

export default function set_segment<SegType extends Segment>($input: PolyfillInput, segment: SegType, value: Value<SegType>) {
	let timeObject = getInputValue($input).asTimeObject();
	timeObject[segment] = value as any // ts is being annoying about this
	const newInputVal = convertTimeObject(timeObject).to12hr()

	$input.value = newInputVal
	selectSegment($input, segment)
	set_data_attribute($input, newInputVal)
	trigger_both_events($input)
}
