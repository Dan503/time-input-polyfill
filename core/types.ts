import type { ManualEntryLog } from '@time-input-polyfill/utils'

export interface InputPolyfillProp {
	isEnabled: boolean,
	enable: () => void,
	disable: () => void,
	$a11y: HTMLDivElement,
	label: string,
	autoSwap: boolean,
	update: () => void,
	swap: (format: 12 | 24) => void,
	manualEntryLog: ManualEntryLog
}

export interface PolyfillInput extends HTMLInputElement {
	polyfill?: InputPolyfillProp
}

export type TimePolyfillFn = ($input: PolyfillInput, document?: Document) => void
