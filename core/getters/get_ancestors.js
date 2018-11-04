
module.exports = function ($input) {
	var a = $input;

	// https://stackoverflow.com/a/8729274/1611058
	var ancestors = [];
	while (a) {
		ancestors.push(a);
		a = a.parentNode;
	}

	return ancestors;
}
