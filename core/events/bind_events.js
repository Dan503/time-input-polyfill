var values = require('../helpers/values')

var select_segment = require('../selectors/select_segment')

var next_segment = require('../selectors/next_segment')
var prev_segment = require('../selectors/prev_segment')
var select_cursor_segment = require('../selectors/select_cursor_segment')

var get_current_segment = require('../getters/get_current_segment')

var reset = require('../setters/reset')
var manual_number_entry = require('../setters/manual_number_entry')
var clear_segment = require('../setters/clear_segment')
var increment_current_segment = require('../setters/increment_current_segment')
var decrement_current_segment = require('../setters/decrement_current_segment')
var set_mode = require('../setters/set_mode')
var switch_times = require('../setters/switch_times')

var handle_tab = require('../events/handle_tab')

var all_number_keys = require('../static-values/all_number_keys')
var named_keys = require('../static-values/named_keys')

var update_a11y = require('../accessibility/update_a11y')

module.exports = function bind_events($input) {
  var prev_value = ''

  var shiftKey = false

  document.addEventListener('keydown', function(e) {
    shiftKey = e.shiftKey
  })
  document.addEventListener('keyup', function(e) {
    shiftKey = e.shiftKey
  })

  if ($input.form) {
    $input.form.addEventListener('submit', function() {
      auto_swap($input)
    })
  }

  var focused_via_click = false

  $input.addEventListener('mousedown', function() {
    focused_via_click = true
  })

  // Turns the IE clear button into a reset button
  $input.addEventListener('mouseup', function() {
    setTimeout(function() {
      if ($input.value === '') reset($input)
    }, 1)
  })

  $input.addEventListener('click', function(e) {
    select_cursor_segment($input)
  })

  $input.addEventListener('blur', function() {
    var current_value = $input.dataset.value
    if (current_value !== prev_value) {
      prev_value = current_value
    }
    focused_via_click = false
  })

  $input.addEventListener('focus', function(e) {
    if (!focused_via_click) {
      e.preventDefault()
      var segment = shiftKey ? 'mode' : 'hrs'
      select_segment($input, segment)
    }
    update_a11y($input, ['initial', 'select'])
  })

  $input.addEventListener('keydown', function(e) {
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
    setTimeout(function() {
      switch_times($input, 12)
    }, 1)
  }
}
