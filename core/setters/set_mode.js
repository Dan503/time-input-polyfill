var get_current_segment = require('../getters/get_current_segment')
var set_segment = require('./set_segment')

module.exports = function set_mode($input, type) {
  var segment = get_current_segment($input)
  if (segment === 'mode') {
    set_segment($input, segment, type)
  }
}
