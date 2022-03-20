import type { ManualEntryLog, TimeObject, String12hr, String24hr } from '@time-input-polyfill/utils'

export type TimeFormats = {
	string12hr: String12hr,
	string24hr: String24hr,
	timeObject: TimeObject
}

export interface InputPolyfillProp {
	isEnabled: boolean,
	proxy: PolyfillInput,
	enable: () => void,
	disable: () => void,
	$a11y: HTMLDivElement,
	label: string,
	autoSwap: boolean,
	update: () => void,
	onUpdate: (callback: (newTime: TimeFormats) => void) => void
	swap: (format: 12 | 24) => void,
	manualEntryLog: ManualEntryLog
}

export interface PolyfillInput extends HTMLInputElement {
	polyfill?: InputPolyfillProp
}

export type TimePolyfillFn = ($input: PolyfillInput, document?: Document) => void
