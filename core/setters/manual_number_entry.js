var get_current_segment = require('../getters/get_current_segment')
var set_segment = require('./set_segment')
var next_segment = require('../selectors/next_segment')

var manual_entry_log = require('../helpers/manual_entry_log')
var sorted_number_keys = require('../static-values/sorted_number_keys')

module.exports = function manual_number_entry($input, key) {
  var key_value = sorted_number_keys[key]
  var segment = get_current_segment($input)

  if (segment !== 'mode') {
    var entry_count = manual_entry_log.items().length

    var upper_limits = {
      hrs: [1, 2],
      min: [5, 9],
    }
    var limit = upper_limits[segment][entry_count]

    if (entry_count < 2) {
      manual_entry_log.add(key_value)
    }

    var full_limit = parseInt(upper_limits[segment].join(''))
    var full_entry = parseInt(manual_entry_log.items().join(''))

    if (full_limit >= full_entry) {
      set_segment($input, segment, full_entry)
    }

    var at_limit = key_value > limit || manual_entry_log.items().length === 2

    if (at_limit) {
      next_segment($input)
    }
  }
}
