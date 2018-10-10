
module.exports = function bind_events () {

	var shiftKey = false;

	document.addEventListener('keydown', function(e){
		shiftKey = e.shiftKey;
	})
	document.addEventListener('keyup', function(e){
		shiftKey = e.shiftKey;
	})

	var focused_via_click = false;

	$input.addEventListener('mousedown', function(){
		focused_via_click = true;
	});

	// Turns the IE clear button into a reset button
	$input.addEventListener('mouseup', function(){
		setTimeout(function(){
			if ($input.value === '') reset();
		}, 1)
	});

	$input.addEventListener('click', select_cursor_segment);

	$input.addEventListener('blur', function(){
		var current_value = $input.dataset.value;
		if (current_value !== prev_value) {
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
		var is_delete_key = [named_keys.Delete, named_keys.Backspace].indexOf(e.which) > -1;

		if (!is_named_key || is_arrow_key || is_number_key || is_mode_key || is_delete_key) { e.preventDefault(); }

		if (is_number_key) {
			manual_number_entry(e.which);
		}

		if (is_delete_key) {
			var segment = get_current_segment();
			clear_segment(segment);
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
