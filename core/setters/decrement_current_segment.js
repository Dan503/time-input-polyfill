
var get_current_segment = require('../getters/get_current_segment');
var decrement = require('../setters/decrement');

module.exports = function decrement_current_segment ($input){
	var current_segment = get_current_segment($input);
	decrement($input, current_segment);
}
