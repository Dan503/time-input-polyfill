import values from '../helpers/values.js'

import select_segment from '../selectors/select_segment.js'

import next_segment from '../selectors/next_segment.js'
import prev_segment from '../selectors/prev_segment.js'
import select_cursor_segment from '../selectors/select_cursor_segment.js'

import get_current_segment from '../getters/get_current_segment.js'

import reset from '../setters/reset.js'
import manual_number_entry from '../setters/manual_number_entry.js'
import clear_segment from '../setters/clear_segment.js'
import increment_current_segment from '../setters/increment_current_segment.js'
import decrement_current_segment from '../setters/decrement_current_segment.js'
import set_mode from '../setters/set_mode.js'
import switch_times from '../setters/switch_times.js'

import handle_tab from '../events/handle_tab.js'

import all_number_keys from '../static-values/all_number_keys.js'
import named_keys from '../static-values/named_keys.js'

import update_a11y from '../accessibility/update_a11y.js'

export default function bind_events($input) {
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
		select_cursor_segment($input)
	})

	$input.addEventListener('blur', function () {
		var current_value = $input.dataset.value
		if (current_value !== prev_value) {
			prev_value = current_value
		}
		focused_via_click = false
	})

	$input.addEventListener('focus', function (e) {
		if (!focused_via_click) {
			e.preventDefault()
			var segment = shiftKey ? 'mode' : 'hrs'
			select_segment($input, segment)
		}
		update_a11y($input, ['initial', 'select'])
	})

	$input.addEventListener('keydown', function (e) {
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
			var segment = get_current_segment($input)
			clear_segment($input, segment)
		}

		switch (e.which) {
			case named_keys.ArrowRight:
				next_segment($input)
				break
			case named_keys.ArrowLeft:
				prev_segment($input)
				break
			case named_keys.ArrowUp:
				increment_current_segment($input)
				break
			case named_keys.ArrowDown:
				decrement_current_segment($input)
				break
			case named_keys.Escape:
				reset($input)
				break
			case named_keys.a:
				set_mode($input, 'AM')
				break
			case named_keys.p:
				set_mode($input, 'PM')
				break
			case named_keys.Tab:
				handle_tab($input, e)
				break
		}
	})
}

function auto_swap($input) {
	if ($input.polyfill.autoSwap) {
		switch_times($input, 24)
		setTimeout(function () {
			switch_times($input, 12)
		}, 1)
	}
}
