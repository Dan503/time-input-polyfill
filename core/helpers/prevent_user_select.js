
module.exports = function prevent_user_select ($input) {
	$input.style.msUserSelect = "none";
	$input.style.mozUserSelect = "none";
	$input.style.webkitUserSelect = "none";
	$input.style.userSelect = "none";
}
