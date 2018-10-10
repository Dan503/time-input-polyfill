
// https://stackoverflow.com/a/10199306/1611058
module.exports = function supportsTime () {
	var input = document.createElement('input');
	input.setAttribute('type','time');

	var notValid = 'not-a-time';
	input.setAttribute('value', notValid);

	return (input.value !== notValid);
}
