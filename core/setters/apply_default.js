// I need to keep this separate from reset so that
// I can reset without attracting focus

var set_data_attribute = require('../setters/set_data_attribute')
var trigger_both_events = require('../events/trigger_both_events')

module.exports = function apply_default($input) {
  $input.value = '--:-- --'
  set_data_attribute($input, '')
  trigger_both_events($input)
}
