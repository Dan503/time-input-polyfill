
// https://stackoverflow.com/a/10199306/1611058
function get_time_support () {
	var input = document.createElement('input');
	input.setAttribute('type','time');

	var notValid = 'not-a-time';
	input.setAttribute('value', notValid);

	return (input.value !== notValid);
}

var supportsTime = get_time_support();

module.exports = supportsTime;
