import type { PolyfillInput } from '../../core/types'
import { getIDsAndLabels } from '../../node_modules/@time-input-polyfill/tests/dist/mjs/src/core/IDs-and-labels'
import { EventAltName, EventMainName } from '../../node_modules/@time-input-polyfill/tests/dist/mjs/src/core/supportTypes'

const { IDs } = getIDsAndLabels()

const {
	primaryInputID,
	primaryCpuValueID,
	eventsInputID,
	eventsMainNameID,
	eventsAltNameID,
	formCpuValueID,
	buttonIDs,
	eventsDisplayValueID,
} = IDs

export function testPage() {

	const primaryInputElem = document.getElementById(primaryInputID) as PolyfillInput
	const primaryCpuValueElem = document.getElementById(primaryCpuValueID) as HTMLParagraphElement

	const eventsInputElem = document.getElementById(eventsInputID) as PolyfillInput
	const eventsDisplayValueElem = document.getElementById(eventsDisplayValueID) as HTMLParagraphElement
	const eventsMainNameElem = document.getElementById(eventsMainNameID) as HTMLParagraphElement
	const eventsAltNameElem = document.getElementById(eventsAltNameID) as HTMLParagraphElement
	const formCpuValueElem = document.getElementById(formCpuValueID) as HTMLParagraphElement

	const updatePrimaryCpuText = () => {
		const newValue = primaryInputElem.polyfill?.isPolyfillEnabled ? primaryInputElem.dataset.value : primaryInputElem.value
		primaryCpuValueElem.innerText = newValue || ''
	}

	const updateEventMainName = (eventName: EventMainName) => {
		eventsMainNameElem.innerText = eventName
	}
	const updateEventAltName = (eventName: EventAltName) => {
		eventsAltNameElem.innerText = eventName
	}

	const updateEventsDisplayText = () => {
		eventsDisplayValueElem.innerText = eventsInputElem.value
		updateEventAltName('change')
	}

	const setTimeTo = (string24hr: string) => {
		primaryInputElem.value = string24hr
		primaryInputElem.polyfill?.update()
		updatePrimaryCpuText()
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
		updatePrimaryCpuText()
	})
	primaryInputElem.addEventListener('keydown', () => {
		updatePrimaryCpuText()
	})
	eventsInputElem.addEventListener('keyup', () => {
		updateEventsDisplayText()
		updateEventMainName('keyUp')
	})
	eventsInputElem.addEventListener('keydown', () => {
		updateEventsDisplayText()
		updateEventMainName('keyDown')
	})
	eventsInputElem.addEventListener('focus', () => {
		updateEventMainName('focus')
	})
	eventsInputElem.addEventListener('blur', () => {
		updateEventMainName('blur')
	})
	eventsInputElem.addEventListener('mousedown', () => {
		updateEventMainName('mouseDown')
	})
	eventsInputElem.addEventListener('mouseup', () => {
		updateEventMainName('mouseUp')
	})
	eventsInputElem.addEventListener('click', () => {
		updateEventAltName('click')
	})
	eventsInputElem.form?.addEventListener('submit', () => {
		if (eventsInputElem.form) {
			const formData = new FormData(eventsInputElem.form)
			// I can get away with this since there is only 1 input in the form
			formData.forEach(d => {
				formCpuValueElem.innerHTML = d.toString()
				updateEventMainName('submit')
			})
		}
	})
}
