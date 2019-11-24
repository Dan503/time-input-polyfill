var set_time = require('../setters/set_time')

module.exports = function update_time($input) {
  set_time($input, $input.value)
  return $input
}
