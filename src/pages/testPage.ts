import type { PolyfillInput } from '../../core/types'
import { getIDsAndLabels } from '../../node_modules/@time-input-polyfill/tests/dist/mjs/src/core/IDs-and-labels'

const { IDs } = getIDsAndLabels()

const { primaryInputID, buttonIDs, primaryCpuValueID } = IDs

export function testPage() {

	const primaryInputElem = document.getElementById(primaryInputID) as PolyfillInput
	const primaryCpuValueElem = document.getElementById(primaryCpuValueID) as HTMLParagraphElement

	const updateCpuText = () => {
		primaryCpuValueElem.innerText = primaryInputElem.dataset.value || ''
	}

	const setTimeTo = (string24hr: string) => {
		primaryInputElem.value = string24hr
		primaryInputElem.polyfill?.update()
		updateCpuText()
	}

	document.getElementById(buttonIDs.amID)?.addEventListener('click', () => {
		setTimeTo('07:15')
	})

	document.getElementById(buttonIDs.pmID)?.addEventListener('click', () => {
		setTimeTo('15:45')
	})

	document.getElementById(buttonIDs.blankID)?.addEventListener('click', () => {
		setTimeTo('')
	})

	document.getElementById(buttonIDs.togglePolyfillID)?.addEventListener('click', () => {
		console.log(primaryInputElem.polyfill?.isEnabled)
		if (primaryInputElem.polyfill?.isEnabled) {
			primaryInputElem.polyfill.disable()
		} else {
			primaryInputElem.polyfill?.enable()
		}
	})

	primaryInputElem.addEventListener('keyup', () => {
		updateCpuText()
	})
	primaryInputElem.addEventListener('keydown', () => {
		updateCpuText()
	})
}
