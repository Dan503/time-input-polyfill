
// if (supportsTime()) {
	document.addEventListener("DOMContentLoaded", function() {
		// var $$timeInputs = _$$('input[type="time"]');
		var $$timeInputs = _$$('input.time');
		$$timeInputs.forEach(function (element) {
			new TimePolyfill(element);

			element.oninput = function(){
				console.log('input', element.dataset.value);
			}
			element.onchange = function(){
				console.log('change', element.dataset.value);
			}

			element.addEventListener('change',  function(){
				console.log('listener change');
			});
			element.addEventListener('input', function(){
				console.log('listener input');
			});
		});
	});
// }

function TimePolyfill($input) {

	var shiftKey = false;

	document.addEventListener('keydown', function(e){
		shiftKey = e.shiftKey;
	})
	document.addEventListener('keyup', function(e){
		shiftKey = e.shiftKey;
	})

	var inputEvent = create_event('input');
	var changeEvent = create_event('change');

	var prev_value = '';

	var ranges = {
		hrs : { start: 0, end: 2 },
		min : { start: 3, end: 5 },
		mode : { start: 6, end: 8 },
	}

	var segments = Object.keys(ranges);

	var manual_entry_log = [];

	var named_keys = {
		ArrowDown: 40,
		ArrowRight: 39,
		ArrowUp: 38,
		ArrowLeft: 37,
		Backspace: 8,
		Tab: 9,
		Shift: 16,
		Escape: 27,
		a: 65,
		p: 80,
	}

	var all_number_keys = [
	// 0,  1,  2,  3,  4,  5,  6,  7,  8,  9
	  48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
	  96, 97, 98, 99,100,101,102,103,104,105];


	var sorted_number_keys = {};
	// sorted_number_keys = { 48: 0, 49: 1, 96: 0, 97: 1, ... };
	all_number_keys.forEach(function(key, index) {
		var number_val = index > 9 ? index - 10 : index;
		sorted_number_keys[key] = number_val;
	});

	var observer = new MutationObserver(function(){
		trigger_change_event();
		set_time($input.value);
	});

	disable_observer();

	initialise();

	function initialise () {
		prevent_user_select();

		if ($input.value === '') {
			apply_default();
		} else {
			set_time($input.value);
		}

		set_data_attribute('');

		bind_events();

		enable_observer();
	}

	function enable_observer(){
		observer.observe($input, {attributes: true});
	}
	function disable_observer(){
		observer.disconnect();
	}

	function create_event(eventName){
		var event = document.createEvent('Event');
		event.initEvent(eventName, true, true);
		return event;
	}

	function bind_events () {

		var focused_via_click = false;

		$input.addEventListener('mousedown', function(){
			focused_via_click = true;
		});

		$input.addEventListener('click', select_cursor_segment);

		$input.addEventListener('blur', function(){
			var current_value = $input.dataset.value;
			if (current_value !== prev_value) {
				trigger_change_event();
				prev_value = current_value;
			}
			focused_via_click = false;
		});

		$input.addEventListener('focus', function(e){
			if (!focused_via_click) {
				e.preventDefault();
				if (shiftKey) {
					select_mode();
				} else {
					select_hrs();
				}
			}
		});

		$input.addEventListener('keydown', function(e) {
			var is_number_key = all_number_keys.indexOf(e.which) > -1;
			var is_named_key = values(named_keys).indexOf(e.which) > -1;
			var is_arrow_key = [named_keys.ArrowDown, named_keys.ArrowRight, named_keys.ArrowUp, named_keys.ArrowLeft].indexOf(e.which) > -1;
			var is_mode_key = [named_keys.a, named_keys.p].indexOf(e.which) > -1;

			if (!is_named_key || is_arrow_key || is_number_key || is_mode_key) { e.preventDefault(); }

			if (is_number_key) {
				manual_number_entry(e.which);
			}

			switch (e.which) {
				case named_keys.ArrowRight: next_segment(); break;
				case named_keys.ArrowLeft:  prev_segment(); break;
				case named_keys.ArrowUp:    increment_current_segment(); break;
				case named_keys.ArrowDown:  decrement_current_segment(); break;
				case named_keys.Escape:     reset(); break;
				case named_keys.a:          set_mode('AM'); break;
				case named_keys.p:          set_mode('PM'); break;
				case named_keys.Tab:        handle_tab(e); break;
			}
		})
	}

	function handle_tab(e) {
		var current_segment = get_current_segment();
		var backwards_and_first = e.shiftKey && current_segment === 'hrs';
		var forwards_and_last = !e.shiftKey && current_segment === 'mode';

		if (!backwards_and_first && !forwards_and_last) {
			e.preventDefault();
			if (e.shiftKey) {
				prev_segment();
			} else {
				next_segment();
			}
		}
	}

	function select_cursor_segment () {
		var current_segment = get_current_segment();
		select_segment(current_segment);
	}

	function manual_number_entry(key) {
		var key_value = sorted_number_keys[key];
		var segment = get_current_segment();

		if (segment !== 'mode') {
			var entry_count = manual_entry_log.length;

			var upper_limits = {
				hrs: [1,2],
				min: [5,9],
			}
			var limit = upper_limits[segment][entry_count];

			if (entry_count < 2) {
				manual_entry_log.push(key_value);
			}

			var full_limit = parseInt(upper_limits[segment].join(''));
			var full_entry = parseInt(manual_entry_log.join(''));

			if (full_limit >= full_entry) {
				set_value(segment, full_entry);
			}

			var at_limit = key_value > limit || manual_entry_log.length === 2;

			if (at_limit) {
				next_segment();
			}
		}
	}

	function set_mode (type) {
		var segment = get_current_segment();
		if (segment === 'mode') {
			set_value(segment, type);
		}
	}

	function clear_manual_entry_log () {
		manual_entry_log = [];
	}

	function next_segment () {
		traverse('next');
	}

	function prev_segment () {
		traverse('prev');
	}

	function traverse (direction) {
		var segment = get_current_segment();

		var modifier = direction === 'next' ? 1 : -1;
		var next_segment_index = segments.indexOf(segment) + modifier;

		var next_segment = {
			next: segments[next_segment_index] || 'mode',
			prev: next_segment_index < 0 ? 'hrs' : segments[next_segment_index],
		}[direction];

		select_segment(next_segment);
		clear_manual_entry_log();
	}

	function reset () {
		apply_default();
		select_hrs();
	}

	// I need to keep this separate so that
	// I can reset without attracting focus
	function apply_default () {
		disable_observer();
		$input.value = '--:-- --';
		set_data_attribute('');
		trigger_input_event();
		enable_observer();
	}

	function trigger_input_event() {
		$input.dispatchEvent(inputEvent);
	}

	function trigger_change_event() {
		$input.dispatchEvent(changeEvent);
	}

	function increment_current_segment (){
		var current_segment = get_current_segment();
		increment(current_segment);
	}

	function decrement_current_segment (){
		var current_segment = get_current_segment();
		decrement(current_segment);
	}

	function increment (segment) {
		if (segment === 'mode') {
			switch_mode('AM')
		} else {
			nudge_time_segment(segment, 'up');
		}
	}

	function decrement (segment) {
		if (segment === 'mode') {
			switch_mode('PM')
		} else {
			nudge_time_segment(segment, 'down');
		}
	}

	function nudge_time_segment (segment, direction) {
		var current_values = get_values();
		var time;

		var modifier = direction === 'up' ? 1 : -1;

		if (current_values[segment] === '--') {
			var current_time = new Date();
			time = {
				hrs: convert_hours_to_12hr_time(current_time.getHours()),
				min: current_time.getMinutes(),
			}
		} else {
			var minutes = {
				up : current_values.min < 59 ? current_values.min + modifier : 0,
				down : current_values.min === 0 ? 59 : current_values.min + modifier,
			}
			time = {
				hrs: convert_hours_to_12hr_time(current_values.hrs + modifier),
				min: minutes[direction],
			}
		}

		set_value(segment, leading_zero(time[segment]) );
	}

	function switch_mode (default_mode) {
		default_mode = default_mode || 'AM';
		var current_mode = get_values().mode;
		var new_mode = {
			'--' : default_mode,
			'AM' : 'PM',
			'PM' : 'AM',
		}[current_mode];
		set_value('mode', new_mode);
	}

	function get_current_segment () {
		var selection = get_selected_range();
		for (var segment in ranges) {
			var range = ranges[segment];
			var aboveMin = range.start <= selection.start;
			var belowMax = range.end >= selection.end;
			if (aboveMin && belowMax) {
				return segment;
			}
		}
		return 'hrs';
	}

	function get_selected_range () {
		return { start: $input.selectionStart, end: $input.selectionEnd };
	}

	function select_segment (segment) {
		var actions = {
			hrs:  select_hrs,
			min:  select_min,
			mode: select_mode,
		};
		actions[segment]();
	}

	function select_hrs () {
		$input.setSelectionRange(0, 2);
	}
	function select_min () {
		$input.setSelectionRange(3, 5);
	}
	function select_mode () {
		$input.setSelectionRange(6, 8);
	}

	function get_values (timeString) {
		var value = timeString ? timeString : $input.value;
		var regEx = /([0-9-]{1,2})\:([0-9-]{1,2})\s?(AM|PM|\-\-)?/;
		var result = regEx.exec(value);

		return {
			hrs: convert_number(result[1]),
			min: convert_number(result[2]),
			mode: result[3],
		}
	}

	function convert_number (number) {
		return isNaN(number) ? number : parseInt(number);
	}

	function set_time(time_string_24hr) {
		disable_observer();
		var twelveHr = convert_to_12hr_time(time_string_24hr);
		$input.value = twelveHr;
		set_data_attribute(time_string_24hr);
		enable_observer();
	}

	function set_value (segment, value) {
		disable_observer();
		var values = get_values();
		values[segment] = value;
		var newInputVal = [
			leading_zero(values.hrs),':',
			leading_zero(values.min),' ',
			values.mode
		].join('');
		$input.value = newInputVal;
		select_segment(segment);
		set_data_attribute(newInputVal);
		trigger_input_event();
		enable_observer();
	}

	function set_data_attribute(timeString_12hr){
		var filteredString = timeString_12hr.indexOf('-') > -1 ? '' : timeString_12hr;
		var time24hr = convert_to_24hr_time(filteredString);
		$input.setAttribute('data-value', time24hr);
	}

	function prevent_user_select () {
		$input.style.msUserSelect = "none";
		$input.style.mozUserSelect = "none";
		$input.style.webkitUserSelect = "none";
		$input.style.userSelect = "none";
	}

	function leading_zero (number) {
		if (isNaN(number)) return number;
		var purified = parseInt(number);
		return purified < 10 ? '0' + purified : number;
	}

	function convert_hours_to_12hr_time (hours) {
		return hours <= 12 ? hours === 0 ? 12 : hours : hours - 12;
	}

	function convert_to_12hr_time (timeString_24hr) {
		var twentyFour_regex = /([0-9]{2})\:([0-9]{2})/;
		var result = twentyFour_regex.exec(timeString_24hr);
		var hrs_24 = convert_number(result[1]);
		var min = result[2];
		var hrs_12 = convert_hours_to_12hr_time(hrs_24);
		var isPM = hrs_24 > 12;
		var mode = isPM ? 'PM' : 'AM';
		return [leading_zero(hrs_12), ':', min, ' ', mode].join('');
	}

	function convert_to_24hr_time (timeString_12hr) {
		var isPM = timeString_12hr.indexOf('PM') > -1;
		var timeResult = /^([0-9]{2})/.exec(timeString_12hr);
		var hrs = timeResult ? parseInt(timeResult[1]) : '';
		var newHrs;
		if (hrs === 12) {
			newHrs = isPM ? 12 : 00;
		} else {
			newHrs = isPM ? hrs + 12 : hrs;
		}
		var finalHrs = newHrs === 24 ? 0 : newHrs;
		var timeRegEx = /^[0-9]{2}:([0-9]{2}) (AM|PM)/;
		return timeString_12hr.replace(timeRegEx, leading_zero(finalHrs)+':$1');
	}

	function values (obj) {
		var key_values = [];
		for (var key in obj) {
			key_values.push(obj[key]);
		}
		return key_values;
	}

}

function _$$ (selector) {
	var elements = document.querySelectorAll(selector);
	return Array.prototype.slice.call(elements, 0);
}

// https://stackoverflow.com/a/10199306/1611058
function supportsTime () {
	var input = document.createElement('input');
	input.setAttribute('type','time');

	var notValid = 'not-a-time';
	input.setAttribute('value', notValid);

	return (input.value !== notValid);
}
