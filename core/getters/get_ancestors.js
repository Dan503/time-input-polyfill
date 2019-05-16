// selector is optional, it allows for an early exit
module.exports = function ($input, selectorString) {
	var $elem = $input;

	// https://stackoverflow.com/a/8729274/1611058
	var ancestors = [];
	while ($elem) {
		ancestors.push($elem);
		if ($elem.matches(selectorString)) {
			return ancestors;
		}
		$elem = $elem.parentElement;
	}

	return ancestors;
}
