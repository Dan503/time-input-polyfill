var set_segment = require('./set_segment')
var update_a11y = require('../accessibility/update_a11y')

module.exports = function clear_segment($input, segment) {
  set_segment($input, segment, '--')
  update_a11y($input, ['update'])
}
