// selector is optional, it allows for an early exit
module.exports = function($input, selectorString) {
  var $elem = $input

  // https://stackoverflow.com/a/8729274/1611058
  var ancestors = []
  while ($elem) {
    ancestors.push($elem)
    var matchesSelector = $elem.msMatchesSelector
      ? $elem.msMatchesSelector(selectorString)
      : $elem.matches(selectorString)
    if (matchesSelector) {
      return ancestors
    }
    $elem = $elem.parentElement
  }

  return ancestors
}
