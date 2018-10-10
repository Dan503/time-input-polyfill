
module.exports = function increment_current_segment (){
	var current_segment = get_current_segment();
	increment(current_segment);
}
