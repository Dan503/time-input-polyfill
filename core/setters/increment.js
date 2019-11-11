var switch_mode = require('./switch_mode')
var nudge_time_segment = require('./nudge_time_segment')
var update_a11y = require('../accessibility/update_a11y')

module.exports = function increment($input, segment) {
  if (segment === 'mode') {
    switch_mode($input, 'AM')
  } else {
    nudge_time_segment($input, segment, 'up')
  }
  update_a11y($input, ['update'])
}
