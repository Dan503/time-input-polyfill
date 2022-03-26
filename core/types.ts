import type { ManualEntryLog } from '@time-input-polyfill/utils'

export interface InputPolyfillProp {
	isPolyfillEnabled: boolean,
	enablePolyfill: () => void,
	disablePolyfill: () => void,
	togglePolyfill: () => void,
	$a11y: HTMLDivElement,
	label: string,
	autoSwap: boolean,
	update: () => void,
	manualEntryLog: ManualEntryLog
}

export interface PolyfillInput extends HTMLInputElement {
	polyfill?: InputPolyfillProp
}

export type TimePolyfillFn = ($input: PolyfillInput, document?: Document) => void
