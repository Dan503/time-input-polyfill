import { getInputValue, Segment, Hour12, Minute, Mode, convertTimeObject, selectSegment } from '@time-input-polyfill/utils'
import { setDataAttribute } from './setDataAttribute'
import { triggerInputAndChangeEvents } from '../events/triggerInputAndChange'
import { PolyfillInput } from '../types'

type Value<SegType extends Segment> = SegType extends 'mode' ? Mode : SegType extends 'hrs12' ? Hour12 : Minute

export function setSegment<SegType extends Segment>($input: PolyfillInput, segment: SegType, value: Value<SegType> | null) {
	if ($input.polyfill?.isEnabled) {
		let timeObject = getInputValue($input).asTimeObject();
		if (!value && (segment === 'hrs12' || segment === 'mode')) {
			timeObject.hrs24 = null
		}
		timeObject[segment] = value as any // ts is being annoying about this
		const newInputVal = convertTimeObject(timeObject).to12hr()

		$input.value = newInputVal
		selectSegment($input, segment)
		setDataAttribute($input, newInputVal)
		triggerInputAndChangeEvents($input)
	}
}
