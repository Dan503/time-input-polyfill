import { a11yUpdate, getCursorSegment, Segment, selectCursorSegment, selectNextSegment, selectPrevSegment, selectSegment } from '@time-input-polyfill/utils'
import values from '../helpers/values'

import reset from '../setters/reset'
import manual_number_entry from '../setters/manual_number_entry'
import clear_segment from '../setters/clear_segment'
import switch_times from '../setters/switch_times'

import handle_tab from './handle_tab'

import { all_number_keys } from '../static-values/all_number_keys'
import named_keys from '../static-values/named_keys'
import { PolyfillInput } from '../../index'
import set_segment from '../setters/set_segment'
import { decrement, increment } from '../setters/modifyTime'

export default function bind_events($input: PolyfillInput): void {
	var prev_value = ''

	var shiftKey = false

	document.addEventListener('keydown', function (e) {
		shiftKey = e.shiftKey
	})
	document.addEventListener('keyup', function (e) {
		shiftKey = e.shiftKey
	})

	if ($input.form) {
		$input.form.addEventListener('submit', function () {
			auto_swap($input)
		})
	}

	var focused_via_click = false

	$input.addEventListener('mousedown', function () {
		focused_via_click = true
	})

	// Turns the IE clear button into a reset button
	$input.addEventListener('mouseup', function () {
		setTimeout(function () {
			if ($input.value === '') reset($input)
		}, 1)
	})

	$input.addEventListener('click', function (e) {
		selectCursorSegment($input)
	})

	$input.addEventListener('blur', function () {
		var current_value = $input.dataset.value
		if (current_value !== prev_value) {
			prev_value = current_value || ''
		}
		focused_via_click = false
	})

	$input.addEventListener('focus', function (e) {
		if (!focused_via_click) {
			e.preventDefault()
			var segment: Segment = shiftKey ? 'mode' : 'hrs12'
			selectSegment($input, segment)
		}
		a11yUpdate($input, ['initial', 'select'])
	})

	$input.addEventListener('keydown', function (e): true | void {
		var is_enter_key = e.which === 13
		if (is_enter_key) return true

		var is_number_key = all_number_keys.indexOf(e.which) > -1
		var is_named_key = values(named_keys).indexOf(e.which) > -1
		var is_arrow_key =
			[
				named_keys.ArrowDown,
				named_keys.ArrowRight,
				named_keys.ArrowUp,
				named_keys.ArrowLeft,
			].indexOf(e.which) > -1
		var is_mode_key = [named_keys.a, named_keys.p].indexOf(e.which) > -1
		var is_delete_key =
			[named_keys.Delete, named_keys.Backspace].indexOf(e.which) > -1

		if (
			!is_named_key ||
			is_arrow_key ||
			is_number_key ||
			is_mode_key ||
			is_delete_key
		) {
			e.preventDefault()
		}

		if (is_number_key) {
			manual_number_entry($input, e.which)
		}

		if (is_delete_key) {
			var segment = getCursorSegment($input)

			clear_segment($input, segment)
		}

		switch (e.which) {
			case named_keys.ArrowRight:
				selectNextSegment($input)
				break
			case named_keys.ArrowLeft:
				selectPrevSegment($input)
				break
			case named_keys.ArrowUp:
				increment.cursorSegment($input)
				break
			case named_keys.ArrowDown:
				decrement.cursorSegment($input)
				break
			case named_keys.Escape:
				reset($input)
				break
			case named_keys.a:
				set_segment($input, 'mode', 'AM')
				break
			case named_keys.p:
				set_segment($input, 'mode', 'PM')
				break
			case named_keys.Tab:
				handle_tab($input, e)
				break
		}
	})
}

function auto_swap($input: PolyfillInput): void {
	if ($input.polyfill?.autoSwap) {
		switch_times($input, 24)
		setTimeout(function () {
			switch_times($input, 12)
		}, 1)
	}
}
