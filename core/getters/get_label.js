
var get_ancestors = require('./get_ancestors');

module.exports = function get_label ($input) {
	var $forLabel = document.querySelector('label[for="'+$input.id+'"]');
	if ($forLabel) return $forLabel;

	var ancestors = get_ancestors($input);
	var $parentLabel = ancestors.filter(function($elem){
		return $elem.nodeName === 'LABEL';
	})[0];
	return $parentLabel;
}
