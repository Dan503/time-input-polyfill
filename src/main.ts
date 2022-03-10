import './main.scss'

// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict'

type routes = '/' | '/tests'

const path = window.location.pathname as routes
const homePage = document.getElementById('homePage') as HTMLDivElement
const testPage = document.getElementById('testPage') as HTMLDivElement

if (path === '/tests') {
	homePage.hidden = true
}
if (path === '/') {
	testPage.hidden = true
}

// import { toArray, selectAll } from '@time-input-polyfill/utils'

// // Time input polyfill
// import TimePolyfill from '../core/index'

// import result from './modules/result/result'

// document.addEventListener('DOMContentLoaded', function () {
//   // var $$timeInputs = _$$('input[type="time"]');
//   var $$timeInputs = selectAll<HTMLInputElement>('input.time')
//   $$timeInputs.forEach(function (inputElem) {
//     TimePolyfill(inputElem, document)

//     // Disable auto swap
//     // element.polyfill.autoSwap = false;

//     inputElem.oninput = function () {
//       console.log('input', inputElem.dataset.value)
//     }
//     inputElem.onchange = function () {
//       console.log('change', inputElem.dataset.value)
//     }

//     inputElem.addEventListener('change', function () {
//       console.log('listener change')
//     })
//     inputElem.addEventListener('input', function () {
//       console.log('listener input')
//     })
//   })

//   document.querySelector<HTMLFormElement>('form')?.addEventListener('submit', function (e) {
//     e.preventDefault()
//     var labels = get_labels(this)
//     var values = get_values(this, labels)
//     var $result = document.querySelector<HTMLDivElement>('.result')

//     // ga('form submit')

//     result($result, values)
//     $result?.focus()

//     function get_labels(form: HTMLFormElement) {
//       var labelList: Array<string> = []
//       toArray(form.children).forEach(function (element) {
//         var $label = element.querySelector<HTMLLabelElement>('label')
//         if ($label?.textContent) {
//           labelList.push($label.textContent)
//         }
//       })
//       return labelList
//     }

//     function get_values(form: HTMLFormElement, labels: Array<string>) {
//       var valuesList: { [key: string]: string } = {}
//       toArray(form.elements).forEach(function (element, i) {
//         if (element.nodeName === 'INPUT') {
//           const input = element as HTMLInputElement
//           valuesList[labels[i]] = input.value
//         }
//       })
//       return valuesList
//     }
//   })
// })