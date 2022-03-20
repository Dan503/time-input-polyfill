import type { PolyfillInput } from '../../core/types'
import { getIDsAndLabels } from '../../node_modules/@time-input-polyfill/tests/dist/mjs/src/core/IDs-and-labels'

const { IDs } = getIDsAndLabels()

const { primaryInputID, buttonIDs } = IDs

export function testPage() {

	const inputElem = document.getElementById(primaryInputID) as PolyfillInput

	document.getElementById(buttonIDs.amID)?.addEventListener('click', () => {
		inputElem.value = '07:30'
		inputElem.polyfill?.update()
	})

	document.getElementById(buttonIDs.pmID)?.addEventListener('click', () => {
		inputElem.value = '15:45'
		inputElem.polyfill?.update()
	})

	document.getElementById(buttonIDs.blankID)?.addEventListener('click', () => {
		inputElem.value = ''
		inputElem.polyfill?.update()
	})
}
