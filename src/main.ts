import './main.scss'

import { selectAll } from '@time-input-polyfill/utils'
// Time input polyfill
import TimePolyfill from '../core/index'

import { homePage } from './pages/homePage'
import { testPage } from './pages/testPage'

// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict'

type routes = '/' | '/tests'

const path = window.location.pathname as routes
const homePageElem = document.getElementById('homePage') as HTMLDivElement
const testPageElem = document.getElementById('testPage') as HTMLDivElement

const isHomePage = path === '/'
const isTestPage = path === '/tests'

if (isTestPage) {
	homePageElem.hidden = true
}
if (isHomePage) {
	testPageElem.hidden = true
}

document.addEventListener('DOMContentLoaded', function () {
	var $$timeInputs = selectAll<HTMLInputElement>('input.time')

	$$timeInputs.forEach((inputElem) => TimePolyfill(inputElem, document))

	isHomePage && homePage()
	isTestPage && testPage()
})
