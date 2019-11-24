var get_current_segment = require('../getters/get_current_segment')
var prev_segment = require('../selectors/prev_segment')
var next_segment = require('../selectors/next_segment')

module.exports = function handle_tab($input, e) {
  var current_segment = get_current_segment($input)
  var backwards_and_first = e.shiftKey && current_segment === 'hrs'
  var forwards_and_last = !e.shiftKey && current_segment === 'mode'

  if (!backwards_and_first && !forwards_and_last) {
    e.preventDefault()
    if (e.shiftKey) {
      prev_segment($input)
    } else {
      next_segment($input)
    }
  }
}
