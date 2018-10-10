
// I need to keep this separate from reset so that
// I can reset without attracting focus

module.exports = function apply_default () {
	$input.value = '--:-- --';
	set_data_attribute('');
	trigger_both_events();
}
