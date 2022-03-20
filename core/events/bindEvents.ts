import { a11yUpdate, getCursorSegment, Segment, selectCursorSegment, selectNextSegment, selectPrevSegment, selectSegment } from '@time-input-polyfill/utils'
import { objectValues } from '../helpers'

import { reset, manualNumberEntry, clearSegment, swapToTimeFormat, setSegment, decrement, increment } from '../setters'

import { handleTab } from './index'

import { allNumberKeys, namedKeys } from '../staticValues'
import { PolyfillInput } from '../types'

export function bindEvents($input: PolyfillInput): void {
	let prevValue = ''
	let isShiftKeyPressed = false
	let wasFocusedViaClick = false

	document.addEventListener('keydown', function (e) {
		isShiftKeyPressed = e.shiftKey
	})
	document.addEventListener('keyup', function (e) {
		isShiftKeyPressed = e.shiftKey
	})

	if ($input.form) {
		$input.form.addEventListener('submit', function () {
			if ($input.polyfill?.isEnabled) {
				autoSwap($input)
			}
		})
	}

	$input.addEventListener('mousedown', function () {
		wasFocusedViaClick = true
	})

	// Turns the IE clear button into a reset button
	$input.addEventListener('mouseup', function () {
		setTimeout(function () {
			if ($input.value === '' && $input.polyfill?.isEnabled) reset($input)
		})
	})

	$input.addEventListener('click', function () {
		if ($input.polyfill?.isEnabled) {
			selectCursorSegment($input)
		}
	})

	$input.addEventListener('blur', function () {
		var currentValue = $input.dataset.value
		if (currentValue !== prevValue) {
			prevValue = currentValue || ''
		}
		wasFocusedViaClick = false
	})

	$input.addEventListener('focus', function (e) {
		if ($input.polyfill?.isEnabled) {
			if (!wasFocusedViaClick) {
				e.preventDefault()
				var segment: Segment = isShiftKeyPressed ? 'mode' : 'hrs12'
				setTimeout(() => selectSegment($input, segment))
			}
			a11yUpdate($input, ['initial', 'select'])
		}
	})

	$input.addEventListener('keydown', function (e): true | void {
		if ($input.polyfill?.isEnabled) {

			var is_enter_key = e.code === 'Enter'
			if (is_enter_key) return true

			var is_number_key = allNumberKeys.indexOf(e.code) > -1
			var is_named_key = objectValues(namedKeys).indexOf(e.code) > -1
			var is_arrow_key =
				[
					namedKeys.ArrowDown,
					namedKeys.ArrowRight,
					namedKeys.ArrowUp,
					namedKeys.ArrowLeft,
				].indexOf(e.code) > -1
			var is_mode_key = [namedKeys.KeyA, namedKeys.KeyP].indexOf(e.code) > -1
			var is_delete_key =
				[namedKeys.Delete, namedKeys.Backspace].indexOf(e.code) > -1

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
				manualNumberEntry($input, e.code)
			}

			if (is_delete_key) {
				var segment = getCursorSegment($input)

				clearSegment($input, segment)
			}

			switch (e.code) {
				case namedKeys.ArrowRight:
					selectNextSegment($input)
					break
				case namedKeys.ArrowLeft:
					selectPrevSegment($input)
					break
				case namedKeys.ArrowUp:
					increment.cursorSegment($input)
					break
				case namedKeys.ArrowDown:
					decrement.cursorSegment($input)
					break
				case namedKeys.Escape:
					reset($input)
					break
				case namedKeys.KeyA:
					setSegment($input, 'mode', 'AM')
					break
				case namedKeys.KeyP:
					setSegment($input, 'mode', 'PM')
					break
				case namedKeys.Tab:
					handleTab($input, e)
					break
			}
		}
	})
}

function autoSwap($input: PolyfillInput): void {
	if ($input.polyfill?.autoSwap && $input.polyfill.isEnabled) {
		swapToTimeFormat($input, 24)
		setTimeout(function () {
			swapToTimeFormat($input, 12)
		})
	}
}
