// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict'

// Time input polyfill
var TimePolyfill = require('../../index')
var _$$ = require('../../core/selectors/_$$')
var toArray = require('../../core/converters/toArray')

var result = require('../_modules/result/result')

var ga = require('./_helpers/gtag')

document.addEventListener('DOMContentLoaded', function() {
	// var $$timeInputs = _$$('input[type="time"]');
	var $$timeInputs = _$$('input.time')
	$$timeInputs.forEach(function(element) {
		new TimePolyfill(element)

		// Disable auto swap
		// element.polyfill.autoSwap = false;

		element.oninput = function() {
			console.log('input', element.dataset.value)
		}
		element.onchange = function() {
			console.log('change', element.dataset.value)
		}

		element.addEventListener('change', function() {
			console.log('listener change')
		})
		element.addEventListener('input', function() {
			console.log('listener input')
		})
	})

	document.querySelector('form').onsubmit = function(e) {
		e.preventDefault()
		var labels = get_labels(this)
		var values = get_values(this, labels)
		var $result = document.querySelector('.result')

		ga('form submit')

		result($result, values)
		$result.focus()

		function get_labels(form) {
			var labelList = []
			toArray(form.children).forEach(function(element) {
				var $label = element.querySelector('label')
				if ($label) {
					labelList.push($label.textContent)
				}
			})
			return labelList
		}

		function get_values(form, labels) {
			var valuesList = {}
			toArray(form.elements).forEach(function(element, i) {
				if (element.nodeName === 'INPUT') {
					valuesList[labels[i]] = element.value
				}
			})
			return valuesList
		}
	}
})
