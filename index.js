
if (supportsTime()) {
	document.addEventListener("DOMContentLoaded", function() {
		// var $$timeInputs = _$$('input[type="time"]');
		var $$timeInputs = _$$('input.time');
		$$timeInputs.forEach(element => {
			new TimePolyfill(element);
		});
	});
}

function TimePolyfill(input_element) {
	var self = this;
	this.$input = input_element;

	this.ranges = {
		hrs : { start: 0, end: 2 },
		min : { start: 3, end: 5 },
		mode : { start: 6, end: 8 },
	}

	this.segments = Object.keys(this.ranges);

	this.initialise = function() {
		this.prevent_user_select();

		if (this.$input.value === '') {
			this.apply_default();
		}

		this.$input.onfocus = function() {
			// Always returns [0,0] in webkit browsers :(
			// var position = self.get_selection_range();
			self.select_hrs();
		}

		this.$input.onkeydown = function(e) {
			var keys = {
				ArrowDown: 40,
				ArrowRight: 39,
				ArrowUp: 38,
				ArrowLeft: 37,
				Backspace: 8,
				Tab: 9,
				Shift: 16,
				Escape: 27,
			}

			var numberKeys = [
			// 0,  1,  2,  3,  4,  5,  6,  7,  8,  9
			  48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
				96, 97, 98, 99,100,101,102,103,104,105];

			var is_number_key = numberKeys.indexOf(e.which) > -1;
			var is_named_key = Object.values(keys).indexOf(e.which) > -1;
			var is_arrow_key = [keys.ArrowDown, keys.ArrowRight, keys.ArrowUp, keys.ArrowLeft].indexOf(e.which) > -1;

			if (!is_number_key && !is_named_key || is_arrow_key) { e.preventDefault(); }

			switch (e.which) {
				case keys.ArrowRight: self.next_segment(); break;
				case keys.ArrowLeft: self.prev_segment(); break;
				case keys.ArrowUp: self.increment_current_segment(); break;
				case keys.ArrowDown: self.decrement_current_segment(); break;
				case keys.Escape: self.reset(); break;
			}
		}
	}

	this.next_segment = function() {
		var segment = this.get_current_segment();
		var next_segment_index = this.segments.indexOf(segment) + 1;
		var next_segment = this.segments[next_segment_index] || 'mode';
		this.select_segment(next_segment);
	}

	this.prev_segment = function() {
		var segment = this.get_current_segment();
		var next_segment_index = this.segments.indexOf(segment) - 1;
		var next_segment = next_segment_index < 0 ? 'hrs' : this.segments[next_segment_index];
		this.select_segment(next_segment);
	}

	this.reset = function() {
		this.apply_default();
		this.select_hrs();
	}

	this.apply_default = function() {
		this.$input.value = '--:-- --';
	}

	this.increment_current_segment = function(){
		var current_segment = this.get_current_segment();
		this.increment(current_segment);
	}
	this.decrement_current_segment = function(){
		var current_segment = this.get_current_segment();
		this.decrement(current_segment);
	}

	this.increment = function(segment) {
		if (segment === 'mode') {
			this.switch_mode('AM')
		} else {
			var current_values = this.get_values();
			var time;

			if (current_values[segment] === '--') {
				var current_time = new Date();
				var hours = convert_24_hour(current_time.getHours());

				time = {
					hrs: hours < 10 ? '0' + hours : hours,
					min: current_time.getMinutes(),
				}
			}

			this.set_value(segment, time[segment]);

		}
	}
	this.decrement = function(segment) {
		if (segment === 'mode') {
			this.switch_mode('PM')
		} else {
			var current_values = this.get_values();

		}
	}

	this.switch_mode = function(default_mode){
		default_mode = default_mode || 'AM';
		var current_mode = this.get_values().mode;
		var new_mode = {
			'--' : default_mode,
			'AM' : 'PM',
			'PM' : 'AM',
		}[current_mode];
		this.set_value('mode', new_mode);
	}

	this.get_current_segment = function() {
		var selection = this.get_selection_range();
		for (var range in this.ranges) {
			if (this.is_match(selection, this.ranges[range])) {
				return range;
			}
		}
		return 'hrs';
	}

	this.get_selection_range = function() {
		return { start: this.$input.selectionStart, end: this.$input.selectionEnd };
	}

	this.get_selected_value = function() {
		var current_values = this.get_values();
		var current_segment = this.get_current_segment();
		return current_values[current_segment];
	}

	this.select_segment = function(segment) {
		var actions = {
			hrs:  self.select_hrs,
			min:  self.select_min,
			mode: self.select_mode,
		};
		actions[segment]();
	}

	this.select_hrs = function() {
		self.$input.setSelectionRange(0, 2);
	}
	this.select_min = function() {
		self.$input.setSelectionRange(3, 5);
	}
	this.select_mode = function() {
		self.$input.setSelectionRange(6, 8);
	}

	this.get_values = function() {
		var regEx = /([0-9-]{2})\:([0-9-]{2})\s(AM|PM|\-\-)/;
		var result = regEx.exec(self.$input.value);
		return {
			hrs: result[1],
			min: result[2],
			mode: result[3],
		}
	}

	this.set_value = function(segment, value) {
		var values = this.get_values();
		values[segment] = value;
		var newInputVal = [values.hrs,':',values.min,' ',values.mode].join('');
		this.$input.value = newInputVal;
		this.select_segment(segment);
	}

	this.is_match = function(obj1, obj2) {
		var string1 = JSON.stringify(obj1);
		var string2 = JSON.stringify(obj2);
		return string1 == string2;
	}

	this.prevent_user_select = function(){
		this.$input.style.msUserSelect = "none";
		this.$input.style.mozUserSelect = "none";
		this.$input.style.webkitUserSelect = "none";
		this.$input.style.userSelect = "none";
	}

	this.initialise();

	function convert_24_hour (hours) {
		return hours <= 12 ? hours === 0 ? 12 : hours : hours - 12;
	}
}


var _$$ = function (selector) {
	var elements = document.querySelectorAll(selector);
	return Array.prototype.slice.call(elements, 0);
}

// https://stackoverflow.com/a/10199306/1611058
function supportsTime() {
	var input = document.createElement('input');
	input.setAttribute('type','time');

	var notValid = 'not-a-time';
	input.setAttribute('value', notValid);

	return (input.value !== notValid);
}
