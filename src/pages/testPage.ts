import type { PolyfillInput } from '../../core/types'
import { getIDsAndLabels } from '../../node_modules/@time-input-polyfill/tests/dist/mjs/src/core/IDs-and-labels'
import { EventMainName } from '../../node_modules/@time-input-polyfill/tests/dist/mjs/src/core/supportTypes'

const { IDs } = getIDsAndLabels()

const {
	primaryInputID,
	primaryCpuValueID,
	eventsInputID,
	eventsMainNameID,
	formCpuValueID,
	buttonIDs
} = IDs

export function testPage() {

	const primaryInputElem = document.getElementById(primaryInputID) as PolyfillInput
	const primaryCpuValueElem = document.getElementById(primaryCpuValueID) as HTMLParagraphElement

	const eventsInputElem = document.getElementById(eventsInputID) as PolyfillInput
	const eventsMainNameElem = document.getElementById(eventsMainNameID) as HTMLParagraphElement
	const formCpuValueElem = document.getElementById(formCpuValueID) as HTMLParagraphElement

	const updateCpuText = () => {
		const newValue = primaryInputElem.polyfill?.isPolyfillEnabled ? primaryInputElem.dataset.value : primaryInputElem.value
		primaryCpuValueElem.innerText = newValue || ''
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
		primaryInputElem.polyfill?.togglePolyfill()
	})

	primaryInputElem.addEventListener('keyup', () => {
		updateCpuText()
	})
	primaryInputElem.addEventListener('keydown', () => {
		updateCpuText()
	})
	eventsInputElem.form?.addEventListener('submit', () => {
		if (eventsInputElem.form) {
			const formData = new FormData(eventsInputElem.form)
			// I can get away with this since there is only 1 input in the form
			formData.forEach(d => {
				const eventName: EventMainName = 'submit'
				formCpuValueElem.innerHTML = d.toString()
				eventsMainNameElem.innerText = eventName
			})
		}
	})
}
