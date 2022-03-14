import type { TimePolyfillFn } from '../types'

export interface ExtendedWindow extends Window {
	TimePolyfill?: TimePolyfillFn
}

export const extendedWindow: ExtendedWindow | undefined = ((window as any) as ExtendedWindow)
